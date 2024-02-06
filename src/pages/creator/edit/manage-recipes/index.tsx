import { Raleway } from 'next/font/google'
import { useAuth } from '@/pages/api/auth/auth'
import { SharedHomeSectionTitle } from '@/components/shared/title'
import React, { useState } from 'react'
import GoogleTags from "@/components/tags/conversion"
import Head from "next/head"
import { PromoteKitTag } from "@/components/tags/headertags"
import { PageLoader } from '@/components/shared/loader'
import Breadcrumbs from '@/components/shared/breadcrumb'
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import { ManageRecipesList } from '@/components/creator/manage'
import { CreatorAddRecipeModal, CreatorResubmitRecipeModal, DeleteConfirmationModal } from '@/components/shared/modals'
import useCreatorRecipeList from '@/hooks/creator/useCreatorRecipeList'
import useErrorRecipeList from '@/hooks/creator/useErrorRecipeList'
import useCreatorStatus from '@/hooks/creator/useCreatorStatus'


const raleway = Raleway({subsets: ['latin']})

export default function ManageRecipes() {

    useSetBreadcrumbs()

    const { user, isLoading, userData } = useAuth();
    const { creatorRecipeList } = useCreatorRecipeList(user?.uid)
    const { errorRecipeList } = useErrorRecipeList(user?.uid)
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ isResubmitOpen, setIsResubmitOpen ] = useState<boolean>(false)
    const [ isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)  
    const [ url, setUrl ] = useState<string>('')
    const [ recipeId, setRecipeId ] = useState<string>('')
    const { creatorStage } = useCreatorStatus(userData, isLoading)

    if(isLoading) return <PageLoader/>

    return(
    <>
    <Head>
      <title>Zesti | Your Profile</title>
      <GoogleTags/>
      <PromoteKitTag/>
      <meta name="robots" content="noindex" />
    </Head>  
    <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
      <Breadcrumbs/>
      <SharedHomeSectionTitle titleBlack="Manage Recipes" desc="Add a new recipe to your creator page"/>
      <ManageRecipesList errorData={errorRecipeList} publicData={creatorRecipeList} setIsOpen={setIsOpen} setIsResubmitOpen={setIsResubmitOpen} setUrl={setUrl} setRecipeId={setRecipeId} setIsDeleteOpen={setIsDeleteOpen}/>
      <CreatorAddRecipeModal isOpen={isOpen} setIsOpen={setIsOpen}/>
      <CreatorResubmitRecipeModal isResubmitOpen={isResubmitOpen} setIsResubmitOpen={setIsResubmitOpen} url={url} setUrl={setUrl} recipe_id={recipeId}/>
      <DeleteConfirmationModal isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} recipe_id={recipeId}/>
    </main>
    </>
    )
}