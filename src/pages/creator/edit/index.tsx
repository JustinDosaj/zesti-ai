
import { SharedHomeSectionTitle } from "@/components/shared/title";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from "@/pages/api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { useRouter } from "next/router";
import { Raleway } from "next/font/google";
import { CreatorPageComponent } from "@/components/creator/profile";
import Breadcrumbs from "@/components/shared/breadcrumb";
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import useRequireAuth from "@/hooks/user/useRequireAuth";
import useAccountStatus from "@/hooks/useAccountStatus";

const raleway = Raleway({subsets: ['latin']})


export default function Page() {

  useSetBreadcrumbs()
  const { user, userData, creatorData, isLoading } = useAuth();
  const { require } = useRequireAuth(user, isLoading)
  const { accountStatus, loadingStatus } = useAccountStatus(userData, isLoading, creatorData)
  const router = useRouter()
  
  if(accountStatus !== "creator_complete" && !loadingStatus) { router.push('/nav/profile') }
  
  return (
    <>
        <Head>
            <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
            <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
            <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
            <GoogleTags/>
            <PromoteKitTag/>
        </Head>
        <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
            <Breadcrumbs/>
            <SharedHomeSectionTitle titleBlack="Creator Settings" desc="Add more information to your creator pages"/>
            <CreatorPageComponent creatorData={creatorData}/>
        </main>
    </>
  )
}
