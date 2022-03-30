import ListLayout from "@/components/ListLayout";
import { getTags } from "src/services";

const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getTags()

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = []

  return { props: { posts: allPosts, tag: params.tag } }
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
