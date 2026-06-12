import Pagination from '@/components/Pagination'
import { useState } from 'react'
import PageTitle from './PageTitle'

import PostBlock from './PostBlock'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination = null }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = [
      frontMatter.title,
      frontMatter.excerpt,
      ...(frontMatter.tags || []).map((tag) => tag.slug),
    ]
      .filter(Boolean)
      .join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <PageTitle>{title}</PageTitle>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-color focus:ring-primary-color dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-primary-color-dark dark:focus:ring-primary-color-dark"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && (
            <li className="py-12 text-gray-500 dark:text-gray-400">
              No posts match that search. Try a different keyword.
            </li>
          )}
          {displayPosts.map((frontMatter) => {
            const { slug } = frontMatter
            return (
              <li key={slug} className="py-4">
                <PostBlock {...frontMatter} />
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
