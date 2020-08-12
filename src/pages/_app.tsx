import 'reset-css'
import '../styles/globals.scss'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
