import { useKBar } from "kbar";
import { useEffect, useState } from "react";

export default function ShortcutHome() {
  const { query } = useKBar()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent)
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

    const kbdClass =
      'rounded-md border border-gray-300 bg-gray-100 px-2 py-0.5 font-mono text-base text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
    const buttonClass =
      'text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'

    if (isMobile) {
      return (
        <button className={buttonClass} onClick={query.toggle}>
          Tap to start →
        </button>
      )
    }
    return (
      <button className={buttonClass} onClick={query.toggle}>
        <span className="text-lg">Press</span>{' '}
        <kbd className={kbdClass}>{isMac ? '⌘' : 'ctrl'}</kbd>{' '}
        <span className="text-lg">+</span> <kbd className={kbdClass}>K</kbd>{' '}
        <span className="text-lg">to start →</span>
      </button>
    )
  }
  return <div />
}
