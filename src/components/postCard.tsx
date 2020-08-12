import styles from '../styles/index.module.scss'

const PostCard = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug
}) => (
  <section className={styles.wrapper}>
    <article className={styles.article}>
      <img src={coverImage} alt={title} width={300} />
      <h2>{title}</h2>
      <p>{excerpt}</p>
      <p>{date}</p>
      <p>{author}</p>
      <p>{slug}</p>
    </article>
  </section>
)

export default PostCard