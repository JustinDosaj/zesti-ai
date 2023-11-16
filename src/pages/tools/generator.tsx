import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import Head from 'next/head';
import ChatComponent from '@/components/hub/chat';

const raleway = Raleway({subsets: ['latin']})

export default function Generator() {
  // Comment
  return (
    <>
      <Head>
        <title>Zesti AI | Creative Recipe Generator | Try for Free</title>
        <meta name="title" content="Zesti AI | Creative Recipe Generator | Try for Free"/>
        <meta name="description" content="Use AI to create recipes for free, and to help you through the process of making the dish you have chosen!"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <Hero/>
        <ChatComponent/>
      </main>
    </>
  )
}
