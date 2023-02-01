import ListLayout from '@/components/ListLayout'
import { getPosts, getTags } from 'src/services'

export async function getStaticPaths() {
  const tags = await getTags()

  return {
    paths: tags.map(({ slug }) => ({
      params: {
        tag: slug,
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getPosts()
  const filteredPosts = allPosts.filter((post) => post.tags.map((t) => t.slug).includes(params.tag))

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <ListLayout posts={posts} title={title} />
    </>
  )
}
