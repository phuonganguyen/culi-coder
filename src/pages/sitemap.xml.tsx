import { GetServerSideProps } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { getPosts, getTags } from 'src/services'

const STATIC_PATHS = ['', '/blog', '/projects', '/about', '/uses', '/tags']

const urlEntry = (path: string, lastmod?: string) => `  <url>
    <loc>${siteMetadata.url}${path}</loc>${
  lastmod ? `\n    <lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''
}
  </url>`

function generateSiteMap(posts, tags) {
  const staticEntries = STATIC_PATHS.map((path) => urlEntry(path))
  const postEntries = posts.map((post) =>
    urlEntry(`/blog/${post.slug}`, post.updatedAt || post.createdAt)
  )
  const tagEntries = tags.map((tag) => urlEntry(`/tags/${tag.slug}`))

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...postEntries, ...tagEntries].join('\n')}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let posts = []
  let tags = []
  try {
    ;[posts, tags] = await Promise.all([getPosts(), getTags()])
  } catch {
    // Serve the static pages even when the CMS is unreachable.
  }

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400')
  res.write(generateSiteMap(posts || [], tags || []))
  res.end()

  return { props: {} }
}

// getServerSideProps writes the response directly; nothing to render.
export default function SiteMap() {
  return null
}
