import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

const FourZeroFour = () => (
  <>
    <PageSEO title={`Page not found - ${siteMetadata.author}`} description="Page not found" />
    <div className="flex flex-col items-start justify-center py-24 md:py-32">
      <p className="font-mono text-sm tracking-wide text-primary-color dark:text-primary-color-dark">
        404
      </p>
      <h1 className="text-balance mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        This page wandered off.
      </h1>
      <p className="mt-6 max-w-md text-lg leading-8 text-gray-600 dark:text-gray-300">
        The link may be broken, or the page may have been moved. Either way, there is nothing
        here.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link
          href="/"
          className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-gray-100 transition-colors hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          Back to home
        </Link>
        <Link
          href="/blog"
          className="group font-medium text-primary-color transition-colors hover:text-primary-700 dark:text-primary-color-dark dark:hover:text-primary-300"
        >
          Read the blog{' '}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  </>
)

export default FourZeroFour
