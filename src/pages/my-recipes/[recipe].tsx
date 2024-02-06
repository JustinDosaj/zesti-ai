import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import React, { useState} from 'react'
import { useAuth } from "@/pages/api/auth/auth";
import { PageLoader } from "@/components/shared/loader";
import Head from "next/head";
import { Chatbox } from "@/components/chat/chatbox";
import GoogleTags from "@/components/tags/conversion";
import AdSenseDisplay from "@/components/tags/adsense";
import { PromoteKitTag } from "@/components/tags/headertags";
import { UserRecipe, EditUserRecipe } from "@/components/my-recipes/recipe";
import { UpgradeToPremiumModal } from "@/components/shared/modals";
import Breadcrumbs from "@/components/shared/breadcrumb";
import useSetBreadcrumbs from '@/components/shared/setBreadcrumbs';
import getUserRecipe from "@/hooks/user/getUserRecipe";
import useRequireAuth from "@/hooks/user/useRequireAuth";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.recipe as string
    return {props: {id}}
}

const Recipe: React.FC = ({id}: any) => {

    useSetBreadcrumbs()
    const { user, isLoading, stripeRole } = useAuth();
    const { require } = useRequireAuth(user, isLoading)
    const { userRecipe } = getUserRecipe(user?.uid, id)
    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [ premiumPrompt, setPremiumPrompt ] = useState<boolean>(false)

    if(!userRecipe) return <PageLoader/>

    return(
    <>
    <Head>
      <title>{userRecipe.name}</title>
      <meta name="robots" content="noindex" />
      <link rel="preload" href="/images/zesti-logos/Zesti-Premium-2.png" as="image"></link>
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-4 bg-background w-screen ${raleway.className}`}>
      {stripeRole == 'premium' ? <Chatbox/> : <></>}
      <Breadcrumbs/>
      { isEditMode == false || !user ?
        <UserRecipe recipe={userRecipe} setPremiumPrompt={setPremiumPrompt} owner_id={''} setEditMode={setEditMode} role={stripeRole}/>
      :
        <EditUserRecipe recipe={userRecipe} setPremiumPrompt={setPremiumPrompt} setEditMode={setEditMode} role={stripeRole}/>
      }
      {stripeRole !== 'premium' ? 
      <div className="flex justify-center items-center py-12">
        <div className="w-full min-w-[300px] max-w-[320px] lg:max-w-full lg:min-w-[1240px] text-center">
          <AdSenseDisplay adSlot="9326575118" adFormat="rectangle, horizontal" widthRes="true"/>
        </div>
      </div>
      :
      <div className="mb-28"/>
      }
      <UpgradeToPremiumModal premiumPrompt={premiumPrompt} setPremiumPrompt={setPremiumPrompt}/>
    </main>
    </>
    )
}

export default Recipe