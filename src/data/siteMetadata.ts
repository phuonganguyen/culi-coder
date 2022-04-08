const siteMetadata = {
  title: 'Hi!👋',
  theme: 'system',
  author: 'Phuong Nguyen',
  email: 'phuong.nguyenanh06@gmail.com',
  github: 'https://github.com/einargudnig',
  twitter: 'https://twitter.com/einargudni',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com/einargudni',
  linkedin: 'https://www.linkedin.com/einargudni/',
  locale: 'en-US',
  comment: {
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'utterances', // supported providers: giscus, utterances, disqus
    utterancesConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://utteranc.es/
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
      issueTerm: 'pathname', // supported options: pathname, url, title
      label: 'Comment', // label (optional): Comment 💬
      // theme example: github-light, github-dark, preferred-color-scheme
      // github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
      theme: 'github-light',
      // theme when dark mode
      darkTheme: 'github-dark',
    },
  },
}

export default siteMetadata
