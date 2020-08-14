import Layout from '../../components/layout'
import ErrorPage from 'next/error'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getAllPostsWithSlug, getAllPagesWithSlug, getPostAndMore, getSettings } from '../../lib/api'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import styles from '../../styles/article.module.scss'

const Post = ({
  post,
  info,
  allPages
}) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const categories = post?.categories.edges.map((category: any) => category.node.name)
  return (
    <Layout
      title={info?.generalSettingsTitle}
      // pages={allPages?.edges.map(({node}) => node.slug)}
      pages={['introduction']}
    >
      <Head>
        <title>{post?.title}</title>
        <meta
          property="og:image"
          content={post?.featuredImage.node.sourceUrl}
        />
      </Head>
      <article>
        <PostHeader
           title={post?.title}
           coverImage={post?.featuredImage.node.sourceUrl}
           date={post?.date}
           categories={categories}
        />
        <PostBody
          content={post?.content}
        />
        <div className={styles.author}>
          <p>{post?.author.node.name}</p>
        </div>
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
  try {
    const data = await getPostAndMore( params.slug, preview, previewData )
    const info = await getSettings()
    const allPages = await getAllPagesWithSlug()
    return {
      props: {
        post: data.post,
        posts: data.posts,
        info,
        allPages
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const allPosts = await getAllPostsWithSlug()
    const allPages = await getAllPagesWithSlug()
    const allArticles = [...allPosts?.edges, ...allPages?.edges]
    return {
      paths: allArticles.map(({node}) => `/posts/${node.slug}`) || [],
      fallback: true
    }
  } catch (error) {
    console.error(error)
  }
}

export default Post