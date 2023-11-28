import { Raleway } from 'next/font/google'
import { DashboardRecipeStackList, RecipeBookTitle } from '@/components/dash-sections/grid-display'
import Head from "next/head"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../api/auth/auth'
import { db } from '../api/firebase/firebase'
import { PageLoader } from '@/components/shared/loader'

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
        </Head>  
        <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
            <RecipeBookTitle/>
            {isLoadingRecipes ? <PageLoader/> : <DashboardRecipeStackList data={recipes}/>}
        </main>
    </>
    )
}