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
import GoogleTags from '@/components/google/conversion'
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
    </Head>
    <div className="bg-white">
    {/* Header */}
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        {/* Background */}
        <div
        className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        aria-hidden="true"
        >
        <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
            clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
        />
        </div>

        {/* Header section */}
        <div className="px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl pt-24 text-center sm:pt-40 space-y-8">
            <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">
                    
                <span className="text-black">Try</span>       
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Zesti Premium </span>
                <span className="text-black">Free for 7-Days</span> 
            </h1>
            <div className="mt-6 text-lg leading-8 text-gray-700">
                Zesti premium grants you access to every feature it has available and gives you 10x more recipe saves than our base version!
            </div>
            {isLoading == true ?
            <div className="flex justify-center">
              <Loader/>
            </div>
            :
            user && stripeRole !== 'premium' ? 
            <Button text="Start Free Trial!" onClick={PremiumClick} buttonType="button"/>
            : !user ?
            <Button text="Login to Begin Trial" onClick={() => router.push('/login')} buttonType="button" className=""/>
            :
            <Button text="Go to Dashboard" onClick={() => router.push('/dashboard')} buttonType="button" className=""/>
            }
        </div>
        </div>

        {/* Description Section */}
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-primary-main">Premium</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What You Get</p>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Zesti premium grants you access to all the features we have to offer!
                    </p>
                </div>
                <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
                    {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                        <dt className="font-semibold text-gray-900">
                        <CheckIcon className="absolute left-0 top-1 h-5 w-5 text-color-alt-green" aria-hidden="true" />
                        {feature.name}
                        </dt>
                        <dd className="mt-2">{feature.description}</dd>
                    </div>
                    ))}
                </dl>
                </div>
            </div>
        </div>
        <PricingDisplay/>
        <div className="pb-12"/>
    </main>
    </div>
    </>
  )
}
