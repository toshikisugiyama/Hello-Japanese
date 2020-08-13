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
            categories {
              edges {
                node {
                  name
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

export const getPostAndMore = async (slug, preview, previewData) => {
  const postPreview = preview && previewData?.post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchApi(
    `
    fragment PostFields on Post {
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
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          isRevision
            ? `
            revisions(first: 1, where: {orderby: {field: MODIFIED, order: DESC}}) {
              edges {
                node {
                  title
                  excerpt
                  content
                  author {
                    node {
                      name
                    }
                  }
                }
              }
            }
            `
            : ``
        }
      }
      posts(first: 3, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
    `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG'
      }
    }
  )
  if (isDraft) data.post.slug = postPreview.id
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node
    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  if (data.posts.edges.length > 2) data.posts.edges.pop()
  return data
}

export const getAllPostsWithSlug = async () => {
  const data = await fetchApi(
    `
    query PostSlugs {
      posts(first: 10000) {
        edges {
          node {
            slug
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

export const getAllPagesWithSlug = async () => {
  const data = await fetchApi(
    `
    query PageSlugs {
      pages(first: 10000) {
        edges {
          node {
            slug
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
