import Link from "next/link";

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${text}`}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-color hover:text-blue-600 dark:hover:text-yellow-300 dark:text-primary-color-dark">
        #{text}
      </a>
    </Link>
  )
}

export default Tag
