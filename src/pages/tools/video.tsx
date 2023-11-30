import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { VideoComponent, VideoHero, VideoTips } from '@/components/hub/video';
import { useAuth } from '../api/auth/auth';
import { PricingDisplay } from '@/components/pricing-sections/pricing';
import { FAQ } from '@/components/home-sections/home';
import { ToolLoader } from '@/components/shared/loader';

const raleway = Raleway({subsets: ['latin']})

export default function Video() {

  const { user, stripeRole, isLoading } = useAuth()

  return (
    <>
      <Head>
        <title>Zesti | Instantly Save YouTube & Tiktok Recipes as Text</title>
        <meta name="title" content="Zesti | Instantly Save YouTube & Tiktok Recipes as Text"/>
        <meta name="description" content="Say good by to pausing and rewinding, Zesti AI Video to Text Recipe creates an easy-to-follow ingredient and instruction list"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <VideoHero role={stripeRole}/>
        { isLoading == true ?
        <ToolLoader/>
        :
        stripeRole == 'premium' ?
          <div>
            <VideoComponent/>
            <VideoTips/>
          </div>
          :
          <PricingDisplay/>
        }
        <FAQ/>
      </main>
    </>
  )
}
