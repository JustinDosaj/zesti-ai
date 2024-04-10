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
import { TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { deleteCreatorPublicRecipe } from '@/pages/api/firebase/functions'
import useRequireAuth from '@/hooks/user/useRequireAuth'
import useCreatorRecipeList from '@/hooks/creator/useCreatorRecipeList'
import Breadcrumbs from '@/components/shared/breadcrumb'
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import { useRouter } from 'next/router'

const raleway = Raleway({subsets: ['latin']})

export default function ManageRecipes() {

    useSetBreadcrumbs()
    useRequireAuth()

    const { user, isLoading, userData } = useAuth();
    const { loadingCreatorRecipes, creatorRecipeList } = useCreatorRecipeList(user?.uid)
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ isCreatorModalOpen, setIsCreatorModalOpen] = useState<boolean>(false)
    const [ isResubmitOpen, setIsResubmitOpen ] = useState<boolean>(false)
    const [ isAuthModalOpen, setIsAuthModalOpen ] = useState<boolean>(false)
    const [ url, setUrl ] = useState<string>('')
    const [ recipeId, setRecipeId ] = useState<string>('')
    const router = useRouter()

    if(isLoading && loadingCreatorRecipes) return <PageLoader/>

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
      <SharedHomeSectionTitle titleBlack="Manage Recipe Collection" desc="Add a new recipe to your creator page"/>
      <ManageRecipesList userData={userData} publicData={creatorRecipeList} setIsCreatorModalOpen={setIsCreatorModalOpen} setIsAuthModalOpen={setIsAuthModalOpen} setRecipeId={setRecipeId} setIsOpen={setIsOpen}/>
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
      <ResponseModal
        title={"Must Authorize Tiktok"}
        text={"As a precaution, we require you to authorize your Tiktok account before transcribing recipes to ensure you are the owner of the account. Please visit your account settings to complete this process"}
        icon={ExclamationTriangleIcon}
        iconColor={"yellow"}
        modalFunction={() => {router.push('/account')}}
        isOpen={isAuthModalOpen}
        setIsOpen={setIsAuthModalOpen}
        displayAd={false}
        role={null}
        buttonName={"Account Settings"}
      />
    </main>
    </>
    )
}