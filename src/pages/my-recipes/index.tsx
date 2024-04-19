import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth"
import { AddRecipe } from '@/components/search';
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { TitleSection } from '@/components/shared/title';
import Breadcrumbs from '@/components/shared/breadcrumb';
import useSetBreadcrumbs from '@/components/shared/setBreadcrumbs';
import AdSenseDisplay from '@/components/tags/adsense';
import useUserRecipeList from '@/hooks/user/useUserRecipeList';
import useRequireAuth from '@/hooks/user/useRequireAuth';
import { RecipeCardList } from '@/components/ui/recipe/list';

const raleway = Raleway({subsets: ['latin']})

export default function MyRecipes() {

  useRequireAuth()
  useSetBreadcrumbs()

  const { user, isLoading, stripeRole, userData } = useAuth();
  const { userRecipeList, loadingUserRecipes } = useUserRecipeList(user, isLoading)

  return (
    <>
    <Head>
      <meta name="robots" content="noindex" />
      <title>Zesti | Your Recipes</title>
      <GoogleTags/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background w-screen space-y-4 pb-48 ${raleway.className}`}>
        <Breadcrumbs/>
        <TitleSection titleBlack="Your Saved Recipes" desc="Access all the recipes you saved from others or search for new ones below"/>
        <br/>
        <AddRecipe align="center"/>
        <RecipeCardList recipes={userRecipeList} maxDisplayCount={9} max={0} loading={loadingUserRecipes}/>
        {/* Ad Display for My Recipes */}
        {stripeRole !== 'premium' && userRecipeList.length > 0 && userData?.account_status !== 'creator' ? 
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