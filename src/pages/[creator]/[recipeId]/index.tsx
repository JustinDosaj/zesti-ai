import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth";
import { PageLoader } from "@/components/shared/loader";
import { PromoteKitTag } from "@/components/tags/headertags";
import { CreatorRecipe } from "@/components/ui/creator/recipe";
import React, { useState } from 'react'
import GoogleTags from "@/components/tags/conversion";
import Head from "next/head";
import { getCreatorByDisplayName } from "@/pages/api/firebase/functions";
import Breadcrumbs from "@/components/shared/breadcrumb";
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import useCreatorRecipe from "@/hooks/creator/useCreatorRecipe";
import { Chatbox } from "@/components/chat/chatbox";
import { ResponseModal } from "@/components/shared/modals";
import { BookmarkIcon } from "@heroicons/react/20/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import AdSenseDisplay from "@/components/tags/adsense";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const creatorName = context.query.creator as string
    const id = context.query?.recipeId as string

    let owner_uid = '';

    const querySnapshot = await getCreatorByDisplayName(creatorName)
      if(!querySnapshot.empty) {
        owner_uid = querySnapshot.docs[0].id
      } else {
        return { notFound: true }
      }

    return {props: {id, owner_uid}}
}

const Recipe: React.FC = ({id, owner_uid}: any) => {

    useSetBreadcrumbs()
    const { stripeRole, userData } = useAuth();
    const [ isEditMode, setEditMode ] = useState<boolean>(false)
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ isSupportOpen, setIsSupportOpen ] = useState<boolean>(false)
    const { creatorRecipe, isLoadingCreatorRecipe } = useCreatorRecipe(owner_uid, id)
    const router = useRouter()

    if(isLoadingCreatorRecipe) return <PageLoader/>


    return(
    <>
        <Head>
        <title>{`Zesti AI | ${creatorRecipe.name}`}</title>
        <meta name="title" content={`Zesti AI | ${creatorRecipe.name}`}/>
        <meta name="description" content={`Make ${creatorRecipe.name}. A recipe by ${creatorRecipe.owner_display_name} from TikTok.`}/>
        <link rel="preload" href="/images/zesti-logos/Zesti-Premium-2.png" as="image"></link>
        <GoogleTags/>
        <PromoteKitTag/>
        </Head>  
        <main className={`flex min-h-screen flex-col items-center p-6 bg-background w-screen pb-36 ${raleway.className}`}>
            <Breadcrumbs/>
            <CreatorRecipe recipe={creatorRecipe} owner_id={owner_uid} isEditMode={isEditMode} setEditMode={setEditMode} setIsOpen={setIsOpen} setIsSupportOpen={setIsSupportOpen}/>
            <Chatbox role={stripeRole} recipe={creatorRecipe}/>
            <ResponseModal
              title={`${creatorRecipe.name} Saved!`}
              text={`You can view the it by visiting your saved recipe page!`}
              icon={BookmarkIcon}
              iconColor={'orange'}
              modalFunction={() => router.push('/my-recipes')}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              displayAd={true}
              isCreator={userData?.account_status === 'creator'}
              role={stripeRole}
              buttonName={"My Recipes"}
            />
            <ResponseModal
              title={`Support ${creatorRecipe?.owner_display_name}`}
              text={`Continue to start a 7-day free trial for Zesti Premium. ${creatorRecipe?.owner_display_name} will receive a portion of the subscription fee automatically once your trial is complete.`}
              icon={SparklesIcon}
              iconColor={'orange'}
              modalFunction={() => window.open(`/about/pricing?via=${creatorRecipe?.owner_affiliate_code}`)}
              isOpen={isSupportOpen}
              setIsOpen={setIsSupportOpen}
              displayAd={false}
              role={stripeRole}
              buttonName={"Start Free Trial"}
            />
            
            {stripeRole !== 'premium' || userData?.account_status !== 'creator' ?
            <div className="flex justify-center items-center lg:pt-16">
                <div className="w-full min-w-[300px] max-w-[320px] lg:max-w-full lg:min-w-[1240px] text-center">
                  <AdSenseDisplay adSlot="9326575118" adFormat="rectangle, horizontal" widthRes="true"/>
                </div>
            </div>
            :
            <div className="mb-28"></div>
            }
        </main>
    </>
    )
}

export default Recipe