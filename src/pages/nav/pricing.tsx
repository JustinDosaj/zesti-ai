import { Raleway } from 'next/font/google'
import { PricingDisplay, PricingTitle } from '@/components/about/pricing'
import Head from 'next/head'
import GoogleTags from '@/components/tags/conversion'
import { PromoteKitTag } from '@/components/tags/headertags'


const raleway = Raleway({subsets: ['latin']})

export default function Pricing() {

  return (
    <>
    <Head>
      <title>Zesti AI | Subscribe to Gain Exclusive Access | 7-Day Free Trial</title>
      <meta name="title" content="Zesti AI | Subscribe to Gain Exclusive Access | 7 Day Free Trial"/>
      <meta name="description" content="Explore affordable pricing options for Zesti's AI-powered video to recipe converter. Flexible plans to suit your culinary adventures. Try us today!"/>
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
      <div className="mt-36"/>
      <PricingTitle/>
      <PricingDisplay/>
    </main>
    </>
  )
}