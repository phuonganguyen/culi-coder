const WORDS_PER_MINUTE = 200

/**
 * Estimate reading time (in whole minutes, min 1) from an HTML string.
 * Strips tags, collapses whitespace, then counts words.
 */
export const readingTime = (html?: string): number => {
  if (!html) return 1

  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const words = text ? text.split(' ').length : 0
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
