import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import { FAQ } from '@/components/home-sections/faq';
import { Optimize } from '@/components/home-sections/optimize'
import Head from 'next/head';
import { Reach } from '@/components/home-sections/reach';
import { createCheckoutSession } from './api/stripe/stripePayments';
const raleway = Raleway({subsets: ['latin']})
import { useAuth } from './api/auth/auth';

export default function Home() {

  const {user} = useAuth()

  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width" />
      <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      <meta name="description" content="AgenceX - SEO Agency website landing page made with ASTROJS and TAILWINDCSS"/>
      <title>Zesti - AI Cooking and Recipe Assistant</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
      <Hero/>

      {/* CURRENTLY CALLING CREATECHECKOUT SESSION RETURNS A URL FOR THE STRIPE */}
      <button className="text-red-600 text-lg" onClick={() => createCheckoutSession(user?.uid)}>TEST</button>
      <Optimize/>
      <Reach/>
      <FAQ/>
    </main>
    </>
  )
}
