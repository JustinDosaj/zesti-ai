import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import { FAQ } from '@/components/home-sections/faq';
import { Optimize } from '@/components/home-sections/optimize'
import Head from 'next/head';
import { Reach } from '@/components/home-sections/reach';
import GoogleTags from '@/components/google/conversion';
import React, { useEffect } from 'react';

const raleway = Raleway({subsets: ['latin']})


export default function Success() {

  return (
    <>
      <Head>
        <title>Zesti | Turn Youtube Cooking Videos into Readable Recipes</title>
        <meta name="description" content="Transform YouTube cooking videos into easy-to-follow recipes with Zesti. Experience clutterless and easy-to-follow recipes with our AI-powered tool. Start now!"/>
        <meta name="robots" content="noindex" />
        <GoogleTags/>
        <script dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {'send_to': 'AW-11391923080/-WyuCOnWnfEYEIjni7gq'});
          `
        }} />
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
