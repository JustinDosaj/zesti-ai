import { CreatorPageComponent } from "@/components/creator/profile";
import { CreatorDashboard } from "@/components/creator/dashboard/dashboard";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from "../api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { getCreatorData } from "../api/firebase/functions";
const raleway = Raleway({subsets: ['latin']})


export default function Settings() {
  
  const { isLoading, user, isCreator, tikTokAccessToken } = useAuth();
  const [ creatorData, setCreatorData ] = useState<any>()
  const router = useRouter()

  useEffect(() => {
      const fetchUserData = async () => {
        if (user) {
            if (isCreator == true) {
                const creatorData = await getCreatorData(user.uid)
                setCreatorData(creatorData)
            }
        }
      };

      if (!tikTokAccessToken && !isLoading) {
        router.replace('/creator/settings');
      } else if (user !== null && !isLoading) {
        fetchUserData();
      }
  },[user, isLoading])

  return (
    <>
        <Head>
            <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
            <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
            <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
            <GoogleTags/>
            <PromoteKitTag/>
        </Head>
        <main className={`${raleway.className}`}>
          <CreatorDashboard>
            <CreatorPageComponent creatorData={creatorData}/>
          </CreatorDashboard>
        </main>
    </>
  )
}
