import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import { FAQ } from '@/components/home-sections/faq';
import { Optimize } from '@/components/home-sections/optimize'
import Head from 'next/head';
import { Reach } from '@/components/home-sections/reach';
import HowItWorks from '@/components/home-sections/howitworks';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {

  return (
    <>
      <Head>
        <title>Zesti | Turn Youtube Cooking Videos into Readable Recipes</title>
        <meta name="description" content="Turn YouTube cooking videos into easy-to-follow text recipes. Experience easy-to-read recipes with our AI-powered tool. Try for free. No credit card required."/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <Hero/>
        <HowItWorks/>
        <Optimize/>
        <Reach/>
        <FAQ/>
      </main>
    </>
  )
}
