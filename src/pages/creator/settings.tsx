import { CreatorSettingsComponent } from "@/components/dashboard/creator";
import { CreatorDashboard } from "@/components/elements/creatordash";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from "../api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'
import { PageLoader } from "@/components/shared/loader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { getUserData, getCreatorData } from "../api/firebase/functions";
const raleway = Raleway({subsets: ['latin']})


export default function Settings() {
  
  const { isLoading, user, isCreator } = useAuth();
  const [ userData, setUserData] = useState<any>()
  const [ creatorData, setCreatorData ] = useState<any>()
  const router = useRouter()

  useEffect(() => {
      const fetchUserData = async () => {
      if (user) {
          const userData = await getUserData(user.uid)
          setUserData(userData)

          if (isCreator == true) {
            const creatorData = await getCreatorData(user.uid)
            setCreatorData(creatorData)
        }
      }
      };

      if (user == null && !isLoading) {
        router.replace('/');
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
            <CreatorSettingsComponent userData={userData} creatorData={creatorData}/>
          </CreatorDashboard>
        </main>
    </>
  )
}
