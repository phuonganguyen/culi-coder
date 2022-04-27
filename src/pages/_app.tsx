import "../styles/globals.scss";

import CommandBar from "@/components/CommandBar";
import siteMetadata from "@/data/siteMetadata";
import { DefaultSeo } from "next-seo";
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
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
        </Head>
        <Layout>
          <DefaultSeo
            openGraph={{
              type: 'website',
              locale: 'en_US',
              url: siteMetadata.url,
              site_name: siteMetadata.title,
            }}
          />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CommandBar>
  )
}

export default MyApp
