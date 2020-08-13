import { ReactNode } from 'react'
import Header from '../components/header'
import Footer from './footer'
import styles from '../styles/layout.module.scss'

const Layout = ({children, title}: {children: ReactNode, title: string}) => {
  return (
    <>
      <Header
        title={title}
      />
      <main className={styles.main}>
        <section>
          {children}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Layout