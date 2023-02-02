import React, { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex flex-col justify-between h-screen">
        <main className="relative mb-auto">{children}</main>
        <Footer />
      </div>
    </div>
  </>
)

export default Layout
