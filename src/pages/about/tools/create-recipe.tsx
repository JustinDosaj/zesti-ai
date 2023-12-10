import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { CreateRecipeHero, CreateRecipeQuickGuide } from '@/components/about-components/tools';
import { HomeDashDisplay, HomeRecipeDisplay } from '@/components/home-sections/home';
import GoogleTags from '@/components/google/conversion';
import { HomeFAQ, HomePageCTA } from '@/components/home-sections/home2';

const raleway = Raleway({subsets: ['latin']})

export default function SocialMediaRecipe() {
  
    return (
    <>
      <Head>
        <title>Zesti | Best AI Recipe Idea Generator</title>
        <meta name="title" content="Zesti | Best AI Recipe Idea Generator"/>
        <meta name="description" content="Let AI generate amazing recipe ideas just for you or take control use it to help create something amazing from scratch!"/>
        <GoogleTags/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <CreateRecipeHero/>
        <CreateRecipeQuickGuide/>
        <HomeDashDisplay/>
        <HomeRecipeDisplay/>
        <HomePageCTA/>
        <div className="mt-16"/>
        <HomeFAQ/>
      </main>
    </>
  )
}
