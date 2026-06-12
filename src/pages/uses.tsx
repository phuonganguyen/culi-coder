import PageTitle from '@/components/PageTitle'
import { PageSEO } from '@/components/SEO'
import UsesTech from '@/components/Uses'
import siteMetadata from '@/data/siteMetadata'

import { USES_SECTIONS } from '../data/usesData'

export default function Uses() {
  return (
    <>
      <PageSEO
        title={`Uses - ${siteMetadata.author}`}
        description="The software and gear I use every day"
      />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>What I use</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          I&apos;ve seen similar lists flying around and I like the idea. It is also a nice way to
          see how my setup changes over time.
        </p>
      </div>
      <div className="space-y-12 pb-8">
        {USES_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {section.title}
            </h2>
            <ul className="mt-4 divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
              {section.items.map((d) => (
                <UsesTech key={d.name} name={d.name} description={d.description} link={d.link} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
