import styles from '../styles/layout.module.scss'
import CopyRight from './copy-right'
const Footer = ({title}) => {
  return (
    <footer className={styles.footer}>
      <section>
        <CopyRight
          name={title}
        />
      </section>
    </footer>
  )
}

export default Footer