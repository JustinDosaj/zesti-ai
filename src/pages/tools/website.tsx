import { Raleway } from 'next/font/google'
import Head from 'next/head';
import { UrlComponent, UrlHero, UrlTips } from '@/components/hub/url';
import { useAuth } from '../api/auth/auth';
import { PricingDisplay } from '@/components/pricing-sections/pricing';
import { FAQ } from '@/components/home-sections/home';
import { PageLoader, ToolLoader } from '@/components/shared/loader';
import React, { useState, useEffect } from 'react';
import { db } from '../api/firebase/firebase';
import { getUserData } from '../api/firebase/functions';
import GoogleTags from '@/components/tags/conversion';
import { RewardfulTag } from '@/components/tags/headertags';
const raleway = Raleway({subsets: ['latin']})

export default function Website() {
  
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

  if(waitForPage == true) return(<PageLoader/>)

  return (
    <>
      <Head>
        <title>Zesti AI | Ad-Free Web Recipe</title>
        <meta name="title" content="Zesti AI | Ad-Free Web Recipe"/>
        <meta name="description" content="Tired of Ads? Avoid searching through endless clutter and simply input the web URL into Zesti for a recipe you want to enjoy!"/>
        <GoogleTags/>
        <RewardfulTag/>
      </Head>
      <main className={` flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <UrlHero role={stripeRole} tokens={tokens}/>
        { isLoading == true ?
        <ToolLoader/>
        : 
        tokens > 0 || stripeRole == 'premium' ?
          <div>
            <UrlComponent/>
            <UrlTips/>
          </div>
          :
          <PricingDisplay/>
        }
        <FAQ/>
      </main>
    </>
  )
}
