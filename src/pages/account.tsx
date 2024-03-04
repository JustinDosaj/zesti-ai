import { Raleway } from 'next/font/google'
import { useAuth } from './api/auth/auth'
import { SharedHomeSectionTitle } from '@/components/shared/title'
import GoogleTags from "@/components/tags/conversion"
import Head from "next/head"
import { PromoteKitTag } from "@/components/tags/headertags"
import { ProfilePageComponent } from "@/components/home/profile"
import { CreatorProfileComponent } from '@/components/creator/profile'
import { PageLoader } from '@/components/shared/loader'
import useRequireAuth from '@/hooks/user/useRequireAuth'
import useAccountStatus from '@/hooks/useAccountStatus'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useCreatorDoc from '@/hooks/creator/useCreatorDoc'

const raleway = Raleway({subsets: ['latin']})

export default function Account() {

    const { user, isLoading, userData, creatorData } = useAuth();
    const { accountStatus, loadingStatus } = useAccountStatus()
    const { loadingCreatorDoc } = useCreatorDoc(user?.uid)
    const { require } = useRequireAuth(user, isLoading)
    const router = useRouter()

    useEffect(() => {
      if(user == null && !isLoading) {
          router.replace('/auth/login')
      } 
    },[user, isLoading, router])

    if(isLoading && loadingCreatorDoc && loadingStatus) return <PageLoader/>

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
      <div className={accountStatus == 'user'  ? `mx-auto` : `grid grid-cols-1 xl:grid-cols-2 gap-x-3` }>
        <ProfilePageComponent/>
        <CreatorProfileComponent/>
      </div>
    </main>
    </>
    )
}