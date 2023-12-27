import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { RecipeList } from '@/components/dash-sections/recipelist';
import { useState, useEffect } from "react";
import { PageLoader } from "@/components/shared/loader";
import { db } from '../api/firebase/firebase';
import { getUserData } from '../api/firebase/functions';
import GoogleTags from '@/components/tags/conversion';
import { RewardfulTag } from '@/components/tags/headertags';
import { SharedPageTitle } from '@/components/shared/title';
import { VideoList } from '@/components/dash-sections/videolist';
import { Button } from '@/components/shared/button';
import Head from 'next/head';
import AdSenseDisplay from '@/components/tags/adsense';

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
        <SharedPageTitle title="Manage Recipes" desc="Add your old or recent video recipes to display on your page"/>
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        {isLoadingRecipes ? 
        <PageLoader/> 
        :
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
          <button onClick={() => router.push("/creator/recipes")}>View All</button>
            <RecipeList data={recipes} maxDisplayCount={5} title={"Recent Recipes"}/>
          </div>
          <div>
            <button onClick={() => router.push("/creator/videos")}>View All</button>
            <VideoList data={recipes} maxDisplayCount={5} title={"Recent Video Uploads"}/>
          </div>
        </div>
        }
        <div className="flex justify-center items-center py-16"></div>
    </main>
    </>
  )
}