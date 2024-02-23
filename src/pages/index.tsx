import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { HomePageScroller, HomePageTools, HomePageCTA, HomeFAQ, HomeVideoToRecipe, Hero, CreatorCTA, ChatFeature, CookBookFeature } from '@/components/home';
import { useAuth } from './api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'
import { useState, useEffect } from 'react';
import { GetRandomCreatorsForHomepage } from './api/firebase/functions';
import { useRouter } from 'next/router';
const raleway = Raleway({subsets: ['latin']})


interface Creator {
  name: string;
  desc: string;
  imageSrc: string;
  href: string;
}

export default function Home() {
  
  const { isLoading, creatorData } = useAuth();
  const [ creators, setCreators ] = useState<Creator[]>()
  const router = useRouter();

  useEffect(() => {
    const fetchCreators = async () => {
      const res = await GetRandomCreatorsForHomepage(3)
      setCreators(res)
    }

    fetchCreators();
  },[])

  useEffect(() => {
    const via = router.query.via;
    if(via) { router.push(`/${via}`)}
  },[router])
  
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
        <ChatFeature/>
        <CookBookFeature/>
        <HomePageCTA/>
        <CreatorCTA title={"Join Creator Program"} isHome={true}/>
        <HomeFAQ/>
      </main>
    </>
  )
}
