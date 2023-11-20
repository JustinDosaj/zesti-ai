import { Raleway } from 'next/font/google'
import { Hero2 } from '@/components/home-sections/hero'
import { FAQ } from '@/components/home-sections/faq';
import { Optimize } from '@/components/home-sections/optimize'
import Head from 'next/head';
import { Reach } from '@/components/home-sections/reach';
import HowItWorks from '@/components/home-sections/howitworks';
import GoogleTags from '@/components/google/conversion';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {
  // Comment

  return (
    <>
      <Head>
        <title>Zesti AI | AI Cooking Assistant | Chat, Save & Edit</title>
        <meta name="title" content="Zesti AI | AI Cooking Assistant | Chat, Save & Edit"/>
        <meta name="description" content="Easily save & edit recipes found from cooking videos and chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
        <GoogleTags/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <Hero2/>
        <HowItWorks/>
        <Optimize/>
        <Reach/>
        <FAQ/>
      </main>
    </>
  )
}
