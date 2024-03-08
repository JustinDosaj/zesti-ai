import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { HomePageTools, HomePageCTA, HomeFAQ, HomeVideoToRecipe, ChatFeature, CookBookFeature } from '@/components/ui/features/users';
import { CreatorCTA } from '@/components/ui/features/creators';
import { SharedHero } from '@/components/ui/general';
import { PromoteKitTag } from '@/components/tags/headertags';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Raleway } from 'next/font/google'

const raleway = Raleway({subsets: ['latin']})

export default function CookingAssistant() {
  
  const router = useRouter();

  useEffect(() => {
    const via = router.query.via;
    if(via) { router.push(`/${via}`)}
  },[router])


  return (
    <>
      <Head>
        <title>Zesti AI Cooking Assistant | Recipes Made Easy</title>
        <meta name="title" content="Zesti AI Cooking Assistant | Recipes Made Easy"/>
        <meta name="description" content="Spend less time writing recipes down and more time cooking! Find transcribed recipes from your favorite TikTok Chefs or transcribe a recipe yourself!"/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen space-y-48 ${raleway.className}`}>
        <SharedHero 
            titleStart={"Instantly Get Recipes from"} 
            titleEnd={"TikTok"} 
            description={"Quickly search your favorite tiktok chefs and get easy-to-read recipes"} 
            button={() => router.push('/auth/login')} buttonName={'Get Started'}
            imageSrc={"/images/new-aff-img.png"}
        />
        <HomePageTools/>
        <HomeVideoToRecipe 
            titleStart={"Get Instant Readable Recipes from"} 
            titleEnd={"TikTok"} 
            desc={"No more pausing, rewinding or rewatching. Translate TikTok recipes into text so you can enjoy delicious home cooked meals too!"}
        />
        <ChatFeature/>
        <CookBookFeature 
            titleStart={"Discover Recipes from the Best"} 
            titleEnd={"TikTok Chefs"} 
            desc={"Check out the pages of TikTok chefs to get a list of all their public recipes intantly!"}
        />
        <HomePageCTA/>
        <CreatorCTA 
            title={"Join Creator Program"} 
            isHome={true}
        />
        <HomeFAQ/>
      </main>
    </>
  )
}
