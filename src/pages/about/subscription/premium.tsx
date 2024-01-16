import { Raleway } from 'next/font/google'
import { useAuth } from '../../api/auth/auth'
import { createPremiumCheckoutSession } from '../../api/stripe/stripePremium'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { PricingDisplay } from '@/components/about/pricing'
import GoogleTags from '@/components/tags/conversion'
import { PromoteKitTag } from '@/components/tags/headertags'
import { HomeFAQ, HomePageCTA, HomePageScroller, HomePageTools, HomeVideoToRecipe, PremiumSubscriptionHero } from '@/components/home'
const raleway = Raleway({subsets: ['latin']})

export default function Premium() {
    
    const { user, stripeRole } = useAuth()
    const [ setIsLoading ] = useState<boolean>(false)

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
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className} animate-fadeIn`}>
        {/* Header section */}
        <PremiumSubscriptionHero/>
        <PricingDisplay/>
        <HomePageTools/>
        <HomePageScroller/>
        <div className="mt-24 md:mt-36"/>
        <HomeVideoToRecipe/>
        <div className=""/>
        <HomePageCTA/>
        <div className="mt-24"/>
        <HomeFAQ/>
    </main>
    </div>
    </>
  )
}
