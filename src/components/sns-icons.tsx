import styles from '../styles/sns-icons.module.scss'

interface SnsItem {
  name: string,
  url: string
}

const SnsIcons = () => {
  const snsItems: SnsItem[] = [
    {
      name: 'twitter',
      url: 'https://twitter.com/HelloJapanese1'
    },
    {
      name: 'instagram',
      url: 'https://www.instagram.com/hellojapanese1'
    },
  ]
  const path: string = 'https://hello-japanese.s3.ap-northeast-1.amazonaws.com/2020/04/'

  return (
    <div className={styles.sns}>
      {snsItems.map(({name, url}) => (
        <a href={url} key={name}>
          <img src={`${path}${name}.png`} alt={name} width={50} />
        </a>
      ))}
    </div>
  )
}

export default SnsIcons