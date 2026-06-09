import Link from "@/components/Link";
import PostBlock from "@/components/PostBlock";
import { PageSEO } from "@/components/SEO";
import ShortcutHome from "@/components/ShortcutHome";
import siteMetadata from "@/data/siteMetadata";
import React from "react";
import { RoughNotation } from "react-rough-notation";
import { getPosts } from "src/services";

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return { props: { posts }, revalidate: 10 }
}

const heroCards = [
  {
    href: '/projects',
    label: 'What I built',
    action: 'Projects',
    actionColor: 'text-amber-500 dark:text-amber-400',
    glow: 'from-pink-600 to-purple-600',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 -rotate-6 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    href: '/about',
    label: 'Read my story',
    action: 'About',
    actionColor: 'text-indigo-500 dark:text-indigo-400',
    glow: 'from-fuchsia-600 to-emerald-600',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 -rotate-6 text-pink-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    href: siteMetadata.resume,
    label: 'Hire me!',
    action: 'Resume',
    actionColor: 'text-primary-color dark:text-primary-color-dark',
    glow: 'from-pink-600 to-purple-600',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 -rotate-6 text-fuchsia-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        />
      </svg>
    ),
  },
]

const HeroCard = ({ href, label, action, actionColor, glow, icon }) => (
  <div className="group relative">
    <div
      className={`animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r ${glow} opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200`}
    ></div>
    <Link href={href}>
      <span className="relative flex items-center justify-between gap-4 rounded-lg bg-white px-7 py-4 leading-none dark:bg-black">
        <span className="flex items-center gap-4">
          {icon}
          <span className="text-gray-900 dark:text-gray-100">{label}</span>
        </span>
        <span
          className={`whitespace-nowrap border-l border-gray-300 pl-4 transition duration-200 dark:border-gray-700 ${actionColor} group-hover:text-gray-900 dark:group-hover:text-gray-100`}
        >
          {action}&nbsp;&rarr;
        </span>
      </span>
    </Link>
  </div>
)

const IndexPage = ({ posts }) => (
  <>
    <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-11 text-slate-900 dark:text-slate-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Hi! I am{' '}
              <span className="text-primary-color dark:text-primary-color-dark">
                {siteMetadata.author}
              </span>{' '}
              <span className="waving-hand">👋🏻</span>
            </h1>
            <p className="pt-5 text-lg text-gray-600 dark:text-gray-300">
              Welcome to my personal blog where I share my musings. I am a Senior Software Engineer
              in Ho Chi Minh City, Vietnam. In my free time, I like developing side projects and
              learning new technologies.
            </p>
            <p className="pt-5 text-lg leading-7 text-slate-600 dark:text-slate-300">
              This is my place for{' '}
              <RoughNotation
                type="underline"
                show={true}
                color="#fbbf24"
                animationDelay={800}
                animationDuration={1200}
              >
                thoughts,{' '}
              </RoughNotation>
              <RoughNotation
                type="underline"
                show={true}
                color="#38bdf8"
                animationDelay={1400}
                animationDuration={1200}
              >
                reflections,{' '}
              </RoughNotation>
              &{' '}
              <RoughNotation
                type="underline"
                show={true}
                color="#f87171"
                animationDelay={1700}
                animationDuration={1200}
              >
                everything{' '}
              </RoughNotation>
              in between. Have a good read!
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:w-auto lg:grid-cols-1 lg:gap-8">
            {heroCards.map((card) => (
              <HeroCard key={card.action} {...card} />
            ))}
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="justify-center mt-2">
            <ShortcutHome />
          </div>
        </div>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && 'No posts found.'}
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
    {posts.length > MAX_DISPLAY && (
      <div className="flex justify-end text-base font-medium leading-6">
        <Link
          href="/blog"
          className="text-primary-color hover:text-blue-600 dark:hover:text-yellow-300 dark:text-primary-color-dark"
          aria-label="all posts"
        >
          All Posts &rarr;
        </Link>
      </div>
    )}
  </>
)

export default IndexPage
