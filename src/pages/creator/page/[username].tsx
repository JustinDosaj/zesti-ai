import { Raleway } from 'next/font/google'
import { CreatorPageTitle, CreatorSearch, CreatorRecipeTitle } from '@/components/creator/profile';
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { RecipeList } from '@/components/dashboard/recipelist';
import { useState, useEffect } from "react";
import { PageLoader } from "@/components/shared/loader";
import Head from 'next/head';
import { db } from '../../api/firebase/firebase';
import { getUserData } from '../../api/firebase/functions';
import GoogleTags from '@/components/tags/conversion';
import { RewardfulTag } from '@/components/tags/headertags';
import AdSenseDisplay from '@/components/tags/adsense';
import { SharedPageTitle } from '@/components/shared/title';

const raleway = Raleway({subsets: ['latin']})

export default function Dashboard() {

    const { user, isLoading, stripeRole } = useAuth();
    const [isLoadingRecipes, setIsLoadingRecipes] = useState<boolean>(true);
    const [ waitForPage, setWaitForPage ] = useState<boolean>(true)
    const [ tokens, setTokens ] = useState<number>(0)
    const [recipes, setRecipes] = useState<any[]>([]);
    const router = useRouter();


    useEffect( () => {
    
        if (user !== null && isLoading == false) {

        //  CHANGE WHERE WE ARE GETTING THE RECIPE COLLECTION //
        const unsubscribe = db.collection(`users/${user.uid}/recipes`)
          .onSnapshot((snapshot) => {
            const updatedRecipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRecipes(updatedRecipes);
            setIsLoadingRecipes(false);
          });
          const fetchUserData = async () => {
              const userData = await getUserData(user.uid);
              setTokens(userData?.tokens);
              setWaitForPage(false)
          };
          fetchUserData();
      }
    }, [user])

  if (isLoading || waitForPage == true) return <PageLoader/>
    
  return (
    <>
    <Head>
      <title>Zesti | Creator Page</title> {/* Add Dynamic Title to display creator username for improved SEO*/}
      <GoogleTags/>
      <RewardfulTag/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <SharedPageTitle title="Creator" desc="View & search all the recipes made by <username>"/>
        <div className="mt-8 lg:mt-0" />
        <CreatorSearch/> {/* CHANGE THIS SEARCH TO ONLY SEARCH WITHIN THE ACCOUNT OF CURRENT USER*/}
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        <CreatorRecipeTitle/>
        {isLoadingRecipes ? <PageLoader/> : <RecipeList data={recipes} maxDisplayCount={10}/>}
        {stripeRole !== 'premium' && recipes.length > 0 ? 
        <div className="flex justify-center items-center py-16">
          <div className="w-full min-w-[300px] max-w-[320px] lg:max-w-full lg:min-w-[1240px] text-center">
            <AdSenseDisplay adSlot="5606229053" adFormat="rectangle, horizontal" widthRes="true"/>
          </div>
        </div>
        :
        <div className="mb-28"/>
        }
    </main>
    </>
  )
}