import { gql, GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

const client = graphqlAPI ? new GraphQLClient(graphqlAPI) : null

let warnedMissingEndpoint = false

/**
 * Run a Hygraph query, returning `fallback` instead of throwing when the
 * endpoint is unconfigured or the request fails. This keeps the production
 * build from crashing in environments where NEXT_PUBLIC_GRAPHCMS_ENDPOINT
 * isn't set (e.g. a fresh Vercel project) — pages just render with empty data.
 */
async function safeRequest<T>(query: string, variables: object | undefined, fallback: T): Promise<T> {
  if (!client) {
    if (!warnedMissingEndpoint) {
      console.warn(
        'NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not set — Hygraph content will be empty.'
      )
      warnedMissingEndpoint = true
    }
    return fallback
  }
  try {
    return (await client.request(query, variables)) as T
  } catch (error) {
    console.error('Hygraph request failed:', (error as Error)?.message ?? error)
    return fallback
  }
}

export const getExperiences = async () => {
  const query = gql`
    {
      experiences(orderBy: startDate_DESC) {
        title
        company
        companyUrl
        companyLogo{
          url
        }
        location
        startDate
        endDate
        current
        description{
          text
        }
      }
    }
  `

  const { experiences } = await safeRequest(query, undefined, { experiences: [] })

  return experiences
}

export const getProjects = async () => {
  const query = gql`
    {
      projects(orderBy: createdAt_DESC) {
        name
        slug
        role
        link
        technologies
        description {
          text
        }
        thumbnail {
          url
        }
      }
    }
  `

  const { projects } = await safeRequest(query, undefined, { projects: [] })

  return projects
}

export const getPosts = async () => {
  const query = gql`
    {
      posts(orderBy: createdAt_DESC) {
        createdAt
        updatedAt
        slug
        title
        excerpt
        tags {
          slug
        }
        featuredImage {
          url
        }
      }
    }
  `

  const { posts } = await safeRequest(query, undefined, { posts: [] })

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

  const { post } = await safeRequest(query, { slug }, { post: null })

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

  const { tags } = await safeRequest(query, undefined, { tags: [] })

  return tags
}
