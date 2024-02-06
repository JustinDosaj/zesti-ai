import { Raleway } from 'next/font/google'
import { useAuth } from '../api/auth/auth'
import { SharedHomeSectionTitle } from '@/components/shared/title'
import GoogleTags from "@/components/tags/conversion"
import Head from "next/head"
import { PromoteKitTag } from "@/components/tags/headertags"
import { ProfilePageComponent } from "@/components/home/profile"
import { CreatorProfileComponent } from '@/components/creator/profile'
import { PageLoader } from '@/components/shared/loader'
import useRequireAuth from '@/hooks/user/useRequireAuth'

const raleway = Raleway({subsets: ['latin']})

export default function Profile() {

    const { user, isLoading, userData, creatorData } = useAuth();
    const { require } = useRequireAuth(user, isLoading)

    if(isLoading) return <PageLoader/>

    return(
    <>
    <Head>
      <title>Zesti | Your Profile</title>
      <GoogleTags/>
      <PromoteKitTag/>
      <meta name="robots" content="noindex" />
    </Head>  
    <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
      <div className="mt-36"/>
      <SharedHomeSectionTitle titleBlack="Your Profile"/>
      <div className={(userData?.isCreator == false || !userData?.isCreator) ? `mx-auto` : `grid grid-cols-1 xl:grid-cols-2 gap-x-3` }>
        <ProfilePageComponent/>
        <CreatorProfileComponent userData={userData} creatorData={creatorData}/>
      </div>
    </main>
    </>
    )
}