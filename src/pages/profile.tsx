import { Container } from "@/components/shared/container"
import { Raleway } from 'next/font/google'
import { Button, AltButton, InlineBtnLink } from "@/components/shared/button"
import { useAuth } from "./api/auth/auth"
import { useRouter } from "next/router"
import { CheckIcon } from "@heroicons/react/20/solid"
import { ChevronDoubleUpIcon } from "@heroicons/react/20/solid"
import { db } from "./api/firebase/firebase"
import React, { useState, useEffect } from 'react'
import GoogleTags from "@/components/google/conversion"
import Head from "next/head"
import { RewardfulTag } from "@/components/tags/headertags"
import ProfilePageComponent from "@/components/home-sections/profile"

const raleway = Raleway({subsets: ['latin']})

// Linked to Add
// https://zesti.getrewardful.com/login
// https://zesti.getrewardful.com/signup

export default function Profile() {

    const { user, logout, isLoading, stripeRole } = useAuth();
    const [tokens, setTokens] = useState<number>(0)
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
                    setTokens(userData?.tokens || 0);
                });

            return () => unsubscribe();
        }
    }, [user?.uid]);

    return(
    <>
    <Head>
      <title>Zesti | Your Profile</title>
      <GoogleTags/>
      <RewardfulTag/>
      <meta name="robots" content="noindex" />
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
      <ProfilePageComponent/>
     </main>
    </>
    )
}