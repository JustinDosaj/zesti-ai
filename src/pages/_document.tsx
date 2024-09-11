import { Html, Head, Main, NextScript } from 'next/document'
import { GoogleTags } from '@/components/tags/conversion'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <GoogleTags/>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5837655994202747" crossOrigin="anonymous"></script>
        <meta property="og:site_name" content="Zesti.ai"/>
      </Head>
      <body>
        <Main />
        <NextScript/>
      </body>
    </Html>
  )
}