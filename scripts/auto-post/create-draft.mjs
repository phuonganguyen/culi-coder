#!/usr/bin/env node
/**
 * Create a draft Post in Hygraph from a markdown file.
 *
 * Usage:
 *   node scripts/auto-post/create-draft.mjs path/to/post.md [--publish]
 *
 * The markdown file must start with a frontmatter block:
 *   ---
 *   title: My Post Title
 *   excerpt: One or two sentences shown in post lists.
 *   tags: docker, kubernetes
 *   coverAssetId: <optional Hygraph asset id for the featured image>
 *   ---
 *
 * Supported markdown: ## / ### headings, paragraphs, - bullets, 1. numbered
 * lists, > blockquotes, ``` code fences, **bold**, *italic*, `inline code`,
 * [links](https://...).
 *
 * Reads (tags, author, assets) go through the public content endpoint; the
 * mutation requires GRAPHCMS_TOKEN in .env at the repo root. When no
 * coverAssetId is given, the featured image of the latest post sharing the
 * first tag (or the latest post overall) is reused. Posts are created in
 * Draft stage unless --publish is passed.
 */
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

function loadEnv() {
  const env = {}
  for (const line of readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')) {
    const match = line.match(/^([A-Z_]+)\s*=\s*'?([^']*)'?\s*$/)
    if (match) env[match[1]] = match[2]
  }
  return env
}

function apiEndpoint(publicEndpoint) {
  // Mutations go to the primary API host, not the read-only CDN edge:
  // https://<region>.cdn.hygraph.com/content/<id>/<env> ->
  // https://api-<region>.hygraph.com/v2/<id>/<env>
  const match = publicEndpoint.match(/^https:\/\/([a-z0-9-]+)\.cdn\.hygraph\.com\/content\/([^/]+)\/([^/]+)$/)
  if (!match) return publicEndpoint
  return `https://api-${match[1]}.hygraph.com/v2/${match[2]}/${match[3]}`
}

// ---------------------------------------------------------------------------
// Markdown -> Hygraph (Slate) RichTextAST
// ---------------------------------------------------------------------------

function parseInline(text) {
  const nodes = []
  const pattern = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(_([^_]+)_)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g
  let last = 0
  let match
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push({ text: text.slice(last, match.index) })
    if (match[1]) nodes.push({ text: match[2], bold: true })
    else if (match[3]) nodes.push({ text: match[4], italic: true })
    else if (match[5]) nodes.push({ text: match[6], italic: true })
    else if (match[7]) nodes.push({ text: match[8], code: true })
    else if (match[9]) nodes.push({ type: 'link', href: match[11], children: [{ text: match[10] }] })
    last = pattern.lastIndex
  }
  if (last < text.length) nodes.push({ text: text.slice(last) })
  return nodes.length ? nodes : [{ text: '' }]
}

const listItem = (line) => ({
  type: 'list-item',
  children: [{ type: 'list-item-child', children: parseInline(line) }],
})

function markdownToAst(markdown) {
  const children = []
  const lines = markdown.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i += 1
    } else if (line.startsWith('```')) {
      const code = []
      i += 1
      while (i < lines.length && !lines[i].startsWith('```')) {
        code.push(lines[i])
        i += 1
      }
      i += 1 // closing fence
      children.push({ type: 'code-block', children: [{ text: code.join('\n') }] })
    } else if (line.startsWith('### ')) {
      children.push({ type: 'heading-three', children: parseInline(line.slice(4)) })
      i += 1
    } else if (line.startsWith('## ')) {
      children.push({ type: 'heading-two', children: parseInline(line.slice(3)) })
      i += 1
    } else if (line.startsWith('# ')) {
      // Post titles render as h1 already; demote stray h1s.
      children.push({ type: 'heading-two', children: parseInline(line.slice(2)) })
      i += 1
    } else if (line.startsWith('> ')) {
      const quote = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quote.push(lines[i].slice(2))
        i += 1
      }
      children.push({ type: 'block-quote', children: parseInline(quote.join(' ')) })
    } else if (/^[-*] /.test(line)) {
      const items = []
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(listItem(lines[i].slice(2)))
        i += 1
      }
      children.push({ type: 'bulleted-list', children: items })
    } else if (/^\d+\. /.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(listItem(lines[i].replace(/^\d+\. /, '')))
        i += 1
      }
      children.push({ type: 'numbered-list', children: items })
    } else {
      const paragraph = []
      while (i < lines.length && lines[i].trim() && !/^(#{1,3} |> |[-*] |\d+\. |```)/.test(lines[i])) {
        paragraph.push(lines[i].trim())
        i += 1
      }
      children.push({ type: 'paragraph', children: parseInline(paragraph.join(' ')) })
    }
  }

  return { children }
}

