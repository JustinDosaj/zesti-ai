import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { CreateHero, WebRecipeQuickGuide } from '@/components/about/tools';
import GoogleTags from '@/components/tags/conversion';
import { HomeFAQ, HomePageCTA } from '@/components/home';
import { PromoteKitTag } from '@/components/tags/headertags';

const raleway = Raleway({subsets: ['latin']})

export default function SocialMediaRecipe() {
  
    return (
    <>
      <Head>
        <title>Zesti | Remove Clutter & Ads from Recipes</title>
        <meta name="title" content="Zesti | Remove Clutter & Ads from Recipes"/>
        <meta name="description" content="Let Zesti AI remove the clutter and ad spam that occurs on website recipes."/>
        <GoogleTags/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <CreateHero titleStart='Remove' titleMiddle='Clutter' titleEnd='From Web Recipes' description="Use Zesti to remove excess stories, clutter & ads from webiste recipes"/>
        <WebRecipeQuickGuide/>
        <HomePageCTA/>
        <div className="mt-16"/>
        <HomeFAQ/>
        <PromoteKitTag/>
      </main>
    </>
  )
}
