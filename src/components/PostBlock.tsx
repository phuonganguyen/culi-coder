import { formatDate } from "@/utils/date-utils";
import Image from "next/image";
import React from "react";

import Link from "./Link";
import Tag from "./Tag";

const PostBlock = ({ title, slug, createdAt, tags, excerpt, featuredImage }) => {
  let thumbnail = (
    <Link href={`/blog/${slug}`} title={title} className="block overflow-hidden rounded shadow-lg">
      <Image
        alt="illustration"
        className="transform  object-cover duration-200 hover:scale-110"
        src={featuredImage.url}
        layout="responsive"
        width={640}
        height={400}
      />
    </Link>
  )

  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-start xl:gap-5 xl:space-y-0">
        <div className="xl:col-span-1">
          <dt className="mb-4">{thumbnail}</dt>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-slate-600 dark:text-slate-400">
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </dd>
        </div>
        <div className="space-y-4 xl:col-span-3">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
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
              className="text-primary-color hover:text-blue-600 dark:hover:text-yellow-300 dark:text-primary-color-dark"
              aria-label={`Read "${title}"`}
            >
              Read more &rarr;
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostBlock
