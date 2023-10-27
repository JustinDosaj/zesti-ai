import { Html, Head, Main, NextScript } from 'next/document'
import GoogleTags from '@/components/google/conversion'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <GoogleTags/>
      </Head>
      <body>
        <Main />
        <NextScript/>
      </body>
    </Html>
  )
}