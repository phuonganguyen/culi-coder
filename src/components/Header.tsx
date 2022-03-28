import headerNavLinks from "@/data/headerNavLinks";
import { useRouter } from "next/router";
import React from "react";
import Typewriter from "typewriter-effect";

import Link from "./Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  const router = useRouter()
  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <Link href="/" aria-label="Einar Gudni's website">
          <div className="flex items-center justify-between text-xl font-semibold text-primary-color dark:text-primary-color-dark">
            {`~/CuliCoder${router.asPath}`}{' '}
            <Typewriter
              options={{
                strings: [],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100 hover:dark:text-primary-color-dark hover:text-primary-color"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
