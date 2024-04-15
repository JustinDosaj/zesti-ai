import { Raleway } from 'next/font/google'
import { PricingDisplay, PricingTitle } from '@/components/ui/features/pricing'
import Head from 'next/head'
import GoogleTags from '@/components/tags/conversion'


const raleway = Raleway({subsets: ['latin']})

export default function Pricing() {

  return (
    <>
    <Head>
      <title>Zesti AI | Find Transcribed TikTok Recipes | Try for Free</title>
      <meta name="title" content="Zesti AI | Find Transcribed TikTok Recipes | Try for Free"/>
      <meta name="description" content="Discover already transcribed TikTok recipes so you can spend less time writing and more time cooking!"/>
      <GoogleTags/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background w-screen pb-36 ${raleway.className}`}>
      <div className="mt-36"/>
      <PricingTitle/>
      <PricingDisplay/>
    </main>
    </>
  )
}