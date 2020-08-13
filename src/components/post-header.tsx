import styles from '../styles/article.module.scss'
interface params {
  title: string,
  coverImage: string,
  date: string,
  categories: string[]
}
const PostHeader = ({
  title,
  coverImage,
  date,
  categories
}: params) => {
  const spImg: string = `${coverImage.split('.png')[0]}_sp.png`
  const topImgAlt: string = `The top image for this article, which title is '${title}'`
  return (
  <>
    <img
      src={coverImage}
      alt={`${topImgAlt}.`}
      width={1000}
      className={`${styles.header__image} ${styles.header__image_lg}`}
    />
    <img
      src={spImg}
      alt={`${topImgAlt} in mobile.`}
      width={450}
      className={`${styles.header__image} ${styles.header__image_sm}`}
    />
    <div className={styles.header__categories}>
      {categories.map((category: string) => (
        <span key={category}>{category}</span>
      ))}
    </div>
    <h1 className={styles.header__title}>{title}</h1>
    <p className={styles.header__date}>{date}</p>
  </>
)}

export default PostHeader