import { Raleway } from 'next/font/google'
import Head from "next/head"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../api/auth/auth'
import { db } from '../api/firebase/firebase'
import { PageLoader } from '@/components/shared/loader'
import { UserSavedRecipeList } from '@/components/dashboard/recipelist'
import GoogleTags from '@/components/tags/conversion'
import { PromoteKitTag } from '@/components/tags/headertags'
import AdSenseDisplay from '@/components/tags/adsense'
import { SharedViewAllTitle } from '@/components/shared/title'

const raleway = Raleway({subsets: ['latin']})

export default function RecipeBook() {

    const { user, isLoading, stripeRole } = useAuth();
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
    const [recipes, setRecipes] = useState<any[]>([]);
    const router = useRouter();


    useEffect(() => {
      const fetchRecipes = async () => {
        if (user) {
          const recipeSnapshot = await db.collection(`users/${user.uid}/recipes`).get();
          const updatedRecipes = recipeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setRecipes(updatedRecipes);
          setIsLoadingRecipes(false);
        }
      };

      if (user == null && !isLoading) {
        router.replace('/');
      } else if (user !== null && !isLoading) {
        fetchRecipes();
      }
    }, [user, isLoading, router]);

    return(
    <>
        <Head>
            <title>Zesti | Recipe Book</title>
            <meta name="robots" content="noindex"/>
            <GoogleTags/>
            <PromoteKitTag/>
        </Head>  
        <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
            <SharedViewAllTitle title="Saved Recipes" desc="View all the recipes you have saved with Zesti" href={'/dashboard'}/>
            {isLoadingRecipes ? <PageLoader/> : <UserSavedRecipeList recipes={recipes} maxDisplayCount={5}/>}
            {stripeRole !== 'premium' && recipes.length > 0 ? 
            <div className="flex justify-center items-center py-16">
              <div className="w-full min-w-[300px] max-w-[320px] lg:max-w-full lg:min-w-[1240px] text-center">
                <AdSenseDisplay adSlot="4616527110" adFormat="rectangle, horizontal" widthRes="true"/>
              </div>
            </div>
            :
            <div className="mb-28"/>
            }
        </main>
    </>
    )
}