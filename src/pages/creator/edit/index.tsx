
import { SharedHomeSectionTitle } from "@/components/shared/title";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from "@/pages/api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from "next/font/google";
import { CreatorSettingsComponent } from "@/components/ui/creator/account";
import Breadcrumbs from "@/components/shared/breadcrumb";
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import useRequireAuth from "@/hooks/user/useRequireAuth";

const raleway = Raleway({subsets: ['latin']})


export default function EditCreatorPage() {

  useSetBreadcrumbs()
  const { user, isLoading } = useAuth();
  const { require } = useRequireAuth(user, isLoading)

  return (
    <>
        <Head>
          <meta name="robots" content="noindex"/>
            <title>Zesti AI | Edit Creator Page</title>
            <meta name="title" content="Zesti AI | Edit Creator Page"/>
            <GoogleTags/>
            <PromoteKitTag/>
        </Head>
        <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
            <Breadcrumbs/>
            <SharedHomeSectionTitle titleBlack="Edit Page"/>
            <CreatorSettingsComponent/>
        </main>
    </>
  )
}
