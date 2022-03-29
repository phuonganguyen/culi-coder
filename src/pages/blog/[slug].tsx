import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { getPostDetails, getPosts } from "src/services";

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const PostDetail = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <></>
  }

  const { createdAt, title, tags, content, author } = post

  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <div className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  <div className="flex items-center space-x-2">
                    {author.photo.url && (
                      <Image
                        src={author.photo.url}
                        width="38px"
                        height="38px"
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                      <dt className="sr-only">Name</dt>
                      <dd className="uppercase text-primary-color dark:text-primary-color-dark hover:text-blue-600 dark:hover:text-yellow-300">
                        {author.name}
                      </dd>
                      <dt className="sr-only">Time</dt>
                      <dd className="text-slate-500 dark:text-slate-400">
                        <time dateTime={createdAt}>
                          {new Date(createdAt).toLocaleDateString(
                            siteMetadata.locale,
                            postDateTemplate
                          )}
                        </time>
                      </dd>
                    </dl>
                  </div>
                </div>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div
                className="pt-10 pb-8 prose dark:prose-dark max-w-none"
                dangerouslySetInnerHTML={{ __html: content.html }}
              ></div>
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

export default PostDetail

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)
  return {
    props: {
      post: data,
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
