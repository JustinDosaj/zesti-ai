import { Raleway } from 'next/font/google'
import {  Search } from '@/components/dashboard';
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { UserSavedRecipeList } from '@/components/dashboard/recipelist';
import { DashboardRecipeTitle } from '@/components/dashboard';
import { useState, useEffect } from "react";
import { PageLoader } from "@/components/shared/loader";
import Head from 'next/head';
import { db } from '../api/firebase/firebase';
import GoogleTags from '@/components/tags/conversion';
import { PromoteKitTag } from '@/components/tags/headertags';
import AdSenseDisplay from '@/components/tags/adsense';
import { SharedPageTitle } from '@/components/shared/title';

const raleway = Raleway({subsets: ['latin']})

export default function Dashboard() {

  const { user, isLoading, stripeRole } = useAuth();
  const [ tokens, setTokens ] = useState<number>(0)
  const [recipes, setRecipes] = useState<any[]>([]);
  const router = useRouter();


  /*useEffect( () => {
    if(user == null && isLoading == false) {
      router.replace('/')
    } else if (user !== null && isLoading == false) {
      const unsubscribe = db.collection(`users/${user.uid}/recipes`)
        .onSnapshot((snapshot) => {
          const updatedRecipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setRecipes(updatedRecipes);
          setIsLoadingRecipes(false);
        });
        const fetchUserData = async () => {
            const userData = await getUserData(user.uid);
            setTokens(userData?.tokens);
        };
        fetchUserData();
    }


  }, [user, recipes])*/

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user) {
        const recipeSnapshot = await db.collection(`users/${user.uid}/recipes`).get();
        const updatedRecipes = recipeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRecipes(updatedRecipes);
      }
    };

    if (user == null && !isLoading) {
      router.replace('/');
    } else if (user !== null && !isLoading) {
      fetchRecipes();
    }
  }, [user, isLoading, router]);

  if (isLoading) return <PageLoader/>
    
  return (
    <>
    <Head>
      <title>Zesti | Your Dashboard</title>
      <meta name="robots" content="noindex" />
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <SharedPageTitle title="Dashboard" desc="Access all your saved recipes, and all the tools Zesti has available"/>
        <div className="mt-8 lg:mt-0" />
        <Search/>
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        <DashboardRecipeTitle/>
        <UserSavedRecipeList recipes={recipes} maxDisplayCount={5} max={3}/>
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