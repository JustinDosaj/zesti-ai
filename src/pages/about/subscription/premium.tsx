import Link from 'next/link'
import { Raleway } from 'next/font/google'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Title } from '@/components/shared/title'
import { BtnLink, Button } from '@/components/shared/button'
import { useAuth } from '../../api/auth/auth'
import { createPremiumCheckoutSession } from '../../api/stripe/stripePremium'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Loader } from '@/components/shared/loader'
import { PricingDisplay } from '@/components/pricing-sections/pricing'
import GoogleTags from '@/components/tags/conversion'
import { RewardfulTag } from '@/components/tags/headertags'
import { HomeFAQ, HomePageCTA, HomePageScroller, HomePageTools, HomeVideoToRecipe, PremiumSubscriptionHero } from '@/components/home-sections/home'
const raleway = Raleway({subsets: ['latin']})

const features = [
    {
    name: 'Save 30 Recipes Per Month',
    description: 'Premium users are limited to 30 Tiktok, YouTube or Website recipe saves, but does not limit the AI recipe generator',
    },
  {
    name: 'Save TikTok & YouTube Recipes',
    description: 'Instantly save video recipes from TikTok or YouTube so you no longer have to pause, rewind or replay',
  },
  {
    name: 'Max Video Length',
    description: 'Premium users have a max video length of 15 minutes when saving TikTok or YouTube Recipes',
  },
  {
    name: 'Unlimited AI Generated Recipes',
    description: 'Use the AI Recipe Generator unlimited times so you will never run out of meal ideas',
  },
  {
    name: 'AI Cooking Support',
    description: 'Access an AI chat assistant while viewing a recipe so you can get all your cooking questions answered without losing your place',
  },
  {
    name: 'Customize Recipes',
    description: 'Freely edit ingredients and instructions of recipes to make them your own',
  },
  {
    name: 'Ad-Free',
    description: 'Get a 100% ad-free experience when you subscribe to Zesti premium',
  },
]

export default function Premium() {
    
    const { user, stripeRole } = useAuth()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const router = useRouter();

    const PremiumClick = async () => {
        setIsLoading(true);
        await createPremiumCheckoutSession(user?.uid)
    }

  return (
    <>
    <Head>
        <title>Zesti Premium | Chatgpt Cooking Assistant | Best Value</title>
        <meta name="title" content="Zesti Premium | Best Chatgpt Cooking Assistant"/>
        <meta name="description" content="Subscribe to Zesti Premium to gain the best value access to edit and save cooking videos as text recipes. Plus gain access to the cooking chat AI assistant. Try for free. No credit card required."/>
        <GoogleTags/>
        <RewardfulTag/>
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
