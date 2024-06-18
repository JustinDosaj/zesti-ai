import { PricingDisplay, PricingTitle } from '@/components/ui/features/pricing'
import Head from 'next/head'

export default function Pricing() {

  return (
    <>
    <Head>
      <title>Zesti AI | Find Transcribed TikTok Recipes | Try for Free</title>
      <meta name="title" content="Zesti AI | Find Transcribed TikTok Recipes | Try for Free"/>
      <meta name="description" content="Discover already transcribed TikTok recipes so you can spend less time writing and more time cooking!"/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background w-full pb-36`}>
      <div className="mt-2 lg:mt-10"/>
      <PricingTitle/>
      <PricingDisplay/>
    </main>
    </>
  )
}