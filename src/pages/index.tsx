import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import { FAQ } from '@/components/home-sections/faq';
import { Optimize } from '@/components/home-sections/optimize'
import Head from 'next/head';
import { Reach } from '@/components/home-sections/reach';
import HowItWorks from '@/components/home-sections/howitworks';
import Link from 'next/link';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {

  return (
    <>
      <Head>
        <title>Zesti AI | Easily Save & Edit Recipes from Cooking Videos</title>
        <meta name="description" content="Easily save & edit recipes found from cooking videos with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
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
