import { formatDate } from "@/utils/date-utils";
import React from "react";

import Link from "./Link";
import Tag from "./Tag";

const PostBlock = ({ title, slug, createdAt, tags, excerpt }) => {
  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-slate-600 dark:text-slate-400">
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </dd>
        </dl>
        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                <Link href={`/blog/${slug}`} className="text-slate-800 dark:text-slate-200">
                  {title}
                </Link>
              </h2>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <Tag key={tag.slug} text={tag.slug} />
                ))}
              </div>
            </div>
            <div className="prose text-slate-600 max-w-none dark:text-slate-400">{excerpt}</div>
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
