import { Raleway } from 'next/font/google'
import Head from 'next/head';
import GoogleTags from '@/components/google/conversion';
import { HomePageScroller, HomePageTools, HomePageHero, HomePageCTA, HomeFAQ, HomeVideoToRecipe } from '@/components/home-sections/home2';
import { useAuth } from './api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { RewardfulTag } from '@/components/tags/headertags';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {
  
  const { isLoading } = useAuth();

  if (isLoading) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
        <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
        <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
        <GoogleTags/>
        <RewardfulTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <HomePageHero/>
        <HomePageTools/>
        <HomePageScroller/>
        <div className="mt-24 md:mt-36"/>
        <HomeVideoToRecipe/>
        <div className=""/>
        <HomePageCTA/>
        <div className="mt-24"/>
        <HomeFAQ/>
      </main>
    </>
  )
}
