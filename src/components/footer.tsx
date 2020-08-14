import styles from '../styles/layout.module.scss'
import CopyRight from './copy-right'
import SnsIcons from './sns-icons'

const Footer = ({title}) => {
  return (
    <footer className={styles.footer}>
      <section>
        <div className={styles.footer__sns}>
          <SnsIcons />
        </div>
        <CopyRight
          name={title}
        />
      </section>
    </footer>
  )
}

export default Footer