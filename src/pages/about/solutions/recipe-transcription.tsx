import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { HomePageCTA, HomeFAQ, HomeVideoToRecipe } from '@/components/ui/features/users';
import { ThreeBoxFeature } from '@/components/ui/general';
import { SharedHero } from '@/components/ui/general';
import { PromoteKitTag } from '@/components/tags/headertags';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Raleway } from 'next/font/google'

const raleway = Raleway({subsets: ['latin']})

export default function RecipeTranscription() {
  
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
        <meta name="description" content="Cooking should be fun, not stressful. Zesti AI Assistant is there when you need it."/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen space-y-48 ${raleway.className}`}>
        <SharedHero 
            titleStart={"Instant Video to Recipe using"} 
            titleEnd={"AI"} 
            description={"Zesti uses AI to instantly transcribe video recipes into text for everyone to enjoy"} 
            button={() => router.push('/auth/login')} buttonName={'Get Started!'}
            imageSrc={"/images/Zesti-Creator-Hero-Image.png"}
        />
        <ThreeBoxFeature 
          type={'howitworks'} 
          titleStart={"How it"} 
          titleEnd={"Works"} 
          desc={"Zesti uses AI to capture audio and convert it into a clear and concise recipe"}
        />
        <HomeVideoToRecipe titleStart={"Get Instant Readable Recipes from"} titleEnd={"TikTok"} desc={"No more pausing, rewinding or rewatching. Translate TikTok recipes into text so you can enjoy delicious home cooked meals too!"}/>
        <HomePageCTA/>
        <HomeFAQ/>
      </main>
    </>
  )
}
