import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { WebRecipeHero, WebRecipeQuickGuide } from '@/components/about-components/tools';
import { FAQ, TryPremiumCTA, HomeChat, HomeDashDisplay, HomeRecipeDisplay } from '@/components/home-sections/home';

const raleway = Raleway({subsets: ['latin']})

export default function SocialMediaRecipe() {
  
    return (
    <>
      <Head>
        <title>Zesti | Remove Clutter & Ads from Recipes</title>
        <meta name="title" content="Zesti | Remove Clutter & Ads from Recipes"/>
        <meta name="description" content="Let Zesti AI remove the clutter and ad spam that occurs on website recipes."/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <WebRecipeHero/>
        <WebRecipeQuickGuide/>
        <HomeChat/>
        <HomeDashDisplay/>
        <HomeRecipeDisplay/>
        <TryPremiumCTA/>
        <FAQ/>
      </main>
    </>
  )
}
