import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { HolidayDiscountHero, HolidayDiscountPricingDisplay } from '@/components/about-components/promotions';
import GoogleTags from '@/components/tags/conversion';
import { RewardfulTag } from '@/components/tags/headertags';
import { HomeFAQ } from '@/components/home-sections/home';

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
        <RewardfulTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <HolidayDiscountHero/>
        <HolidayDiscountPricingDisplay/>
        <HomeFAQ/>
      </main>
    </>
  )
}


