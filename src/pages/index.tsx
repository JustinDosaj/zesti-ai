import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import { FAQ } from '@/components/home-sections/faq';
import { Optimize } from '@/components/home-sections/optimize'
import Head from 'next/head';
import { Reach } from '@/components/home-sections/reach';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {

  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width" />
      <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      <meta name="description" content="AgenceX - SEO Agency website landing page made with ASTROJS and TAILWINDCSS"/>
      <title>Webnest - AI Generated SEO & Google Ads</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
      <Hero/>
      <Optimize/>
      <Reach/>
      <FAQ/>
    </main>
    </>
  )
}
