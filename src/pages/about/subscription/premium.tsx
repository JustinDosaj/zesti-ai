import { Raleway } from 'next/font/google'
import Head from 'next/head'
import { PricingDisplay } from '@/components/ui/features/pricing'
import GoogleTags from '@/components/tags/conversion'
import { PromoteKitTag } from '@/components/tags/headertags'
import { Hero, HomePageCTA, HomeVideoToRecipe } from '@/components/ui/features/users'
import { PremiumSubscriptionBenefits } from '@/components/ui/features/subscriptions'
import { FAQ } from '@/components/ui/general'

const raleway = Raleway({subsets: ['latin']})

export default function Premium() {
  return (
    <>
    <Head>
        <title>Zesti Premium | Chatgpt Cooking Assistant | Best Value</title>
        <meta name="title" content="Zesti Premium | Best Chatgpt Cooking Assistant"/>
        <meta name="description" content="Subscribe to Zesti Premium to gain the best value access to edit and save cooking videos as text recipes. Plus gain access to the cooking chat AI assistant. Try for free. No credit card required."/>
        <GoogleTags/>
        <PromoteKitTag/>
    </Head>
    <div className="bg-white">
    {/* Header */}
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen ${raleway.className} animate-fadeIn`}>
        {/* Header section */}
        <Hero titleStart={"Start Your Free 7-Day Trial for"} titleEnd={"Zesti Premium"} description={"Get the most out of Zesti with premium to edit recipes, ask AI questions fly and more"}/>
        <PremiumSubscriptionBenefits/>
        <PricingDisplay/>
        <div className="mt-24 md:mt-36"/>
        <HomeVideoToRecipe titleStart={"Get Instant Readable Recipes from"} titleEnd={"TikTok"} desc={"No more pausing, rewinding or rewatching. Translate TikTok recipes into text so you can enjoy delicious home cooked meals too!"}/>
        <div className="mt-24 md:mt-36"/>
        <HomePageCTA/>
        <div className="mt-24 md:mt-36"/>
        <FAQ type={'user'} title={"General FAQ"} desc={"Most commong questions and answers among all of our users"}/>
    </main>
    </div>
    </>
  )
}
