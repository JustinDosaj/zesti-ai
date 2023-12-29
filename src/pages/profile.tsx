import { Raleway } from 'next/font/google'
import { useAuth } from "./api/auth/auth"
import { useRouter } from "next/router"
import { db } from "./api/firebase/firebase"
import React, { useEffect } from 'react'
import GoogleTags from "@/components/tags/conversion"
import Head from "next/head"
import { PromoteKitTag } from "@/components/tags/headertags"
import ProfilePageComponent from "@/components/home/profile"

const raleway = Raleway({subsets: ['latin']})

// Linked to Add
// https://zesti.getrewardful.com/login
// https://zesti.getrewardful.com/signup

export default function Profile() {

    const { user, logout, isLoading, stripeRole } = useAuth();
    const router = useRouter();
  
      useEffect(() => {
        if(user == null && isLoading == false) {
            router.push('/');
        }
        // Remove the onFirstPageLoad call and related state updates
    }, [user, isLoading, router]);

      useEffect(() => {
        if (user?.uid) {
            const unsubscribe = db.doc(`users/${user.uid}`)
                .onSnapshot((doc: any) => {
                    const userData = doc.data();
                });

            return () => unsubscribe();
        }
    }, [user?.uid]);

    return(
    <>
    <Head>
      <title>Zesti | Your Profile</title>
      <GoogleTags/>
      <PromoteKitTag/>
      <meta name="robots" content="noindex" />
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
      <ProfilePageComponent/>
     </main>
    </>
    )
}