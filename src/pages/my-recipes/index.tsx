import { useAuth } from "@/pages/api/auth/auth"
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { TitleSection } from '@/components/shared/title';
import AdSense from "@/components/tags/adsense";
import useUserRecipeList from '@/hooks/user/useUserRecipeList';
import useRequireAuth from '@/hooks/user/useRequireAuth';
import { RecipeCardList } from '@/components/ui/recipe/list';


export default function MyRecipes() {

  useRequireAuth()

  const { user, isLoading, stripeRole } = useAuth();
  const { userRecipeList, loadingUserRecipes } = useUserRecipeList(user, isLoading)

  return (
    <>
    <Head>
      <title>Zesti AI | My Recipes</title>
      <meta name="title" content={`Zesti AI | My Recipes`}/>
      <GoogleTags/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background w-full space-y-4 pb-48`}>
        <div className="mt-2 lg:mt-8"/>
        <TitleSection titleBlack="Your Saved Recipes" desc="Access all the recipes you saved from others or search for new ones below"/>
        <AdSense className="max-w-5xl h-[90px]" adSlot="9125889123" adFormat="horizontal" adStyle={{ width: '100%', height: '90px', maxHeight: '90px' }} role={stripeRole}/>
        <RecipeCardList recipes={userRecipeList} maxDisplayCount={9} max={0} loading={loadingUserRecipes}/>
        <AdSense className="max-w-5xl" adSlot="4770591581" adFormat="auto" adStyle={{ width: '100%', height: '250px' }} role={stripeRole}/>
    </main>
    </>
  )
}