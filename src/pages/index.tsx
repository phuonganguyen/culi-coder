import Link from "@/components/Link";
import PostBlock from "@/components/PostBlock";
import { PageSEO } from "@/components/SEO";
import ShortcutHome from "@/components/ShortcutHome";
import siteMetadata from "@/data/siteMetadata";
import React from "react";
import { RoughNotation } from "react-rough-notation";
import { getPosts } from "src/services";

const MAX_DISPLAY = 3
const NOTATION_COLOR = '#c78a3b'

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return { props: { posts }, revalidate: 10 }
}

const heroLinks = [
  { href: '/projects', label: 'What I built', action: 'Projects' },
  { href: '/about', label: 'Read my story', action: 'About' },
  { href: siteMetadata.resume, label: 'Hire me', action: 'Resume' },
]

const HeroLink = ({ href, label, action }) => (
  <Link href={href} className="group flex items-baseline justify-between gap-6 py-5">
    <span className="font-medium text-gray-900 transition-colors duration-200 group-hover:text-primary-color dark:text-gray-100 dark:group-hover:text-primary-color-dark">
      {label}
    </span>
    <span className="flex items-baseline gap-1 whitespace-nowrap text-sm text-gray-500 transition-colors duration-200 group-hover:text-primary-color dark:text-gray-400 dark:group-hover:text-primary-color-dark">
      {action}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </span>
  </Link>
)

const IndexPage = ({ posts }) => (
  <>
    <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
    <div className="divide-y divide-gray-200 dark:divide-gray-800">
      <div className="pt-10 pb-12 md:pt-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-sm tracking-wide text-primary-color dark:text-primary-color-dark">
              senior software engineer · ho chi minh city
            </p>
            <h1 className="text-balance mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl md:leading-none">
              Hi, I am {siteMetadata.author} <span className="waving-hand">👋🏻</span>
            </h1>
            <p className="pt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Welcome to my personal blog where I share my musings. I spend my days building
              software, and my free time on side projects and whatever technology has caught my
              curiosity lately.
            </p>
            <p className="pt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              This is my place for{' '}
              <RoughNotation
                type="underline"
                show={true}
                color={NOTATION_COLOR}
                animationDelay={800}
                animationDuration={1200}
              >
                thoughts,{' '}
              </RoughNotation>
              <RoughNotation
                type="underline"
                show={true}
                color={NOTATION_COLOR}
                animationDelay={1400}
                animationDuration={1200}
              >
                reflections,{' '}
              </RoughNotation>
              &{' '}
              <RoughNotation
                type="underline"
                show={true}
                color={NOTATION_COLOR}
                animationDelay={1700}
                animationDuration={1200}
              >
                everything{' '}
              </RoughNotation>
              in between. Have a good read!
            </p>
          </div>
          <nav
            aria-label="Quick links"
            className="w-full divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800 lg:mt-12 lg:w-72 lg:shrink-0"
          >
            {heroLinks.map((link) => (
              <HeroLink key={link.action} {...link} />
            ))}
          </nav>
        </div>
        <div className="mt-12 flex w-full justify-center">
          <ShortcutHome />
        </div>
      </div>
      <div className="pt-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
          Latest writing
        </h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {!posts.length && (
            <li className="py-12 text-gray-500 dark:text-gray-400">
              Nothing here yet — the first post is on its way.
            </li>
          )}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug } = frontMatter
            return (
              <li key={slug} className="py-12">
                <PostBlock {...frontMatter}></PostBlock>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
    {posts.length > MAX_DISPLAY && (
      <div className="flex justify-end pt-4 text-base font-medium leading-6">
        <Link
          href="/blog"
          className="group text-primary-color transition-colors hover:text-primary-700 dark:text-primary-color-dark dark:hover:text-primary-300"
          aria-label="all posts"
        >
          All posts{' '}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </div>
    )}
  </>
)

export default IndexPage