// ---------------------------------------------------------------------------
// Frontmatter
// ---------------------------------------------------------------------------

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) throw new Error('Missing frontmatter block (--- ... ---) at the top of the file')

  const meta = {}
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) meta[kv[1]] = kv[2].trim()
  }
  if (!meta.title) throw new Error('Frontmatter must include a title')

  const tags = (meta.tags || '')
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)

  return {
    title: meta.title,
    excerpt: meta.excerpt || '',
    tags,
    coverAssetId: meta.coverAssetId || '',
    body: match[2],
  }
}

const slugify = (title) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// ---------------------------------------------------------------------------
// Hygraph API
// ---------------------------------------------------------------------------

async function gql(endpoint, query, variables, token) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (json.errors) {
    const error = new Error(JSON.stringify(json.errors, null, 2))
    error.graphqlErrors = json.errors
    throw error
  }
  return json.data
}

async function pickCoverAsset(readEndpoint, tagSlugs) {
  if (tagSlugs.length) {
    const { posts } = await gql(
      readEndpoint,
      `query ($tag: String!) {
        posts(first: 1, orderBy: createdAt_DESC, where: { tags_some: { slug: $tag } }) {
          featuredImage { id }
        }
      }`,
      { tag: tagSlugs[0] }
    )
    if (posts[0]?.featuredImage?.id) return posts[0].featuredImage.id
  }
  const { posts } = await gql(
    readEndpoint,
    `{ posts(first: 1, orderBy: createdAt_DESC) { featuredImage { id } } }`
  )
  if (!posts[0]?.featuredImage?.id) throw new Error('No existing asset found to reuse as cover')
  return posts[0].featuredImage.id
}

async function main() {
  const args = process.argv.slice(2)
  const publish = args.includes('--publish')
  const file = args.find((arg) => !arg.startsWith('--'))
  if (!file) {
    console.error('Usage: node scripts/auto-post/create-draft.mjs path/to/post.md [--publish]')
    process.exit(1)
  }

  const env = loadEnv()
  if (!env.GRAPHCMS_TOKEN) throw new Error('GRAPHCMS_TOKEN not found in .env')
  if (!env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT) {
    throw new Error('NEXT_PUBLIC_GRAPHCMS_ENDPOINT not found in .env')
  }
  const readEndpoint = env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
  const writeEndpoint = apiEndpoint(readEndpoint)

  const { title, excerpt, tags, coverAssetId, body } = parseFrontmatter(readFileSync(file, 'utf8'))
  const content = markdownToAst(body)

  // Connect only tags that already exist in the CMS.
  const { tags: existingTags } = await gql(
    readEndpoint,
    `query ($slugs: [String!]) { tags(where: { slug_in: $slugs }) { slug } }`,
    { slugs: tags }
  )
  const knownSlugs = existingTags.map((tag) => tag.slug)
  const skipped = tags.filter((tag) => !knownSlugs.includes(tag))
  if (skipped.length) console.warn(`Skipping unknown tags: ${skipped.join(', ')}`)

  // Attribute the post to the first author in the project.
  const { authors } = await gql(readEndpoint, `{ authors(first: 1) { id name } }`)

  const cover = coverAssetId || (await pickCoverAsset(readEndpoint, knownSlugs))

  const buildData = (slug) => ({
    title,
    slug,
    excerpt,
    content,
    featuredPost: false,
    featuredImage: { connect: { id: cover } },
    tags: { connect: knownSlugs.map((tagSlug) => ({ slug: tagSlug })) },
    ...(authors.length ? { author: { connect: { id: authors[0].id } } } : {}),
  })

  const createMutation = `mutation ($data: PostCreateInput!) {
    createPost(data: $data) { id slug title }
  }`

  let created
  const slug = slugify(title)
  try {
    created = await gql(writeEndpoint, createMutation, { data: buildData(slug) }, env.GRAPHCMS_TOKEN)
  } catch (error) {
    const isUniqueViolation = (error.graphqlErrors || []).some((gqlError) =>
      /unique/i.test(gqlError.message)
    )
    if (!isUniqueViolation) throw error
    // Slug already taken (possibly by an unpublished draft) — retry dated.
    const datedSlug = `${slug}-${new Date().toISOString().slice(0, 10)}`
    created = await gql(
      writeEndpoint,
      createMutation,
      { data: buildData(datedSlug) },
      env.GRAPHCMS_TOKEN
    )
  }

  const post = created.createPost
  console.log(`Draft created: "${post.title}" (id: ${post.id}, slug: ${post.slug})`)

  if (publish) {
    await gql(
      writeEndpoint,
      `mutation ($id: ID!) { publishPost(where: { id: $id }, to: PUBLISHED) { id } }`,
      { id: post.id },
      env.GRAPHCMS_TOKEN
    )
    console.log('Published.')
  } else {
    console.log('Left in Draft stage — review and publish from the Hygraph studio.')
  }
}

main().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
