import Link from 'next/link'
import styles from '../styles/postCard.module.scss'

const PostCard = ({
  title,
  coverImage,
  date,
}) => (
  <section className={styles.wrapper}>
    <article className={styles.article}>
      <img src={coverImage} alt={title} height={300} className={styles.article__image} />
      <div className={styles.article__contents}>
        <h2 className={styles.article__contents__title}>{title}</h2>
        <p className={styles.article__contents__date}>{date}</p>
      </div>
      <Link href=""><a className={styles.article__contents__link}></a></Link>
    </article>
  </section>
)

export default PostCard