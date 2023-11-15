import { Raleway } from 'next/font/google'
import { PricingList } from '@/components/pricing-sections/pricing'
import Head from 'next/head'
import GoogleTags from '@/components/google/conversion'


const raleway = Raleway({subsets: ['latin']})

export default function Pricing() {

  return (
    <>
    <Head>
      <title>Zesti AI | Subscribe to Gain Exclusive Access | Try for Free</title>
      <meta name="title" content="Zesti AI | Subscribe to Gain Exclusive Access | Try for Free"/>
      <meta name="description" content="Explore affordable pricing options for Zesti's AI-powered video to recipe converter. Flexible plans to suit your culinary adventures. Try us today!"/>
      <GoogleTags/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
      <PricingList/>
    </main>
    </>
  )
}