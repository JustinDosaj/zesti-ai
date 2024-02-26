import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { CookBookFeature, CreatorFAQ, HomeVideoToRecipe, CreatorHero, CreatorCTA } from '@/components/home';
import { useAuth } from '@/pages/api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'

const raleway = Raleway({subsets: ['latin']})

export default function Home() {
  
  const { isLoading } = useAuth();

  if (isLoading) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
        <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
        <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen space-y-48 ${raleway.className}`}>
        <CreatorHero titleStart={"Put Your Recipes on"} titleEnd={"Display"} description={"Join our creator program to put your recipes on display and start earning commission"}/>
        <CreatorCTA title={"Zesti Creator Program"} isHome={false}/>
        <HomeVideoToRecipe titleStart={"Transcribe Cooking Videos to"} titleEnd={"Recipes"} desc={"Instantly generate a step-by-step recipe for your followers using Zesti AI"}/>
        <CookBookFeature titleStart={"All Your Recipes"} titleEnd={"In One Place"} desc={"Let your followers explore your entire recipe collection from a single link"}/>
        <CreatorFAQ/>
      </main>
    </>
  )
}
