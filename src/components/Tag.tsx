import Link from "next/link";

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${text}`}>
      <a className="mr-3 text-sm font-medium text-primary-color transition-colors hover:text-primary-700 dark:text-primary-color-dark dark:hover:text-primary-300">
        #{text}
      </a>
    </Link>
  )
}

export default Tag
