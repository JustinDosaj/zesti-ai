import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import { FAQ } from '@/components/home-sections/faq';
import { Optimize } from '@/components/home-sections/optimize'
import Head from 'next/head';
import { Reach } from '@/components/home-sections/reach';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {

  /* SEEMS LIKE CANCELING IMMEDIATELY GETS RID OF FIREBASE ROLE SO I CAN ADD
    FIREBASE STATUS TO METADATA PRODUCT DATA AND ADD FIREBASE STATUS TO
    USE AUTH LIKE I DID WITH ROLE.
  */

  return (
    <>
      <Head>
        <title>Zesti | Turn Youtube Cooking Videos into Readable Recipes</title>
        <meta name="description" content="Transform YouTube cooking videos into easy-to-follow recipes with Zesti. Experience clutterless and easy-to-follow recipes with our AI-powered tool. Start now!"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <Hero/>
        <Optimize/>
        <Reach/>
        <FAQ/>
      </main>
    </>
  )
}
