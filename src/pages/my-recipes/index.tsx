import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { UserSavedRecipeList } from '@/components/my-recipes';
import { Search } from '@/components/my-recipes';
import { useState, useEffect } from "react";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { PromoteKitTag } from '@/components/tags/headertags';
import AdSenseDisplay from '@/components/tags/adsense';
import { SharedHomeSectionTitle, SharedSectionHeadingTitle } from '@/components/shared/title';
import Breadcrumbs from '@/components/shared/breadcrumb';
import useSetBreadcrumbs from '@/components/shared/setBreadcrumbs';
import { db } from '../api/firebase/firebase';
import { onSnapshot } from "firebase/firestore";

const raleway = Raleway({subsets: ['latin']})

export default function MyRecipes() {

  const { user, isLoading, stripeRole } = useAuth();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true)
  const router = useRouter();

  useSetBreadcrumbs();

  useEffect(() => {
    if (user == null && !isLoading) {
      router.replace('/');
    } 
    else if (user) {
      const recipesRef = db.collection('users').doc(user.uid).collection('recipes');
      const unsubscribe = onSnapshot(recipesRef, (querySnapshot) => {
        const updatedRecipes = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setRecipes(updatedRecipes);
        setLoading(false)
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [user, isLoading, router]);
    
  return (
    <>
    <Head>
      <title>Zesti | Your Recipes</title>
      <meta name="robots" content="noindex" />
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
        <Breadcrumbs/>
        <SharedHomeSectionTitle titleBlack="Your Saved Recipes" desc="Access all the recipes you saved from others or videos you transcribed yourself"/>
        <br/>
        <Search/>
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        <SharedSectionHeadingTitle title={"Recent Saved Recipes"}/>
        <UserSavedRecipeList recipes={recipes} maxDisplayCount={5} max={3} loading={loading}/>
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