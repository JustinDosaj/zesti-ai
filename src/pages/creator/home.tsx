import { CreatorDashboard } from "@/components/creator/dashboard/dashboard";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from "../api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { CreatorTools } from "@/components/creator/home";
import { CreatorDashboardTitle } from "@/components/creator/dashboard";
import { useEffect, useState } from "react";
import { getCreatorData } from "../api/firebase/functions";
import { useRouter } from "next/router";

export default function Home() {
  
  const { isLoading, user, tikTokAccessToken } = useAuth();
  const [ displayName, setDisplayName ] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    try { 
      const fetchUserData = async () => {

        if (!tikTokAccessToken && !isLoading) {
          router.push('/creator/settings')
        } else {
          const creatorData = await getCreatorData(user?.uid)
          setDisplayName(creatorData?.display_name ? creatorData?.display_name : '')
        }
      };
      fetchUserData();

    } catch (err) {
      console.log(err)
    }
  },[isLoading])




  return (
    <>
        <Head>
            <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
            <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
            <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
            <GoogleTags/>
            <PromoteKitTag/>
        </Head>
        <CreatorDashboard>
          <CreatorDashboardTitle title={`Creator Dashboard`} desc={"Welcome to Zesti for Creators. Begin adding recipes to your page to let your users easily replicate them at home!"}/>
          <CreatorTools tiktokDisplayName={displayName}/>
        </CreatorDashboard>
    </>
  )
}
