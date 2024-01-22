
import { SharedHomeSectionTitle } from "@/components/shared/title";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from "../api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { fetchTikTokVideoList } from "../api/handler/tiktok";
import { CreatorAddRecipeModal } from "@/components/shared/modals";
import { handleCreatorTikTokURLSubmit } from "../api/handler/submit";
import { Raleway } from "next/font/google";
import { CreatorPageComponent } from "@/components/creator/profile";
import { RecentTikTokVideos } from "@/components/creator/profile";

const raleway = Raleway({subsets: ['latin']})

export default function Settings() {

  const router = useRouter()
  const { isLoading, user, userData, creatorData } = useAuth();

  const [ videos, setVideos ] = useState<any>([])
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ url, setUrl ] = useState<string>('')
  const [ rawText, setRawText ] = useState<string>('')
  const [ videoObject, setVideoObject ] = useState<any>()

  useEffect(() => {
      if (userData?.tiktokAccessToken && user && !isLoading) {

        fetchTikTokVideoList(userData?.tiktokAccessToken).then(userVideos => { setVideos(userVideos)})
        if (user == null && !isLoading) {
          router.replace('/');
        }
      } else {
        router.push('/nav/settings')
      }
  }, [userData?.tiktokAccessToken]);

  const addRecipe = async () => {
    await handleCreatorTikTokURLSubmit({url, user, rawText, videoObject, creatorData})
  }
  
  return (
    <>
        <Head>
            <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
            <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
            <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
            <GoogleTags/>
            <PromoteKitTag/>
        </Head>
        <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
            <div className="mt-36"/>
            <SharedHomeSectionTitle titleBlack="Creator Settings" desc="Add more information to your creator pages"/>
            <div className="grid grid-cols-1 lg:grid-cols-2 pb-36 mt-6 gap-x-3">
                <CreatorPageComponent creatorData={creatorData}/>
                <RecentTikTokVideos videoList={videos?.data} creatorData={creatorData} setIsOpen={setIsOpen} setUrl={setUrl} setVideoObject={setVideoObject}/>
            </div>
            <CreatorAddRecipeModal isOpen={isOpen} setIsOpen={setIsOpen} addRecipe={addRecipe} setRawText={setRawText} rawText={rawText} videoObject={videoObject}/>
        </main>
    </>
  )
}
