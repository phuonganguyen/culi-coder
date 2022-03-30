import { gql, GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

const client = new GraphQLClient(graphqlAPI)

export const getPosts = async () => {
  const query = gql`
    {
      posts {
        createdAt
        slug
        title
        excerpt
        tags {
          slug
        }
      }
    }
  `

  const { posts } = await client.request(query)

  return posts
}

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        createdAt
        slug
        author {
          name
          photo {
            url
          }
        }
        content {
          html
        }
        tags {
          slug
        }
      }
    }
  `

  const { post } = await client.request(query, { slug })

  return post
}

export const getTags = async () => {
  const query = gql`
    {
      tags {
        name
        slug
      }
    }
  `

  const { tags } = await client.request(query)

  return tags
}

export const getPostsByTag = async (tag: string) => {
  const query = gql`
  query getPostsByTag($tag: String!){
    
  }
  `
}
