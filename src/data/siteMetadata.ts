const siteMetadata = {
  title: 'Phuong Culi',
  description: 'My personal blog where I share my musings',
  theme: 'system',
  author: 'Phuong',
  url: 'https://www.phuongculi.com',
  siteLogo: '/static/logo.png',
  socialBanner: '/static/twitter-card.png',
  email: 'phuong.nguyenanh06@gmail.com',
  github: 'https://github.com/phuonganguyen',
  twitter: 'https://twitter.com/phuongnguyen06',
  facebook: 'https://www.facebook.com/phuong.a.nguyen.7',
  instagram: 'https://www.instagram.com/phuong.nguyenanh06',
  linkedin: 'https://www.linkedin.com/in/phuong-nguyen-5b214862/',
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
