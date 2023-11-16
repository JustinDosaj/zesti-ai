import { Raleway } from 'next/font/google'
import { RecipePageTitle, Tools, Usage } from '@/components/dash-sections/dash';
import { AddRecipeLink } from '@/components/dash-sections/addRecipeLink';
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { GridDisplay } from '@/components/dash-sections/grid-display';
import { useState } from "react";
import { PageLoader } from "@/components/shared/loader";
import Head from 'next/head';
import { db } from '../api/firebase/firebase';

const raleway = Raleway({subsets: ['latin']})

export default function Dashboard() {

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
    
  return (
    <>
    <Head>
      <title>Zesti | Your Recipes</title>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>

        <RecipePageTitle/>
        <div className="border-t border-gray-200 sm:mt-0 mb-12 mr-12 ml-12 mt-12" style={{ width: '35%' }} />
        <Usage data={recipes}/>
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        <Tools/>
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        {isLoadingRecipes ? <PageLoader/> : <GridDisplay data={recipes}/>}
 
    </main>
    </>
  )
}