import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { HomePageCTA, ChatFeature } from '@/components/ui/features/users';
import { ThreeBoxFeature } from '@/components/ui/general';
import { SharedHero, FAQ } from '@/components/ui/general';
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
        <meta name="description" content="Cooking should be fun, not stressful. Zesti AI Assistant is there when you need it."/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen space-y-48 pb-48 ${raleway.className}`}>
        <SharedHero 
            titleStart={"Cooking Made Easy with"} 
            titleEnd={"Zesti AI Chat"} 
            description={"Cooking should be fun, not stressful. That\n's why Zesti AI Assistant is there when you need it."} 
            button={() => router.push('/auth/login')} buttonName={'Get Started!'}
            imageSrc={"/images/Zesti-Creator-Hero-Image.png"}
        />
        <ChatFeature/>
        <ThreeBoxFeature 
          type={'assistant'} 
          titleStart={"Our Chat"} 
          titleEnd={"Has You Covered"} 
          desc={"Cooking has never been easier than when you have Zesti by your side"}
        />
        <HomePageCTA/>
        <FAQ type={'user'} title={"General FAQ"} desc={"Most commong questions and answers among all of our users"}/>
      </main>
    </>
  )
}
