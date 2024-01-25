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
import { StagingList } from '@/components/creator/recipe/staging'

const raleway = Raleway({subsets: ['latin']})

export default function AddRecipe() {

    useSetBreadcrumbs()

    const { user, isLoading, userData, creatorData } = useAuth();
    const router = useRouter();
    const [errorData, setErrorData] = useState<any>([]);
    const [ recipes, setRecipes ] = useState<any>([])

    const fetchStagingData = async () => {
      if (user && user.uid) {
          try {
              const stagingRef = db.collection('creators').doc(user.uid).collection('errors');
              const snapshot = await stagingRef.get();
              const stagingDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setErrorData(stagingDocs); // Update state with the fetched data
          } catch (error) {
              console.error("Error fetching staging data: ", error);
          }
      }
  };

  const fetchRecipes = async () => {
    const recipeSnapshot = await db.collection(`creators/${user?.uid}/recipes`).get();
    const updatedRecipes = recipeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setRecipes(updatedRecipes);
};


    useEffect(() => {
      if (user == null && !isLoading) {
        router.replace('/')
        Notify("Please login to continue")
      } else {
        fetchStagingData()
        fetchRecipes()
      } 
    }, [user?.uid, isLoading]);

    if(isLoading) return <PageLoader/>

    return(
    <>
    <Head>
      <title>Zesti | Your Profile</title>
      <GoogleTags/>
      <PromoteKitTag/>
      <meta name="robots" content="noindex" />
    </Head>  
    <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
      <Breadcrumbs/>
      <SharedHomeSectionTitle titleBlack="Manage Recipes" desc="Add a new recipe to your creator page"/>
      <StagingList errorData={errorData} publicData={recipes}/>
    </main>
    </>
    )
}