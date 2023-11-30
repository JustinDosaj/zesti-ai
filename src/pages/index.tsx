import { Raleway } from 'next/font/google'
import Head from 'next/head';
import GoogleTags from '@/components/google/conversion';
import { FAQ, TryPremiumCTA, Hero2, ZestiTools, HomeChat, HomeDashDisplay, HomeRecipeDisplay } from '@/components/home-sections/home';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {
  // Comment

  return (
    <>
      <Head>
        <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
        <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
        <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
        <GoogleTags/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <Hero2/>
        <ZestiTools/>
        <HomeChat/>
        <HomeDashDisplay/>
        <HomeRecipeDisplay/>
        <TryPremiumCTA/>
        <FAQ/>
      </main>
    </>
  )
}
