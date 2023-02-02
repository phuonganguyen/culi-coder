import ListLayout from '@/components/ListLayout'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import React from 'react'
import { getPosts } from 'src/services'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getPosts()
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination }, revalidate: 10 }
}

const Blog = ({ posts, initialDisplayPosts, pagination }) => {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}

export default Blog
