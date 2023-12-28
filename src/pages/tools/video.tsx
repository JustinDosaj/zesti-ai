import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { VideoComponent, VideoTips, ToolHero } from '@/components/tools/general';
import { useAuth } from '../api/auth/auth';
import { PricingDisplay } from '@/components/pricing';
import { PageLoader, ToolLoader } from '@/components/shared/loader';
import React, { useState, useEffect } from 'react';
import { db } from '../api/firebase/firebase';
import { getUserData } from '../api/firebase/functions';
import GoogleTags from '@/components/tags/conversion';
import { RewardfulTag } from '@/components/tags/headertags';
import { HomeFAQ } from '@/components/home';

const raleway = Raleway({subsets: ['latin']})

export default function Video() {

  const { user, stripeRole, isLoading } = useAuth()
  const [ tokens, setTokens ] = useState<number>(0)
  const [ waitForPage, setWaitForPage ] = useState<boolean>(true)

  useEffect( () => { 

    const fetchUserData = async () => {
        const userData = await getUserData(user?.uid);
        setTokens(userData?.tokens);
        setWaitForPage(false)
    };
    
    fetchUserData();
  
  }, [user])

  if(waitForPage == true) return (<PageLoader/>)

  return (
    <>
      <Head>
        <title>Zesti | Instantly Save YouTube & Tiktok Recipes as Text</title>
        <meta name="title" content="Zesti | Instantly Save YouTube & Tiktok Recipes as Text"/>
        <GoogleTags/>
        <RewardfulTag/>
        <meta name="description" content="Say good by to pausing and rewinding, Zesti AI Video to Text Recipe creates an easy-to-follow ingredient and instruction list"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <ToolHero role={stripeRole} tokens={tokens} titleStart="Save Recipes From" titleEnd='TikTok & YouTube'/>
        { isLoading == true ?
        <ToolLoader/>
        :
        tokens > 0 || stripeRole == 'premium'  ?
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
