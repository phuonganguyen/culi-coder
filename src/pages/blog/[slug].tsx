import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";
import React from "react";
import { getPostDetails, getPosts } from "src/services";

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const BlogDetail = ({ post, content }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <></>
  }

  const { createdAt, title, tags } = post

  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-slate-500 dark:text-slate-400">
                    <time dateTime={createdAt}>
                      {new Date(createdAt).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">
                <MDXRemote {...content} components={[]}></MDXRemote>
              </div>
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag.slug} text={tag.slug} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="text-primary-color dark:text-primary-color-dark hover:text-blue-600 dark:hover:text-yellow-300"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogDetail

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)
  console.log(data.content.markdown)
  const content = await serialize(data.content.markdown)
  console.log(content)
  return {
    props: {
      post: data,
      content,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  }
}
