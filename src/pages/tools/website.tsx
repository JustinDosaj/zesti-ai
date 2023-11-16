import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import Head from 'next/head';
import UrlComponent from '@/components/hub/url';

const raleway = Raleway({subsets: ['latin']})

export default function Website() {
  // Comment
  return (
    <>
      <Head>
        <title>Zesti AI | Ad-Free Web Recipe</title>
        <meta name="title" content="Zesti AI | Ad-Free Web Recipe"/>
        <meta name="description" content="Tired of Ads? Avoid searching through endless clutter and simply input the web URL into Zesti for a recipe you want to enjoy!"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <Hero/>
        <UrlComponent/>
      </main>
    </>
  )
}
