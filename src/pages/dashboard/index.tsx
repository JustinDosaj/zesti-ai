import { Raleway } from 'next/font/google'
import { DashboardPageTitle, Tools, Usage } from '@/components/dash-sections/dash';
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { RecipeList } from '@/components/dash-sections/recipelist';
import { DashboardRecipeTitle } from '@/components/dash-sections/dash';
import { useState, useEffect } from "react";
import { PageLoader } from "@/components/shared/loader";
import Head from 'next/head';
import { db } from '../api/firebase/firebase';
import { getUserData } from '../api/firebase/functions';
import GoogleTags from '@/components/google/conversion';
import { RewardfulTag } from '@/components/tags/headertags';
import AdSenseDisplay from '@/components/google/adsense';

const raleway = Raleway({subsets: ['latin']})

export default function Dashboard() {

    const { user, isLoading, stripeRole } = useAuth();
    const [isLoadingRecipes, setIsLoadingRecipes] = useState<boolean>(true);
    const [ waitForPage, setWaitForPage ] = useState<boolean>(true)
    const [ tokens, setTokens ] = useState<number>(0)
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
      <title>Zesti | Your Dashboard</title>
      <meta name="robots" content="noindex" />
      <GoogleTags/>
      <RewardfulTag/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <DashboardPageTitle/>
        <div className="mt-8 lg:mt-0" />
        <Usage data={recipes} tokens={tokens}/>
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        <Tools/>
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        <DashboardRecipeTitle/>
        {isLoadingRecipes ? <PageLoader/> : <RecipeList data={recipes} maxDisplayCount={5}/>}
        {stripeRole !== 'premium' && recipes.length > 0 ? 
        <div className="flex justify-center items-center py-16">
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