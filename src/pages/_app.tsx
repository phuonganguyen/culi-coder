import "../styles/globals.scss";

import CommandBar from "@/components/CommandBar";
import siteMetadata from "@/data/siteMetadata";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <CommandBar>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <title>{siteMetadata.title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CommandBar>
  )
}

export default MyApp
