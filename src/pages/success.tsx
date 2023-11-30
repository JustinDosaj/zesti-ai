import { Raleway } from 'next/font/google'
import { FAQ, TryPremiumCTA, Hero, ZestiTools, HomeChat, HomeDashDisplay, HomeRecipeDisplay } from '@/components/home-sections/home';
import Head from 'next/head';
import GoogleTags from '@/components/google/conversion';
import React from 'react';

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
            gtag('event', 'conversion', {'send_to': '${process.env.NEXT_PUBIC_GOOGLE_CONVERSION_ID}/${process.env.NEXT_PUBLIC_GOOGLE_SUBSCRIPTION_TRACKER}'});
          `
        }} />
      </Head>

      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <Hero/>
        <ZestiTools/>
        <HomeChat/>
        <HomeDashDisplay/>
        <HomeRecipeDisplay/>
        <TryPremiumCTA/>
        <FAQ/>
      </main>
    </>
  )
}
