import Link from "@/components/Link";

const linkClass =
  'group font-medium text-primary-color transition-colors hover:text-primary-700 dark:text-primary-color-dark dark:hover:text-primary-300'
const disabledClass = 'cursor-auto text-gray-400 dark:text-gray-600'

export default function Pagination({ totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="pt-6 pb-8">
      <nav className="flex items-center justify-between" aria-label="Pagination">
        {prevPage ? (
          <Link
            href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}
            className={linkClass}
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:-translate-x-1"
            >
              &larr;
            </span>{' '}
            Previous
          </Link>
        ) : (
          <span className={disabledClass}>&larr; Previous</span>
        )}
        <span className="font-mono text-sm tabular-nums text-gray-500 dark:text-gray-400">
          {currentPage} / {totalPages}
        </span>
        {nextPage ? (
          <Link href={`/blog/page/${currentPage + 1}`} className={linkClass}>
            Next{' '}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        ) : (
          <span className={disabledClass}>Next &rarr;</span>
        )}
      </nav>
    </div>
  )
}
