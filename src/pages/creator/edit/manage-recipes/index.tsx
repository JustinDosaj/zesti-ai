import { Raleway } from 'next/font/google'
import { useAuth } from '@/pages/api/auth/auth'
import { SharedHomeSectionTitle } from '@/components/shared/title'
import React, { useState } from 'react'
import GoogleTags from "@/components/tags/conversion"
import Head from "next/head"
import { PromoteKitTag } from "@/components/tags/headertags"
import { PageLoader } from '@/components/shared/loader'
import { ManageRecipesList } from '@/components/ui/creator/manage'
import { CreatorAddRecipeModal, CreatorResubmitRecipeModal, ResponseModal } from '@/components/shared/modals'
import { TrashIcon } from '@heroicons/react/20/solid'
import { deleteCreatorPublicRecipe } from '@/pages/api/firebase/functions'
import useRequireAuth from '@/hooks/user/useRequireAuth'
import useCreatorRecipeList from '@/hooks/creator/useCreatorRecipeList'
import useErrorRecipeList from '@/hooks/creator/useErrorRecipeList'
import Breadcrumbs from '@/components/shared/breadcrumb'
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";

const raleway = Raleway({subsets: ['latin']})

export default function ManageRecipes() {

    useSetBreadcrumbs()

    const { user, isLoading } = useAuth();
    const { creatorRecipeList } = useCreatorRecipeList(user?.uid)
    const { errorRecipeList } = useErrorRecipeList(user?.uid)
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ isCreatorModalOpen, setIsCreatorModalOpen] = useState<boolean>(false)
    const [ isResubmitOpen, setIsResubmitOpen ] = useState<boolean>(false)
    const [ url, setUrl ] = useState<string>('')
    const [ recipeId, setRecipeId ] = useState<string>('')
    const { require } = useRequireAuth(user, isLoading)

    if(isLoading) return <PageLoader/>

    return(
    <>
    <Head>
      <meta name="robots" content="noindex" />
      <title>Zesti | Your Profile</title>
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
      <Breadcrumbs/>
      <SharedHomeSectionTitle titleBlack="Manage Recipes" desc="Add a new recipe to your creator page"/>
      <ManageRecipesList errorData={errorRecipeList} publicData={creatorRecipeList} setIsCreatorModalOpen={setIsCreatorModalOpen} setIsResubmitOpen={setIsResubmitOpen} setUrl={setUrl} setRecipeId={setRecipeId} setIsOpen={setIsOpen}/>
      <CreatorAddRecipeModal isCreatorModalOpen={isCreatorModalOpen} setIsCreatorModalOpen={setIsCreatorModalOpen}/>
      <CreatorResubmitRecipeModal isResubmitOpen={isResubmitOpen} setIsResubmitOpen={setIsResubmitOpen} url={url} setUrl={setUrl} recipe_id={recipeId}/>
      <ResponseModal
        title={"Delete Recipe?"}
        text={"Are you sure you want to permanently delete this recipe?"}
        icon={TrashIcon}
        iconColor={"red"}
        modalFunction={async () => await deleteCreatorPublicRecipe(user?.uid, recipeId)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        displayAd={false}
        role={null}
        buttonName={"Delete Recipe"}
      />
    </main>
    </>
    )
}