import { Raleway } from 'next/font/google'
import { useAuth } from '@/pages/api/auth/auth'
import { useRouter } from "next/router"
import { SharedHomeSectionTitle } from '@/components/shared/title'
import React, { useEffect } from 'react'
import GoogleTags from "@/components/tags/conversion"
import Head from "next/head"
import { PromoteKitTag } from "@/components/tags/headertags"
import { Notify } from '@/components/shared/notify'
import { PageLoader } from '@/components/shared/loader'
import Breadcrumbs from '@/components/shared/breadcrumb'
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";

const raleway = Raleway({subsets: ['latin']})

export default function Profile() {

    useSetBreadcrumbs()

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
      <Breadcrumbs/>
      <SharedHomeSectionTitle titleBlack="Add Recipe" desc="Add a new recipe to your creator page"/>
      <div className="h-96 w-96 border rounded-3xl mt-4">
        <div className="grid justify-center my-auto">
            <span>Advanced Recipe Settings Go Here</span>
        </div>
      </div>
    </main>
    </>
    )
}