import styles from '../styles/article.module.scss'
const PostBody = ({ content }) => (
  <div
    className={styles.body}
    dangerouslySetInnerHTML={{__html: content}}
  />
)

export default PostBody