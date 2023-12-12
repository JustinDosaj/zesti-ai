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

const raleway = Raleway({subsets: ['latin']})

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
      <meta name="robots" content="noindex" />
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
     <Container className={"mt-36 pb-16 justify-center lg:gap-12 h-screen mb-28 lg:mb-0"}>
        <div className="lg:col-start-1 lg:row-end-1 mx-auto w-full md:w-1/2">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <p className="mt-2 section-title-text-size font-bold tracking-tight text-gray-900">
                Manage Account
              </p>
            </div>
            <div className="rounded-2xl shadow-lg border border-gray-300">
              <div className="text-center pt-6 pb-6 font-bold text-black">
                  {user?.email}
              </div>
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6">
                      <dt className="text-sm font-semibold leading-6 text-gray-900">Remaining Videos</dt>
                      <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">{tokens ? tokens : 0}</dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                      <dt className="sr-only">Status</dt>
                      <dd className="inline-flex rounded-md bg-green-50 px-2 py-1 text-base font-medium text-green-700 ring-1 ring-inset ring-green-600/20 capitalize">
                      {stripeRole ? stripeRole : 'Base'}
                      </dd>
                  </div>
                </dl>
                <div className="grid grid-cols-1 sm:grid-cols-2 space-x-0 md:space-x-4 space-y-2 md:space-y-0 mt-6 border-t px-6 py-6 w-full">
                  {stripeRole == 'premium' ?
                    <div className="space-y-2">
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">Save 30 recipes per month</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">Save TikTok & YouTube recipes</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">Max Video Length: 15 Minutes</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">Unlimited AI Generated Recipes</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">AI Cooking Support</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">Customize Recipes</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">No Advertisements</span>
                      </div>
                    </div>
                    :
                    <div className="space-y-2">
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">Save 3 recipes per month</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">Save TikTok & YouTube recipes</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">Max Video Length: 5 Minutes</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">AI Recipe Generator</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <CheckIcon className="h-5 w-5 text-color-alt-green"/>
                        <span className="text-gray-700">Customize Recipes</span>
                      </div>
                      <div className="inline-flex space-x-2 align-middle items-center">
                        <ChevronDoubleUpIcon className="h-5 w-5 text-color-alt-green"/>
                        <span><InlineBtnLink href="/pricing" text="Upgrade to Premium"/></span>
                      </div>
                    </div>
                  }
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 mt-6 border-t px-6 py-6">
                    <AltButton buttonType="button" text="Manage Subscription" onClick={() => {window.open(`${process.env.NEXT_PUBLIC_STRIPE_NO_CODE_PORATL}`)}}/>
                    <Button buttonType="button" text='Logout' onClick={() => logout()}/>
                </div>
            </div>
        </div>
     </Container>
     </main>
    </>
    )
}