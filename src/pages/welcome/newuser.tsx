import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { NewUserHero, WelcomePricingTitle } from '@/components/about-components/welcome';
import { FAQ, TryPremiumCTA, HomeChat, HomeDashDisplay, HomeRecipeDisplay } from '@/components/home-sections/home';
import { PricingDisplay } from '@/components/pricing-sections/pricing';
import GoogleTags from '@/components/google/conversion';

const raleway = Raleway({subsets: ['latin']})

export default function WelcomeNewUser() {
  
    return (
    <>
        <Head>
            <title>Zesti AI | Login or Sign Up | Try for Free </title>
            <meta name="description" content="Join Zesti to gain access to the best AI powered kitchen tool that helps you quickly save and edit recipes from cooking videos"/>
            <meta name="robots" content="noindex" />
            <GoogleTags/>
            <script dangerouslySetInnerHTML={{
            __html: `
                gtag('event', 'conversion', {'send_to': '${process.env.NEXT_PUBIC_GOOGLE_CONVERSION_ID}/${process.env.NEXT_PUBLIC_GOOGLE_SUBSCRIPTION_TRACKER}'});
            `
            }} />
        </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background my-auto ${raleway.className}`}>
        <NewUserHero/>
        <WelcomePricingTitle/>
        <PricingDisplay/>
      </main>
    </>
  )
}
