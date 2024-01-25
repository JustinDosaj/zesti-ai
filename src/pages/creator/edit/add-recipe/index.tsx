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

const raleway = Raleway({subsets: ['latin']})

export default function Profile() {

    useSetBreadcrumbs()

    const { user, isLoading, userData, creatorData } = useAuth();
    const router = useRouter();
    const [stagingData, setStagingData] = useState<any>([]);

    const onClick = async (recipe: any) => {

      try {
          // Define the path to the new document
          const recipeRef = db.collection('creators').doc(user?.uid).collection('recipes').doc(recipe.id);
          await recipeRef.set(recipe);

          const stagingRef = db.collection('creators').doc(user?.uid).collection('staging').doc(recipe.id);
          await stagingRef.delete();

          Notify("Recipe added successfully");
      } catch (error) {
          console.error("Error adding recipe to Firestore:", error);
          Notify("Error adding recipe");
      }
    }

    const fetchStagingData = async () => {
      if (user && user.uid) {
          try {
              const stagingRef = db.collection('creators').doc(user.uid).collection('staging');
              const snapshot = await stagingRef.get();
              const stagingDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setStagingData(stagingDocs); // Update state with the fetched data
          } catch (error) {
              console.error("Error fetching staging data: ", error);
          }
      }
  };

    useEffect(() => {
      if (user == null && !isLoading) {
        router.replace('/')
        Notify("Please login to continue")
      } else {
        fetchStagingData()
      } 
    }, [user?.uid, isLoading]);

    console.log("Staging Data: ", stagingData)

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
      <SharedHomeSectionTitle titleBlack="Add Recipe" desc="Add a new recipe to your creator page"/>
      <div className="h-96 w-96 border rounded-3xl mt-4">
        {stagingData.map((item: any) => (
          <div key={item.name}>
            <button onClick={() => onClick(item)}>{item.name}</button>
          </div>
        ))

        }
      </div>
    </main>
    </>
    )
}