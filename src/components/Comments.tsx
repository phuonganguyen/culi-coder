import siteMetadata from "@/data/siteMetadata";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";

const COMMENTS_ID = "comments-container";

const Utterances = ({ issueTerm }) => {
  const { theme, resolvedTheme } = useTheme();
  const commentsTheme =
    theme === "dark" || resolvedTheme === "dark"
      ? siteMetadata.comment.utterancesConfig.darkTheme
      : siteMetadata.comment.utterancesConfig.theme;

  const loadedTerm = useRef<string | null>(null);

  // Inject the utterances script once per post. The ref guard stops React
  // StrictMode's double-invoked effect (dev) from stacking duplicate widgets,
  // while still rebuilding when navigating to a different post.
  useEffect(() => {
    const container = document.getElementById(COMMENTS_ID);
    if (!container || loadedTerm.current === issueTerm) return;
    loadedTerm.current = issueTerm;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", siteMetadata.comment.utterancesConfig.repo);
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("label", siteMetadata.comment.utterancesConfig.label);
    script.setAttribute("theme", commentsTheme);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    container.appendChild(script);
    // `commentsTheme` is intentionally omitted: theme changes are applied in
    // place below via postMessage so the whole widget is not reloaded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueTerm]);

  // Update the widget theme in place when the site theme changes.
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(`#${COMMENTS_ID} iframe`);
    iframe?.contentWindow?.postMessage(
      { type: "set-theme", theme: commentsTheme },
      "https://utteranc.es"
    );
  }, [commentsTheme]);

  return (
    <div className="pt-2 pb-6 text-gray-700 dark:text-gray-300">
      <div className="relative" id={COMMENTS_ID} />
    </div>
  );
};

export default function Comments({ frontMatter }) {
  let term;
  switch (siteMetadata.comment.utterancesConfig.issueTerm) {
    case "pathname":
      term = frontMatter.slug;
      break;
    case "url":
      term = window.location.href;
      break;
    case "title":
      term = frontMatter.title;
      break;
  }

  return (
    <div id="comment" className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
      <h2 className="mb-2 font-display text-xl font-semibold text-gray-900 dark:text-gray-100">
        Comments
      </h2>
      <Utterances issueTerm={term} />
    </div>
  );
}
