import { formatDate } from "@/utils/date-utils";
import Image from "next/image";
import React from "react";

import Link from "./Link";
import Tag from "./Tag";

const PostBlock = ({ title, slug, createdAt, tags, excerpt, featuredImage }) => {
  let thumbnail = featuredImage?.url ? (
    <Link
      href={`/blog/${slug}`}
      title={title}
      className="block overflow-hidden rounded-lg shadow-md"
    >
      <Image
        alt={`Illustration for "${title}"`}
        className="transform object-cover duration-300 hover:scale-105"
        src={featuredImage.url}
        layout="responsive"
        width={640}
        height={400}
      />
    </Link>
  ) : null

  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-start xl:gap-5 xl:space-y-0">
        <div className="xl:col-span-1">
          {thumbnail && <dt className="mb-4">{thumbnail}</dt>}
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-600 dark:text-gray-400">
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </dd>
        </div>
        <div className="space-y-4 xl:col-span-3">
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-2xl font-semibold leading-8 tracking-tight">
                <Link
                  href={`/blog/${slug}`}
                  className="text-gray-900 transition-colors hover:text-primary-color dark:text-gray-100 dark:hover:text-primary-color-dark"
                >
                  {title}
                </Link>
              </h2>
              <div className="mt-3 flex flex-wrap">
                {tags.map((tag) => (
                  <Tag key={tag.slug} text={tag.slug} />
                ))}
              </div>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">{excerpt}</div>
          </div>
          <div className="text-base font-medium leading-6">
            <Link
              href={`/blog/${slug}`}
              className="group text-primary-color transition-colors hover:text-primary-700 dark:text-primary-color-dark dark:hover:text-primary-300"
              aria-label={`Read "${title}"`}
            >
              Read more{' '}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostBlock
