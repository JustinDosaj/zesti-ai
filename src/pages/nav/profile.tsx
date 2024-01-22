import { Raleway } from 'next/font/google'
import { useAuth } from '../api/auth/auth'
import { useRouter } from "next/router"
import { SharedHomeSectionTitle } from '@/components/shared/title'
import React, { useEffect } from 'react'
import GoogleTags from "@/components/tags/conversion"
import Head from "next/head"
import { PromoteKitTag } from "@/components/tags/headertags"
import { ProfilePageComponent } from "@/components/home/profile"
import { CreatorProfileComponent } from '@/components/creator/profile'
import { Notify } from '@/components/shared/notify'
import { PageLoader } from '@/components/shared/loader'

const raleway = Raleway({subsets: ['latin']})

export default function Profile() {

    const { user, isLoading, userData, creatorData } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user == null && !isLoading) {
        router.replace('/')
        Notify("Please login to continue")
      } 
    }, [user?.uid, isLoading]);

    if(isLoading) return <PageLoader/>

    return(
    <>
    <Head>
      <title>Zesti | Your Profile</title>
      <GoogleTags/>
      <PromoteKitTag/>
      <meta name="robots" content="noindex" />
    </Head>  
    <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
      <div className="mt-36"/>
      <SharedHomeSectionTitle titleBlack="Your Profile"/>
      <div className={(userData?.isCreator == false || !userData?.isCreator) ? `mx-auto` : `grid grid-cols-1 lg:grid-cols-2` }>
        <ProfilePageComponent/>
        <CreatorProfileComponent userData={userData} creatorData={creatorData}/>
      </div>
    </main>
    </>
    )
}