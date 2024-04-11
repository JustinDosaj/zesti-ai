import { Raleway } from 'next/font/google'
import { useAuth } from './api/auth/auth'
import { TitleSection } from '@/components/shared/title'
import GoogleTags from "@/components/tags/conversion"
import Head from "next/head"
import { PromoteKitTag } from "@/components/tags/headertags"
import { ProfilePageComponent } from '@/components/ui/user/account'
import { CreatorProfileComponent } from '@/components/ui/creator/account'
import { PageLoader } from '@/components/shared/loader'
import useRequireAuth from '@/hooks/user/useRequireAuth'

const raleway = Raleway({subsets: ['latin']})

export default function Account() {

    // Redirect if user is not logged in
    useRequireAuth()

    const { isLoading, userData } = useAuth();

    if(isLoading) return <PageLoader/>

    return(
    <>
    <Head>
      <meta name="robots" content="noindex" />
      <title>Zesti AI | Your Account</title>
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
      <div className="mt-36"/>
      <TitleSection titleBlack="Your Account"/>
      <div className={userData?.account_status == 'user'  ? `mx-auto` : `grid grid-cols-1 xl:grid-cols-2 xl:gap-x-3` }>
        <ProfilePageComponent/>
        <CreatorProfileComponent/>
      </div>
      <div className="mt-36"/>
    </main>
    </>
    )
}