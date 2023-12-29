import { Raleway } from 'next/font/google'
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from '../api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { PromoteKitTag } from '@/components/tags/headertags';
import { AffiliateHero, AffiliateDetails } from '@/components/about/affiliate';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {
  
  const { isLoading } = useAuth();

  if (isLoading) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Zesti Affiliate Program</title>
        <meta name="title" content="Zesti Affiliate Program"/>
        <meta name="description" content="Earn up to 15% per subscription from users you refer! Sign up and get paid!"/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <AffiliateHero/>
        <AffiliateDetails/>
      </main>
    </>
  )
}
