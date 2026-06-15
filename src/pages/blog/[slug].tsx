import Comments from '@/components/Comments'
import Link from '@/components/Link'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from '@/utils/date-utils'
import { readingTime } from '@/utils/reading-time'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { getPostDetails, getPosts } from 'src/services'

const PostDetail = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <></>
  }

  const { createdAt, title, tags, content, author, featuredImage } = post
  const kicker = tags?.[0]?.slug
  const minutes = readingTime(content?.html)

  return (
    <>
      <BlogSEO
        title={`${title} - ${siteMetadata.author}`}
        summary={post.excerpt || siteMetadata.description}
        date={createdAt}
        url={`${siteMetadata.url}/blog/${post.slug}`}
        images={featuredImage?.url ? [featuredImage.url] : []}
        authorDetails={author?.name ? [{ name: author.name }] : undefined}
      />
      <article className="py-8 sm:py-10">
        <header className="space-y-5">
          {kicker && (
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary-color dark:text-primary-color-dark">
              {kicker}
            </p>
          )}
          <h1 className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl md:leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            {author?.photo?.url && (
              <span className="flex items-center gap-2">
                <Image
                  src={author.photo.url}
                  width={28}
                  height={28}
                  alt={author.name || 'avatar'}
                  className="rounded-full"
                />
                {author?.name && (
                  <span className="font-medium text-gray-700 dark:text-gray-300">{author.name}</span>
                )}
              </span>
            )}
            {author?.photo?.url && <span aria-hidden="true">&middot;</span>}
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{minutes} min read</span>
          </div>
        </header>

        {featuredImage?.url && (
          <figure className="my-10 overflow-hidden rounded-2xl ring-1 ring-gray-900/5 dark:ring-white/10">
            <Image
              src={featuredImage.url}
              alt={`Cover image for "${title}"`}
              width={1200}
              height={630}
              layout="responsive"
              priority
              className="object-cover"
            />
          </figure>
        )}

        <div
          className="prose mt-10 max-w-3xl dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: content.html }}
        ></div>

        <footer className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          {tags && tags.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Tags
              </h2>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <Tag key={tag.slug} text={tag.slug} />
                ))}
              </div>
            </div>
          )}
          <Link
            href="/blog"
            className="group inline-flex items-center text-primary-color transition-colors hover:text-primary-700 dark:text-primary-color-dark dark:hover:text-primary-300"
          >
            <span
              aria-hidden="true"
              className="mr-1 inline-block transition-transform duration-200 group-hover:-translate-x-1"
            >
              &larr;
            </span>
            Back to the blog
          </Link>
        </footer>

        <Comments frontMatter={post} />
      </article>
    </>
  )
}

export default PostDetail

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)
  if (!data) {
    return { notFound: true, revalidate: 10 }
  }
  return {
    props: {
      post: data,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  }
}
