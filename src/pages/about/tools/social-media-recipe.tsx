import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { CreateHero } from '@/components/about/tools';
import GoogleTags from '@/components/tags/conversion';
import { HomeFAQ, HomePageCTA, HomeVideoToRecipe } from '@/components/home';
import { PromoteKitTag } from '@/components/tags/headertags';

const raleway = Raleway({subsets: ['latin']})

export default function SocialMediaRecipe() {
  
    return (
    <>
      <Head>
        <title>Zesti | Instantly Save YouTube & Tiktok Recipes</title>
        <meta name="title" content="Zesti | Instantly Save YouTube & Tiktok Cooking Videos"/>
        <meta name="description" content="Say good by to pausing and rewinding, Zesti AI Video to Text Recipe creates an easy-to-follow ingredient and instruction list"/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <CreateHero titleStart='Instantly Save' titleMiddle='TikTok & YouTube' titleEnd='Recipes' description='Say goodbye to pausing, rewinding and restarting. Zesti Premium lets you transform a cooking video from TikTok or YouTube to an easy-to-follow text recipe!'/>
        <HomeVideoToRecipe/>
        <HomePageCTA/>
        <div className="mt-16"/>
        <HomeFAQ/>
      </main>
    </>
  )
}
