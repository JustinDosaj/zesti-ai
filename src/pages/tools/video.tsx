import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { VideoComponent, VideoTips, ToolHero } from '@/components/about/tools';
import { useAuth } from '../api/auth/auth';
import { PricingDisplay } from '@/components/about/pricing';
import { PageLoader, ToolLoader } from '@/components/shared/loader';
import GoogleTags from '@/components/tags/conversion';
import { PromoteKitTag } from '@/components/tags/headertags';
import { HomeFAQ } from '@/components/home';

const raleway = Raleway({subsets: ['latin']})

export default function Video() {

  const { user, stripeRole, isLoading, userData } = useAuth()

  console.log(userData)

  if(isLoading && user && userData) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Zesti | Instantly Save YouTube & Tiktok Recipes as Text</title>
        <meta name="title" content="Zesti | Instantly Save YouTube & Tiktok Recipes as Text"/>
        <GoogleTags/>
        <PromoteKitTag/>
        <meta name="description" content="Say good by to pausing and rewinding, Zesti AI Video to Text Recipe creates an easy-to-follow ingredient and instruction list"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
        <ToolHero role={stripeRole} tokens={userData?.tokens!} titleStart="Transcribe Recipes From" titleEnd='TikTok' description="Copy a video link from Tiktok then paste it below to transcribe the recipe to text!"/>
        { isLoading == true ?
        <ToolLoader/>
        :
        userData?.tokens! > 0 || stripeRole == 'premium'  ?
          <div>
            <VideoComponent/>
            <VideoTips/>
          </div>
        :
          <PricingDisplay/>
        }
        <div className="mt-24"/>
        <HomeFAQ/>
      </main>
    </>
  )
}
