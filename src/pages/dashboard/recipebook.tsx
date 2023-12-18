import { Raleway } from 'next/font/google'
import { RecipeBookTitle } from '@/components/dash-sections/dash'
import Head from "next/head"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../api/auth/auth'
import { db } from '../api/firebase/firebase'
import { PageLoader } from '@/components/shared/loader'
import { RecipeList } from '@/components/dash-sections/recipelist'
import GoogleTags from '@/components/google/conversion'
import { RewardfulTag } from '@/components/tags/headertags'
import AdSenseDisplay from '@/components/google/adsense'

const raleway = Raleway({subsets: ['latin']})

export default function RecipeBook() {

    const { user, isLoading, stripeRole } = useAuth();
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
    const [recipes, setRecipes] = useState<any[]>([]);
    const router = useRouter();


    useEffect( () => {
      if(user == null && isLoading == false) {
        router.replace('/')
      } else if (user !== null && isLoading == false) {
        const unsubscribe = db.collection(`users/${user.uid}/recipes`)
          .onSnapshot((snapshot) => {
            const updatedRecipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRecipes(updatedRecipes);
            setIsLoadingRecipes(false);
          });
      }
    }, [user])

    return(
    <>
        <Head>
            <title>Zesti | Recipe Book</title>
            <meta name="robots" content="noindex"/>
            <GoogleTags/>
            <RewardfulTag/>
        </Head>  
        <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
            <RecipeBookTitle/>
            {isLoadingRecipes ? <PageLoader/> : <RecipeList data={recipes}/>}
            {stripeRole !== 'premium' && recipes.length > 0 ? 
            <div className="flex justify-center items-center py-12">
              <div className="w-full min-w-[300px] max-w-[320px] lg:max-w-full lg:min-w-[1240px] text-center">
                <AdSenseDisplay adSlot="9326575118" adFormat="rectangle, horizontal" widthRes="true"/>
              </div>
            </div>
            :
            <div className="mb-28"/>
            }
        </main>
    </>
    )
}