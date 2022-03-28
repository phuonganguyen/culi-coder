import React, { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import NowPlaying from "./NowPlaying";

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => (
  <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <main className="relative mb-auto">{children}</main>
      <NowPlaying />
      <Footer />
    </div>
  </div>
)

export default Layout
