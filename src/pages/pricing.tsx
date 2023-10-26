import { Raleway } from 'next/font/google'
import { PricingList } from '@/components/pricing-sections/pricing'
import Head from 'next/head'


const raleway = Raleway({subsets: ['latin']})

export default function Pricing() {

  return (
    <>
    <Head>
      <title>Zesti | Affordable AI-Powered Recipe Conversion Pricing</title>
      <meta name="description" content="Explore affordable pricing options for Zesti's AI-powered recipe conversion. Flexible plans to suit your culinary adventures. Try us today!"/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
      <PricingList/>
    </main>
    </>
  )
}