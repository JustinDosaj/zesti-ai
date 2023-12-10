import { Raleway } from 'next/font/google'
import Head from 'next/head';
import GoogleTags from '@/components/google/conversion';
import { HomePageScroller, HomePageTools, HomePageHero, HomePageCTA, HomeFAQ } from '@/components/home-sections/home2';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {
  // Comment

  return (
    <>
      <Head>
        <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
        <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
        <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
        <GoogleTags/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <HomePageHero/>
        <HomePageTools/>
        <HomePageScroller/>
        <div className="mt-24"/>
        <HomePageCTA/>
        <div className="mt-24"/>
        <HomeFAQ/>
      </main>
    </>
  )
}
