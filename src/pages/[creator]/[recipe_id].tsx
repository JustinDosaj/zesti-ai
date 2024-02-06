import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth";
import { PageLoader } from "@/components/shared/loader";
import { PromoteKitTag } from "@/components/tags/headertags";
import { CreatorRecipe, EditCreatorRecipe } from "@/components/creator/recipe";
import React, { useState } from 'react'
import { LoginModal } from "@/components/shared/modals";
import GoogleTags from "@/components/tags/conversion";
import Head from "next/head";
import { getCreatorByDisplayName } from "../api/firebase/functions";
import Breadcrumbs from "@/components/shared/breadcrumb";
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import getCreatorRecipe from "@/hooks/creator/useCreatorRecipe";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const creatorName = context.query.creator as string
    const id = context.query?.recipe_id as string

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

    const { user } = useAuth();
    const [ loginPrompt, setLoginPrompt ] = useState<boolean>(false)
    const [ isEditMode, setEditMode ] = useState<boolean>(false)
    const { creatorRecipe, isLoadingCreatorRecipe } = getCreatorRecipe(owner_uid, id)

    if(isLoadingCreatorRecipe) return <PageLoader/>

    return(
    <>
    <Head>
      <title>{creatorRecipe.name}</title>
      <meta name="title" content={creatorRecipe.name}/>
      <meta name="description" content={'Make ' + creatorRecipe.name + 'from a recipe by ' + creatorRecipe.owner_display_name}/>
      <link rel="preload" href="/images/zesti-logos/Zesti-Premium-2.png" as="image"></link>
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center p-6 bg-background w-screen ${raleway.className}`}>
        <Breadcrumbs/>
        {isEditMode == false || !user || user?.uid !== owner_uid ? 
        <CreatorRecipe recipe={creatorRecipe} setLoginPrompt={setLoginPrompt} owner_id={owner_uid} setEditMode={setEditMode}/>
        :
        <EditCreatorRecipe recipe={creatorRecipe} setLoginPrompt={setLoginPrompt} owner_id={owner_uid} setEditMode={setEditMode}/>
        }
        <LoginModal loginPrompt={loginPrompt} setLoginPrompt={setLoginPrompt} title={"Create Account"} message={"You must create an account to save recipes"}/>
    </main>
    </>
    )
}

export default Recipe