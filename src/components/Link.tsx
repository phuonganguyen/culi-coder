/* eslint-disable jsx-a11y/anchor-has-content */
import Link from "next/link";

const CustomLink = ({ href, ...rest }) => {
  // A static asset in /public (e.g. /static/resume.pdf) — open in a new tab
  // instead of routing through next/link, which only handles page routes.
  const isStaticFile = href && href.startsWith('/') && /\.[a-z0-9]+$/i.test(href)
  const isInternalLink = href && href.startsWith('/') && !isStaticFile
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
