import { GetServerSideProps } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { getPosts } from 'src/services'

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const itemEntry = (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteMetadata.url}/blog/${post.slug}</link>
      <guid>${siteMetadata.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt || '')}</description>
${(post.tags || []).map((tag) => `      <category>${escapeXml(tag.slug)}</category>`).join('\n')}
    </item>`

function generateRss(posts) {
  const lastBuildDate = posts.length
    ? new Date(posts[0].createdAt).toUTCString()
    : new Date().toUTCString()

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteMetadata.title)}</title>
    <link>${siteMetadata.url}</link>
    <description>${escapeXml(siteMetadata.description)}</description>
    <language>${siteMetadata.locale}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteMetadata.url}/feed.xml" rel="self" type="application/rss+xml" />
${posts.map(itemEntry).join('\n')}
  </channel>
</rss>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let posts = []
  try {
    posts = (await getPosts()) || []
  } catch {
    // Serve an empty feed when the CMS is unreachable.
  }

  res.setHeader('Content-Type', 'application/rss+xml')
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400')
  res.write(generateRss(posts))
  res.end()

  return { props: {} }
}

// getServerSideProps writes the response directly; nothing to render.
export default function Feed() {
  return null
}
