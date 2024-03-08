import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth"
import { UserSavedRecipeList } from '@/components/ui/user/cookbook';
import { Search } from '@/components/search';
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { PromoteKitTag } from '@/components/tags/headertags';
import { SharedHomeSectionTitle, SharedSectionHeadingTitle } from '@/components/shared/title';
import Breadcrumbs from '@/components/shared/breadcrumb';
import useSetBreadcrumbs from '@/components/shared/setBreadcrumbs';
import AdSenseDisplay from '@/components/tags/adsense';
import useUserRecipeList from '@/hooks/user/useUserRecipeList';
import useRequireAuth from '@/hooks/user/useRequireAuth';
import { useRouter } from 'next/router';

const raleway = Raleway({subsets: ['latin']})

export default function MyRecipes() {

  const { user, isLoading, stripeRole } = useAuth();
  const { require } = useRequireAuth(user, isLoading)
  const { userRecipeList, loadingUserRecipes } = useUserRecipeList(user, isLoading)
  const router = useRouter()

  useSetBreadcrumbs();

  return (
    <>
    <Head>
      <meta name="robots" content="noindex" />
      <title>Zesti | Your Recipes</title>
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
        <Breadcrumbs/>
        <SharedHomeSectionTitle titleBlack="Your Saved Recipes" desc="Access all the recipes you saved from others or videos you transcribed yourself"/>
        <br/>
        <Search searchLocation={"my-recipes"}/>
        <div className="border-t border-gray-200 m-12" style={{ width: '35%' }} />
        <SharedSectionHeadingTitle title={"Recent Saved Recipes"}/>
        <UserSavedRecipeList recipes={userRecipeList} maxDisplayCount={5} max={3} loading={loadingUserRecipes}/>
        {stripeRole !== 'premium' && userRecipeList.length > 0 ? 
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