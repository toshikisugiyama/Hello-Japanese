import 'reset-css'
import '../styles/globals.scss'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/android-chrome-512x512.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
