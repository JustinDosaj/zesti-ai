import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { PremiumUserHero } from '@/components/about-components/welcome';
import GoogleTags from '@/components/google/conversion';

const raleway = Raleway({subsets: ['latin']})

export default function WelcomePremiumUser() {
  
    return (
    <>
    <Head>
        <title>Zesti AI | Login or Sign Up | Try for Free </title>
        <meta name="description" content="Join Zesti to gain access to the best AI powered kitchen tool that helps you quickly save and edit recipes from cooking videos"/>
        <meta name="robots" content="noindex" />
        <GoogleTags/>
     </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <PremiumUserHero/>
      </main>
    </>
  )
}
