import { AddRecipeCreatorComponent } from "@/components/dashboard/creator";
import { CreatorDashboard } from "@/components/elements/creatordash";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useEffect } from "react";
import { useAuth } from "../api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { fetchTikTokUserInfo, fetchTikTokVideoList } from "../api/handler/tiktok";
import { Raleway } from 'next/font/google'
import { PageLoader } from "@/components/shared/loader";
const raleway = Raleway({subsets: ['latin']})


export default function AddRecipe() {
  
  const { isLoading, user, tikTokAccessToken } = useAuth();

  useEffect(() => {
    if (tikTokAccessToken && user && !isLoading) {
        fetchTikTokUserInfo(tikTokAccessToken)
            .then(userInfo => {
                // Do something with the user info
                console.log("userInfo", userInfo);
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
        fetchTikTokVideoList(tikTokAccessToken)
            .then(userVideos => {
              // Do something
              console.log("userVideos", userVideos)
            })
    }
}, [tikTokAccessToken]);

  if (isLoading) return <PageLoader/>

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
          <AddRecipeCreatorComponent/>
        </CreatorDashboard>
        </main>
    </>
  )
}
