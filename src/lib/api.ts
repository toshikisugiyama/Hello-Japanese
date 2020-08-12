const API_URL: string = process.env.WORDPRESS_API_URL

const fetchApi = async (query: any, { variables }: { variables: any }) => {
  const headers = { 'Content-Type': 'application/json' }
  const res: Response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables
    })
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export const getSettings = async () => {
  const data = await fetchApi(
    `
    query Settings {
      allSettings {
        generalSettingsDescription
        generalSettingsTitle
      }
    }`,
    {
      variables: {}
    }
  )
  return data?.allSettings
}

export const getAllPostsForHome = async () => {
  const data = await fetchApi(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    }
    `,
    {
      variables: {}
    }
  )
  return data?.posts
}

export const getAllPagesForHome = async () => {
  const data = await fetchApi(
    `
    query AllPages {
      pages(first:20, where: { orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
    `,
    {
      variables: {}
    }
  )
  return data?.pages
}