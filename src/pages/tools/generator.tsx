import { Raleway } from 'next/font/google'
import { ChatHero, ChatTips } from '@/components/hub/chat';
import Head from 'next/head';
import { ChatComponent } from '@/components/hub/chat';
import { HomeFAQ } from '@/components/home-sections/home';
import { useAuth } from '../api/auth/auth';
import React, { useState, useEffect } from 'react';
import { getUserData } from '../api/firebase/functions';
import { PricingDisplay } from '@/components/pricing-sections/pricing';
import GoogleTags from '@/components/tags/conversion';
import { PageLoader } from '@/components/shared/loader';
import { RewardfulTag } from '@/components/tags/headertags';

const raleway = Raleway({subsets: ['latin']})

export default function Generator() {
  // Comment
  const { stripeRole, user, isLoading } = useAuth()
  const [ waitForPage, setWaitForPage ] = useState<boolean>(true)
  const [ tokens, setTokens ] = useState<number>(0)

  useEffect( () => { 

    const fetchUserData = async () => {
      if(user){
        const userData = await getUserData(user?.uid);
        setTokens(userData?.tokens);
        setWaitForPage(false)
      }
    };
    
    fetchUserData();
  
  }, [user])

  if (waitForPage == true) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Zesti AI | Creative Recipe Generator | Try for Free</title>
        <meta name="title" content="Zesti AI | Creative Recipe Generator | Try for Free"/>
        <meta name="description" content="Use AI to create recipes for free, and to help you through the process of making the dish you have chosen!"/>
        <GoogleTags/>
        <RewardfulTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <ChatHero role={stripeRole} tokens={tokens}/>
        {tokens > 0 || stripeRole == 'premium' ?
        <div> 
          <ChatComponent role={stripeRole}/>
          <ChatTips/>
        </div>
        :
        <PricingDisplay/>
        }
        <HomeFAQ/>
      </main>
    </>
  )
}
