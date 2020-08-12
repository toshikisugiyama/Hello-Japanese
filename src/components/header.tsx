import Link from 'next/link'
import styles from '../styles/layout.module.scss'
import { motion, useViewportScroll, useTransform, MotionValue } from 'framer-motion'
const Header = () => {
  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useViewportScroll()
  const translate: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [-100, 0])
  const opacity: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.header
      className={styles.header}
      style={{ translateY: translate, opacity }}
    >
      <section className={styles.section}>
        <h1 className={styles.section__logo}>
          <Link href="/"><a>Hello Japanese</a></Link>
        </h1>
      </section>
    </motion.header>
  )
}

export default Header