import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

const Projects = () => (
  <>
    <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <PageTitle>Projects</PageTitle>
      <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
        A place for the things I&apos;ve built and tinkered with.
      </p>
    </div>
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-primary-color dark:text-primary-color-dark"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
      <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Projects are on the way 🚧
      </h2>
      <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
        I&apos;m putting together a showcase of my work. In the meantime, you can find what
        I&apos;m building over on GitHub.
      </p>
      <Link
        href={siteMetadata.github}
        className="mt-6 inline-flex items-center rounded-lg bg-primary-color px-5 py-3 font-medium text-white transition hover:opacity-90 dark:bg-primary-color-dark dark:text-gray-900"
      >
        Visit my GitHub &rarr;
      </Link>
    </div>
  </>
)

export default Projects
