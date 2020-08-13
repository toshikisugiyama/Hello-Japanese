import { ReactNode } from 'react'
import Header from '../components/header'
import Footer from './footer'
import styles from '../styles/layout.module.scss'

const Layout = ({
  children,
  title,
  pages
}: {
  children: ReactNode,
  title: string,
  pages: string[]
}) => {
  return (
    <>
      <Header
        title={title}
        pages={pages}
      />
      <main className={styles.main}>
        <section>
          {children}
        </section>
      </main>
      <Footer
        title={title}
      />
    </>
  )
}

export default Layout