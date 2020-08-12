import Link from 'next/link'
import styles from '../styles/layout.module.scss'
const Header = () => {
  return (
    <header className={styles.header}>
      <section className={styles.section}>
        <h1 className={styles.section__logo}>
          <Link href="/"><a>Hello Japanese</a></Link>
        </h1>
      </section>
    </header>
  )
}

export default Header