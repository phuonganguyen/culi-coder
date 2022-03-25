import "../styles/globals.scss";

import siteMetadata from "@/data/siteMetadata";
import { ThemeProvider } from "next-themes";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
