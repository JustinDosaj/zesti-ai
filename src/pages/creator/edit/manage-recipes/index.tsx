import { Raleway } from 'next/font/google'
import { useAuth } from '@/pages/api/auth/auth'
import { useRouter } from "next/router"
import { SharedHomeSectionTitle } from '@/components/shared/title'
import React, { useEffect, useState } from 'react'
import GoogleTags from "@/components/tags/conversion"
import Head from "next/head"
import { PromoteKitTag } from "@/components/tags/headertags"
import { Notify } from '@/components/shared/notify'
import { PageLoader } from '@/components/shared/loader'
import Breadcrumbs from '@/components/shared/breadcrumb'
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import { db } from '@/pages/api/firebase/firebase'
import { ManageRecipesList } from '@/components/creator/manage'
import { CreatorAddRecipeModal, CreatorResubmitRecipeModal, DeleteConfirmationModal } from '@/components/shared/modals'

const raleway = Raleway({subsets: ['latin']})

export default function ManageRecipes() {

    useSetBreadcrumbs()

    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [errorData, setErrorData] = useState<any>([]);
    const [ recipes, setRecipes ] = useState<any>([])
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ isResubmitOpen, setIsResubmitOpen ] = useState<boolean>(false)
    const [ isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)  
    const [ url, setUrl ] = useState<string>('')
    const [ recipeId, setRecipeId ] = useState<string>('')


  const fetchStagingData = () => {
    if (user && user.uid) {
      const stagingRef = db.collection('creators').doc(user.uid).collection('errors');
  
      // Listen for real-time updates
      return stagingRef.onSnapshot((snapshot) => {
        const stagingDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setErrorData(stagingDocs);
      }, (error) => {
        console.error("Error fetching staging data: ", error);
      });
    }
  };

  const fetchRecipes = () => {
    if (user && user.uid) {
      const recipeRef = db.collection(`creators/${user.uid}/recipes`);
  
      // Listen for real-time updates
      return recipeRef.onSnapshot((snapshot) => {
        const updatedRecipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecipes(updatedRecipes);
      }, (error) => {
        console.error("Error fetching recipes: ", error);
      });
    }
  };


  useEffect(() => {
    let unsubscribeStaging: (() => void) | undefined;
    let unsubscribeRecipes: (() => void) | undefined;
  
    if (user === null && !isLoading) {
      router.replace('/');
      Notify("Please login to continue");
    } else {
      unsubscribeStaging = fetchStagingData();
      unsubscribeRecipes = fetchRecipes();
    }
  
    // Cleanup function
    return () => {
      unsubscribeStaging?.();
      unsubscribeRecipes?.();
    };
  }, [user?.uid, isLoading]);

    console.log(errorData)

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
      <ManageRecipesList errorData={errorData} publicData={recipes} setIsOpen={setIsOpen} setIsResubmitOpen={setIsResubmitOpen} setUrl={setUrl} setRecipeId={setRecipeId} setIsDeleteOpen={setIsDeleteOpen}/>
      <CreatorAddRecipeModal isOpen={isOpen} setIsOpen={setIsOpen}/>
      <CreatorResubmitRecipeModal isResubmitOpen={isResubmitOpen} setIsResubmitOpen={setIsResubmitOpen} url={url} setUrl={setUrl} recipe_id={recipeId}/>
      <DeleteConfirmationModal isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} recipe_id={recipeId}/>
    </main>
    </>
    )
}