import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { FAQ } from '@/components/home-sections/home';
import { HolidayDiscountHero, HolidayDiscountPricingDisplay } from '@/components/about-components/promotions';
import GoogleTags from '@/components/google/conversion';

const raleway = Raleway({subsets: ['latin']})

export default function HolidayPromotion() {
  
    return (
    <>
      <Head>
        <title>Zesti Holiday Promotion | 50% Off Premium Subscription</title>
        <meta name="title" content="Zesti Holiday Promotion | 50% Off Premium Subscription"/>
        <meta name="description" content="Let AI generate amazing recipe ideas just for you or take control use it to help create something amazing from scratch!"/>
        <meta name="robots" content="noindex"/>
        <GoogleTags/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <HolidayDiscountHero/>
        <HolidayDiscountPricingDisplay/>
        <FAQ/>
      </main>
    </>
  )
}


