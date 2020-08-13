const CopyRight = ({name}: {name: string}) => {
  const firstYear: number = 2018
  const thisYear: number = new Date().getFullYear()
  const year: string = firstYear < thisYear ? `${firstYear} - ${thisYear}` : `${firstYear}`
  return (
    <span>
      &#169;{` ${year} ${name}`}
    </span>
  )
}

export default CopyRight