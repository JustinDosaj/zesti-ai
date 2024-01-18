import { Raleway } from 'next/font/google'
import { useAuth } from '../../api/auth/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { PricingDisplay } from '@/components/about/pricing'
import GoogleTags from '@/components/tags/conversion'
import { PromoteKitTag } from '@/components/tags/headertags'
import { FreeSubscriptionHero, HomePageCTA, HomePageScroller, HomePageTools, HomeVideoToRecipe, HomeFAQ } from '@/components/home'
const raleway = Raleway({subsets: ['latin']})

export default function Essential() {
    
    const { user, stripeRole } = useAuth()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const router = useRouter();

    const FreeClick = async () => {
        setIsLoading(true);
        router.push('/cookbook')
        setIsLoading(false)
    }

  return (
    <>
    <Head>
        <title>Zesti Free | AI Cooking Assistant | Free to Use</title>
        <meta name="title" content="Zesti Free | AI Cooking Assistant | Free to Use"/>
        <meta name="description" content="Subscribe to Zesti Free to gain no cost access to save cooking videos as text recipes. Plus gain access to the cooking chat AI assistant. Try for free. No credit card required."/>
        <GoogleTags/>
        <PromoteKitTag/>
    </Head>
    <div className="bg-white">
    {/* Header */}
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        {/* Background */}
        <FreeSubscriptionHero/>
        <PricingDisplay/>
        <HomePageTools/>
        <HomePageScroller/>
        <div className="mt-24 md:mt-36"/>
        <HomeVideoToRecipe/>
        <div className=""/>
        <HomePageCTA/>
        <div className="mt-24"/>
        <HomeFAQ/>
        <div className="pb-12"></div>
    </main>
    </div>
    </>
  )
}
