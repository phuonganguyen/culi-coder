import Link from "@/components/Link";

const UsesTech = ({ name, link, description }) => (
  <li className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-3">
    <Link
      href={link}
      className="shrink-0 font-medium text-gray-900 transition-colors hover:text-primary-color dark:text-gray-100 dark:hover:text-primary-color-dark"
    >
      {name}
    </Link>
    <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
      &#47;&#47; {description}
    </span>
  </li>
)

export default UsesTech
