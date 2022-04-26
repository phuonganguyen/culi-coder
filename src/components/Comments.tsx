import siteMetadata from "@/data/siteMetadata";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect } from "react";

const Utterances = ({ issueTerm }) => {
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    theme === 'dark' || resolvedTheme === 'dark'
      ? siteMetadata.comment.utterancesConfig.darkTheme
      : siteMetadata.comment.utterancesConfig.theme

  const COMMENTS_ID = 'comments-container'

  const LoadComments = useCallback(() => {
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', siteMetadata.comment.utterancesConfig.repo)
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('label', siteMetadata.comment.utterancesConfig.label)
    script.setAttribute('theme', commentsTheme)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ''
    }
  }, [commentsTheme, issueTerm])

  // Reload on theme change
  useEffect(() => {
    LoadComments()
  }, [LoadComments])

  // Added `relative` to fix a weird bug with `utterances-frame` position
  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      <div className="relative utterances-frame" id={COMMENTS_ID} />
    </div>
  )
}

export default function Comments({ frontMatter }) {
  let term
  switch (siteMetadata.comment.utterancesConfig.issueTerm) {
    case 'pathname':
      term = frontMatter.slug
      break
    case 'url':
      term = window.location.href
      break
    case 'title':
      term = frontMatter.title
      break
  }

  return (
    <div id="comment">
      <Utterances issueTerm={term} />
    </div>
  )
}
