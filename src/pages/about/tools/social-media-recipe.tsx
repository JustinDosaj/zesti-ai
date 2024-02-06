import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { Hero } from '@/components/home';
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
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen ${raleway.className}`}>
        <Hero titleStart={"Find & Save"} titleEnd={"TikTok Recipes"} description={"Say goodbye to pausing, rewinding and restarting. Zesti Premium lets you transform a cooking video from TikTok or YouTube to an easy-to-follow text recipe!"}/>
        <div className="mt-24 md:mt-36"/>
        <HomeVideoToRecipe/>
        <HomePageCTA/>
        <div className="mt-16"/>
        <HomeFAQ/>
      </main>
    </>
  )
}
