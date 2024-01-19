import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { UserSavedRecipeList } from '@/components/dashboard/recipelist';
import { DashboardRecipeTitle, Search } from '@/components/dashboard';
import { useState, useEffect } from "react";
import { PageLoader } from "@/components/shared/loader";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { PromoteKitTag } from '@/components/tags/headertags';
import AdSenseDisplay from '@/components/tags/adsense';
import { SharedHomeSectionTitle } from '@/components/shared/title';
import { getAllRecipes } from '../api/firebase/functions';
import Breadcrumbs from '@/components/shared/breadcrumb';

const raleway = Raleway({subsets: ['latin']})

export default function Cookbook() {

  const { user, isLoading, stripeRole } = useAuth();
  const [recipes, setRecipes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user) {
        const recipes = await getAllRecipes(user?.uid)
        setRecipes(recipes)
      }
    };

    if (user == null && !isLoading) {
      router.replace('/');
    } 
    else if (user !== null && !isLoading) {
      fetchRecipes();
    }
  }, [user, isLoading, router]);

  if (isLoading) return <PageLoader/>
    
  return (
    <>
    <Head>
      <title>Zesti | Your Recipes</title>
      <meta name="robots" content="noindex" />
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <Breadcrumbs/>
        <SharedHomeSectionTitle titleBlack="Your Cookbook" desc="Access all your saved recipes, and all the tools Zesti has available"/>
        <br/>
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