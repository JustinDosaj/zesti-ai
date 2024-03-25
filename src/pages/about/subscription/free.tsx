import { Raleway } from 'next/font/google'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { PricingDisplay } from '@/components/ui/features/pricing'
import GoogleTags from '@/components/tags/conversion'
import { PromoteKitTag } from '@/components/tags/headertags'
import { HomePageCTA, HomeVideoToRecipe, Hero } from '@/components/ui/features/users'
import { FAQ } from '@/components/ui/general'
const raleway = Raleway({subsets: ['latin']})

export default function Essential() {
    
    const router = useRouter();

    const FreeClick = async () => {
        router.push('/my-recipes')
    }

  return (
    <>
    <Head>
        <title>Zesti Free | AI Cooking Assistant | Free-to-Use</title>
        <meta name="title" content="Zesti Free | AI Cooking Assistant | Free to Use"/>
        <meta name="description" content="Subscribe to Zesti Free to gain no cost access to save cooking videos as text recipes. Plus gain access to the cooking chat AI assistant. Try for free. No credit card required."/>
        <GoogleTags/>
        <PromoteKitTag/>
    </Head>
    <div className="bg-white">
    {/* Header */}
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen space-y-48 lg:space-y-64 pb-48 ${raleway.className}`}>
        {/* Background */}
        <Hero titleStart={"Use Zesti for"} titleEnd={"Free!"} description={"With the free version of Zesti you can search any creators and see their recipes"}/>
        <PricingDisplay/>
        <HomeVideoToRecipe titleStart={"Get Instant Readable Recipes from"} titleEnd={"TikTok"} desc={"No more pausing, rewinding or rewatching. Translate TikTok recipes into text so you can enjoy delicious home cooked meals too!"}/>
        <HomePageCTA/>
        <FAQ type={'user'} title={"General FAQ"} desc={"Most commong questions and answers among all of our users"}/>
    </main>
    </div>
    </>
  )
}
