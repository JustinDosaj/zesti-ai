import { Raleway } from 'next/font/google'
import { useAuth } from "./api/auth/auth"
import { useRouter } from "next/router"
import { SharedHomeSectionTitle } from '@/components/shared/title'
import React, { useEffect, useState } from 'react'
import GoogleTags from "@/components/tags/conversion"
import Head from "next/head"
import { PromoteKitTag } from "@/components/tags/headertags"
import { ProfilePageComponent } from "@/components/home/profile"
import { CreatorProfileComponent } from '@/components/creator/profile'
import { getUserData, getCreatorData } from './api/firebase/functions'
import { Notify } from '@/components/shared/notify'
import { PageLoader } from '@/components/shared/loader'

const raleway = Raleway({subsets: ['latin']})

export default function Profile() {

    const { user, isLoading, stripeRole, isCreator } = useAuth();
    const [ creatorData, setCreatorData ] = useState<any>()
    const [ userData, setUserData ] = useState<any>()
    const [ firstLoad, setFirstLoad ] = useState<boolean>(true)
    const router = useRouter();
    
    console.log(userData)
      useEffect(() => {
        if(user == null && isLoading == false) {
            router.push('/');
        }
        // Remove the onFirstPageLoad call and related state updates
    }, [user, isLoading, router]);

      useEffect(() => {

        const fetchUserDataFromFirebase = async () => {
          if (user && isCreator == true) {
              const fetchUserData = await getUserData(user.uid)
              setUserData(fetchUserData)

              const fetchCreatorData = await getCreatorData(user?.uid)
              setCreatorData(fetchCreatorData)

              setFirstLoad(false)

          } else if (user) {
              const fetchUserData = await getUserData(user.uid)
              setUserData(fetchUserData)
              setCreatorData(null)
              setFirstLoad(false)
          }
        }

        if (user == null && !isLoading) {
          router.replace('/')
          Notify("Please login to continue")
        } else if ( user!== null && !isLoading) {
          fetchUserDataFromFirebase();
        }
    }, [user?.uid, isLoading]);

    if(isLoading || firstLoad == true) return <PageLoader/>

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
      <div className={(isCreator == false || !isCreator) ? `mx-auto` : `grid grid-cols-1 lg:grid-cols-2` }>
        <ProfilePageComponent/>
        <CreatorProfileComponent userData={userData} creatorData={creatorData}/>
      </div>
    </main>
    </>
    )
}