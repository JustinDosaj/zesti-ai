import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth"
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

  const { user, isLoading, stripeRole } = useAuth();
  const { userRecipeList, loadingUserRecipes } = useUserRecipeList(user, isLoading)

  return (
    <>
    <Head>
      <title>Zesti AI | My Recipes</title>
      <meta name="title" content={`Zesti AI | My Recipes`}/>
      <GoogleTags/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background w-screen space-y-4 pb-48 ${raleway.className}`}>
        <Breadcrumbs/>
        <TitleSection titleBlack="Your Saved Recipes" desc="Access all the recipes you saved from others or search for new ones below"/>
        <RecipeCardList recipes={userRecipeList} maxDisplayCount={9} max={0} loading={loadingUserRecipes}/>
        {/* Ad Display for My Recipes */}
        <div className="pt-12 w-[300px] md:w-[728px]">
          <AdSenseDisplay adSlot="1979966274" adFormat="horizontal" widthRes="true" role={stripeRole}/>
        </div>
    </main>
    </>
  )
}