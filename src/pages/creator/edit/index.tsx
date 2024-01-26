
import { SharedHomeSectionTitle } from "@/components/shared/title";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from "@/pages/api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { fetchTikTokVideoList } from "@/pages/api/handler/tiktok";
import { CreatorAddRecipeModal } from "@/components/shared/modals";
import { handleCreatorTikTokURLSubmit } from "@/pages/api/handler/submit";
import { Raleway } from "next/font/google";
import { CreatorPageComponent } from "@/components/creator/profile";
import { RecentTikTokVideos } from "@/components/creator/profile";
import Breadcrumbs from "@/components/shared/breadcrumb";
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import { PageLoader } from "@/components/shared/loader";

const raleway = Raleway({subsets: ['latin']})

export default function Page() {

  useSetBreadcrumbs()

  const router = useRouter()
  const { isLoading, user, userData, creatorData } = useAuth();

  const [ videos, setVideos ] = useState<any>([])
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ url, setUrl ] = useState<string>('')
  const [ rawText, setRawText ] = useState<string>('')
  const [ videoObject, setVideoObject ] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
      if (userData?.tiktokAccessToken && user && !isLoading && loading == true) {
        if ((user == null || !userData.isCreator) && !isLoading) {
          router.replace('/');
        }
        if(!userData.activeToken && !isLoading) {
          router.push('/nav/profile')
        }
        
        fetchTikTokVideoList(userData?.tiktokAccessToken).then(userVideos => { setVideos(userVideos)})
        setLoading(false)
        
      } else {
        router.push('/creator/edit')
      }
  }, [userData?.tiktokAccessToken]);

  const addRecipe = async () => {
    await handleCreatorTikTokURLSubmit({url, rawText, creatorData})
  }

  if (loading == true) return <PageLoader/>
  
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
            <Breadcrumbs/>
            <SharedHomeSectionTitle titleBlack="Creator Settings" desc="Add more information to your creator pages"/>
            <CreatorPageComponent creatorData={creatorData}/>
            <CreatorAddRecipeModal isOpen={isOpen} setIsOpen={setIsOpen} addRecipe={addRecipe} setRawText={setRawText} rawText={rawText} videoObject={videoObject}/>
        </main>
    </>
  )
}
