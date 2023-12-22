import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { CreateHero, CreateRecipeQuickGuide } from '@/components/about-components/tools';
import GoogleTags from '@/components/tags/conversion';
import { HomeFAQ, HomePageCTA } from '@/components/home-sections/home';

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
        <CreateHero titleStart="Create Amazing" titleMiddle="AI Generated" titleEnd="Recipes" description="Use Zesti to come up with recipe ideas from scratch or from ingredients you have on hand"/>
        <CreateRecipeQuickGuide/>
        <HomePageCTA/>
        <div className="mt-16"/>
        <HomeFAQ/>
      </main>
    </>
  )
}
