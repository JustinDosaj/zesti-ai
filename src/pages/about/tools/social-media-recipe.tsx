import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { SocialMediaRecipeHero, SocialMediaRecipeQuickGuide } from '@/components/about-components/tools';
import { HomeDashDisplay, HomeRecipeDisplay } from '@/components/home-sections/home';
import GoogleTags from '@/components/google/conversion';
import { HomeFAQ, HomePageCTA } from '@/components/home-sections/home2';

const raleway = Raleway({subsets: ['latin']})

export default function SocialMediaRecipe() {
  
    return (
    <>
      <Head>
        <title>Zesti | Instantly Save YouTube & Tiktok Recipes</title>
        <meta name="title" content="Zesti | Instantly Save YouTube & Tiktok Cooking Videos"/>
        <meta name="description" content="Say good by to pausing and rewinding, Zesti AI Video to Text Recipe creates an easy-to-follow ingredient and instruction list"/>
        <GoogleTags/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <SocialMediaRecipeHero/>
        <SocialMediaRecipeQuickGuide/>
        <HomeDashDisplay/>
        <HomeRecipeDisplay/>
        <HomePageCTA/>
        <div className="mt-16"/>
        <HomeFAQ/>
      </main>
    </>
  )
}
