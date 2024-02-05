import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { HomePageScroller, HomePageTools, HomePageCTA, HomeFAQ, HomeVideoToRecipe, Hero, CreatorCTA } from '@/components/home';
import { useAuth } from './api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'
import { useState, useEffect } from 'react';
import { Creator } from '@/components/shared/interface';
import { GetRandomCreatorsForHomepage } from './api/firebase/functions';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {
  
  const { isLoading, creatorData } = useAuth();
  const [ creators, setCreators ] = useState<Creator[]>() 

  console.log(creators)

  useEffect(() => {
    const fetchCreators = async () => {
      const res = await GetRandomCreatorsForHomepage(3)
      setCreators(res)
    }

    fetchCreators();
  },[])


  if (isLoading) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
        <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
        <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen space-y-48 ${raleway.className}`}>
        <Hero titleStart={"Instantly Get Recipes from"} titleEnd={"TikTok"} description={"Quickly search your favorite tiktok chefs and get easy-to-read recipes"}/>
        <HomePageTools/>
        <HomePageScroller creators={creators}/>
        <HomeVideoToRecipe/>
        <HomePageCTA/>
        <CreatorCTA title={"Join Creator Program"} isHome={true}/>
        <HomeFAQ/>
      </main>
    </>
  )
}
