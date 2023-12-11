import { Html, Head, Main, NextScript } from 'next/document'
import GoogleTags from '@/components/google/conversion'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <GoogleTags/>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5837655994202747" crossOrigin="anonymous"></script>
      </Head>
      <body>
        <Main />
        <NextScript/>
      </body>
    </Html>
  )
}