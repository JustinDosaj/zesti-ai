import { RecentTikTokVideos } from "@/components/creator/add";
import { CreatorDashboard } from "@/components/creator/dashboard/dashboard";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useEffect, useState } from "react";
import { useAuth } from "../api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { fetchTikTokVideoList } from "../api/handler/tiktok";
import { Raleway } from 'next/font/google'
import { getCreatorData } from "../api/firebase/functions";
import { useRouter } from "next/router";
import { CreatorAddRecipeModal } from "@/components/shared/modals";
import { handleCreatorTikTokURLSubmit } from "../api/handler/submit";
const raleway = Raleway({subsets: ['latin']})


export default function AddRecipe() {
  
  const { isLoading, user, tikTokAccessToken, isCreator } = useAuth();
  const router = useRouter()
  const [ creatorData, setCreatorData ] = useState<any>()
  const [ videos, setVideos ] = useState<any>([])
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ url, setUrl ] = useState<string>('')
  const [ rawText, setRawText ] = useState<string>('')
  const [ videoObject, setVideoObject ] = useState<any>()

  useEffect(() => {
      if (tikTokAccessToken && user && !isLoading) {

        fetchTikTokVideoList(tikTokAccessToken).then(userVideos => { setVideos(userVideos)})
        
        const fetchUserData = async () => {

            if (user && isCreator == true) {
              const creatorData = await getCreatorData(user.uid)
              setCreatorData(creatorData)
            }
          };

          if (user == null && !isLoading) {
            router.replace('/');
          } else if (user !== null && !isLoading) {
            fetchUserData();
          }
      } else {
        router.push('/creator/settings')
      }
  }, [tikTokAccessToken]);

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
        <main className={`${raleway.className}`}>
        <CreatorDashboard>
          <div className="grid grid-cols-1 gap-4 pl-4">
            <RecentTikTokVideos videoList={videos?.data} displayName={creatorData?.display_name} setIsOpen={setIsOpen} setUrl={setUrl} setVideoObject={setVideoObject}/>
          </div>
          <CreatorAddRecipeModal isOpen={isOpen} setIsOpen={setIsOpen} addRecipe={addRecipe} setRawText={setRawText} rawText={rawText} videoObject={videoObject}/>
        </CreatorDashboard>
        </main>
    </>
  )
}
