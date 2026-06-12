import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getTags } from 'src/services'

export async function getStaticProps() {
  const tags = await getTags()

  return { props: { tags }, revalidate: 10 }
}

export default function Tags({ tags }) {
  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>Tags</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Every topic I have written about, in one place.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 pb-8">
        {tags.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No tags yet — they will show up with the first post.
          </p>
        )}
        {tags.map((t) => (
          <Link
            key={t.slug}
            href={`/tags/${t.slug}`}
            className="text-lg font-medium text-gray-900 transition-colors hover:text-primary-color dark:text-gray-100 dark:hover:text-primary-color-dark"
          >
            <span aria-hidden="true" className="text-primary-color dark:text-primary-color-dark">
              #
            </span>
            {t.name}
          </Link>
        ))}
      </div>
    </>
  )
}
