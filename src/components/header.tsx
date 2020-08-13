import Link from 'next/link'
import styles from '../styles/layout.module.scss'
import { motion, useViewportScroll, MotionValue, useTransform } from 'framer-motion'
import { useRouter, NextRouter } from 'next/router'
const Header = ({ title }: {title: string}) => {
  const router: NextRouter = useRouter()
  const isToppage: boolean = router.pathname === '/' ? true : false
  const { scrollY } = useViewportScroll()
  const top: MotionValue<number> = useTransform(scrollY, [0, 10, 100], [-100, -90, 0])
  const opacity: MotionValue<number> = useTransform(scrollY, [0, 30, 100], [0, 0.3, 1])
  return (
    <motion.header
      className={styles.header}
      style={ isToppage ? { y: top, opacity } : {}}
    >
      <section className={styles.section}>
        <h1 className={styles.section__logo}>
          <Link href="/"><a>{title}</a></Link>
        </h1>
      </section>
    </motion.header>
  )
}

export default Header