import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { HomePageScroller, HomePageCTA, HomeFAQ, HomeVideoToRecipe, Hero, ChatFeature, CookBookFeature } from '@/components/ui/features/users';
import { CreatorCTA } from '@/components/ui/features/creators';
import { useAuth } from './api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { PromoteKitTag } from '@/components/tags/headertags';
import { useState, useEffect } from 'react';
import { GetRandomCreatorsForHomepage } from './api/firebase/functions';
import { ThreeBoxFeature } from '@/components/ui/general';
import { useRouter } from 'next/router';
import { Raleway } from 'next/font/google'

const raleway = Raleway({subsets: ['latin']})


interface Creator {
  name: string;
  desc: string;
  imageSrc: string;
  href: string;
}

export default function Home() {
  
  const { isLoading, creatorData, user } = useAuth();
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
        <title>Zesti AI | Find Transcribed Recipes from TikTok</title>
        <meta name="title" content="Zesti AI | Find Transcribed Recipes from TikTok"/>
        <meta name="description" content="Spend less time writing recipes down and more time cooking! Find transcribed recipes from your favorite TikTok Chefs or transcribe a recipe yourself!"/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen space-y-48 ${raleway.className}`}>
        <Hero titleStart={"Instantly Get Recipes from"} titleEnd={"TikTok"} description={"Quickly search your favorite tiktok chefs and get easy-to-read recipes"}/>
        <ThreeBoxFeature type={'home'} titleStart={'TikTok Recipes'} titleEnd={'Made Easy'} desc={"Get easy-to-read instructions and ingredients for those delicious TikTok recipes"}/>
        <HomePageScroller creators={creators}/>
        <HomeVideoToRecipe titleStart={"Get Instant Readable Recipes from"} titleEnd={"TikTok"} desc={"No more pausing, rewinding or rewatching. Translate TikTok recipes into text so you can enjoy delicious home cooked meals too!"}/>
        <ChatFeature/>
        <CookBookFeature titleStart={"Discover Recipes from the Best"} titleEnd={"TikTok Chefs"} desc={"Check out the pages of TikTok chefs to get a list of all their public recipes intantly!"}/>
        <HomePageCTA/>
        <CreatorCTA title={"Join Creator Program"} isHome={true}/>
        <HomeFAQ/>
      </main>
    </>
  )
}
