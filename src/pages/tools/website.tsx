import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import Head from 'next/head';
import { UrlComponent, UrlHero, UrlTips } from '@/components/hub/url';
import { useAuth } from '../api/auth/auth';
import { PricingDisplay } from '@/components/pricing-sections/pricing';
import { FAQ } from '@/components/home-sections/faq';

const raleway = Raleway({subsets: ['latin']})

export default function Website() {
  
  const { user, stripeRole } = useAuth()

  return (
    <>
      <Head>
        <title>Zesti AI | Ad-Free Web Recipe</title>
        <meta name="title" content="Zesti AI | Ad-Free Web Recipe"/>
        <meta name="description" content="Tired of Ads? Avoid searching through endless clutter and simply input the web URL into Zesti for a recipe you want to enjoy!"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
      <UrlHero/>
      { stripeRole == 'premium' ?
        <div>
          <UrlComponent/>
          <UrlTips/>
        </div>
        :
        <PricingDisplay/>
      }
      <FAQ/>
      </main>
    </>
  )
}