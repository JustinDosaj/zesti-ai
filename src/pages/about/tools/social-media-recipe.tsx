import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { SocialMediaRecipeHero, SocialMediaRecipeQuickGuide } from '@/components/about-components/tools';
import { FAQ, TryPremiumCTA, HomeChat, HomeDashDisplay, HomeRecipeDisplay } from '@/components/home-sections/home';

const raleway = Raleway({subsets: ['latin']})

export default function SocialMediaRecipe() {
  
    return (
    <>
      <Head>
        <title>Zesti | Instantly Save YouTube & Tiktok Recipes</title>
        <meta name="title" content="Zesti | Instantly Save YouTube & Tiktok Cooking Videos"/>
        <meta name="description" content="Say good by to pausing and rewinding, Zesti AI Video to Text Recipe creates an easy-to-follow ingredient and instruction list"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <SocialMediaRecipeHero/>
        <SocialMediaRecipeQuickGuide/>
        <HomeChat/>
        <HomeDashDisplay/>
        <HomeRecipeDisplay/>
        <TryPremiumCTA/>
        <FAQ/>
      </main>
    </>
  )
}