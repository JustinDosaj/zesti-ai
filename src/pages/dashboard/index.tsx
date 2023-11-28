import { Raleway } from 'next/font/google'
import { DashboardPageTitle, Tools, Usage } from '@/components/dash-sections/dash';
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { DashboardRecipeStackList, DashboardRecipeTitle } from '@/components/dash-sections/grid-display';
import { useState, useEffect } from "react";
import { PageLoader } from "@/components/shared/loader";
import Head from 'next/head';
import { db } from '../api/firebase/firebase';
import { getUserData } from '../api/firebase/functions';

const raleway = Raleway({subsets: ['latin']})

export default function Dashboard() {

    const { user, isLoading, stripeRole } = useAuth();
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
    const [ tokens, setTokens ] = useState<number>(0)
    const [ usage, setUsage ] = useState<number>(0)
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
              if(stripeRole == 'premium') { setUsage(userData?.premiumUsage) }
          };
          fetchUserData();
      }
    }, [user])
    
  return (
    <>
    <Head>
      <title>Zesti | Your Recipes</title>
      <meta name="robots" content="noindex" />
    </Head>
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>

        <DashboardPageTitle/>
        <div className="border-t border-gray-200 sm:mt-0 mb-12 mr-12 ml-12 mt-12" style={{ width: '35%' }} />
        <Usage data={recipes} tokens={tokens} usage={usage}/>
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        <Tools/>
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        <DashboardRecipeTitle/>
        {isLoadingRecipes ? <PageLoader/> : <DashboardRecipeStackList data={recipes} maxDisplayCount={5}/>}
    </main>
    </>
  )
}