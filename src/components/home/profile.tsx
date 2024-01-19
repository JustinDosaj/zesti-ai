import React, { useState, useEffect } from 'react'
import { Container } from '../shared/container'
import { useRouter } from 'next/router';
import { getUserData } from '@/pages/api/firebase/functions';
import { db } from '@/pages/api/firebase/firebase';
import { PageLoader } from '@/components/shared/loader';
import { useAuth } from '@/pages/api/auth/auth'
import { saveAffiliateLink } from '@/pages/api/firebase/functions'
import { Notify } from '@/components/shared/notify'

export function ProfilePageComponent() {

    const { user, stripeRole, logout, isLoading } = useAuth()
    const [ tokens, setTokens ] = useState<number>(0)
    const router = useRouter();


    useEffect(() => {
        if (user == null && !isLoading) {
          router.replace('/');
        } else if (user && !isLoading) {
          const unsubscribe = db.collection(`users/${user.uid}/recipes`).onSnapshot((snapshot) => {
            const updatedRecipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          });
      
          const fetchUserData = async () => {
            const userData = await getUserData(user.uid);
            setTokens(userData?.tokens);
          };
          fetchUserData();
    
          return () => unsubscribe(); // Cleanup subscription
        }
      }, [user, isLoading, router]);

    if (isLoading) return <PageLoader/>

    return (
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn pb-24"}>
            <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 py-8 standard-component-border">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0 ">
                    <div className="mx-auto max-w-2xl space-y-10 lg:mx-0 lg:max-w-none">
                        <div>
                            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Basic Profile Information</h2>
                            <p className=" text-sm leading-6 text-gray-500 lg:text-base">
                                Basic information assosciated with your profile
                            </p>

                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div className="pt-6 sm:flex">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Email</dt>
                                    <dd className=" flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-700 text-sm lg:text-base">{user?.email}</div>
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={() => logout()}>
                                            Logout
                                        </button>
                                    </dd>
                                </div>
                                <div className="pt-6 sm:flex">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Subscription</dt>
                                    <dd className=" flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-900 capitalize text-sm lg:text-base">{stripeRole ? stripeRole : 'Base'}</div>
                                        {stripeRole == 'premium' ? 
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={() => {window.open(`${process.env.NEXT_PUBLIC_STRIPE_NO_CODE_PORATL}`)}}>
                                            Manage
                                        </button>
                                        :
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={() => router.push('/pricing')}>
                                            Upgrade
                                        </button>
                                        }
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div>
                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div className="pt-6 flex justify-between items-center">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Monthly Usage Remaining</dt>
                                    <dd className=" flex gap-x-6 sm:mt-0">
                                        <div className="text-gray-700 text-sm lg:text-base">{tokens}</div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </main>
            </div>
        </Container>
    )
}

export function CreatorProfileComponent({userData, creatorData}: any) {

    const { user, isLoading, loginWithTikTok, tikTokAccessToken } = useAuth()
    const [ affiliateLink, setAffiliateLink ] = useState<string>('')
    const [ edit, setEdit ] = useState<boolean>(false) 

    useEffect(() => {
        setAffiliateLink(creatorData?.affiliate_link)
    },[creatorData])

    const onAffiliateSave = () => {
        saveAffiliateLink(affiliateLink, user?.uid!)
        setEdit(false)
        Notify("Affiliate code saved!")
    }

    if(creatorData == null) return <div className="hidden"/>

    if (isLoading || !userData ) return <PageLoader/>

    if (!tikTokAccessToken) return (
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn pb-24"}>
             <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 py-8 standard-component-border">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0 ">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                            <dl className="space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div className="pt-6 flex justify-between items-center">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Connect Tiktok Account</dt>
                                    <dd className=" flex gap-x-6 sm:mt-0">
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={loginWithTikTok}>
                                            {"Connect"}
                                        </button>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </main>
            </div>
        </Container>
    )

    return(
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn pb-24"}>
            <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 py-8 w-full standard-component-border">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Creator Settings</h2>
                            <p className=" text-sm leading-6 text-gray-500 lg:text-base">
                                Import settings for your creator page
                            </p>
                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6 animate-fadeIn">
                                <div className="pt-6 grid lg:flex justify-between items-center">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Page Link</dt>
                                    <dd className=" flex gap-x-6 sm:mt-0">
                                        <div className="text-gray-700 text-sm lg:text-base">{`https://www.zesti.ai/${creatorData?.display_url}`}</div>
                                    </dd>
                                </div>
                                <div className="pt-6 flex justify-between items-center">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Connect Tiktok Account</dt>
                                    <dd className=" flex gap-x-6 sm:mt-0">
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={loginWithTikTok}>
                                            {"Reconnect"}
                                        </button>
                                    </dd>
                                </div>
                                <div className="pt-6 flex justify-between items-center">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Affiliate Program</dt>
                                    <dd className=" flex gap-x-6 sm:mt-0">
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={() => {window.open(`https://zesti.promotekit.com/`)}}>
                                            {affiliateLink == '' ? `Setup` : `Manage`}
                                        </button>
                                        {/* TRACK AFFILIATE CODE INSIDE FIRESTORE THEN DISPLAY MANAGE AFFILIATE PROGRAM IF IT IS AVAILABLE*/}
                                    </dd>
                                </div>
                                <div className="pt-6 flex justify-between items-center">
                                    <input className="border border-gray-300 p-2 rounded-3xl w-3/4 font-semibold text-gray-700 sm:w-64 sm:flex-none sm:pr-6" 
                                        placeholder="Copy & Paste Affiliate Link Here"
                                        disabled={!edit}
                                        value={affiliateLink}
                                        onChange={(val: any) => setAffiliateLink(val.target.value)}
                                    />
                                    <dd className=" flex gap-x-6 sm:mt-0">
                                        { edit == false ? 
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={() => setEdit(true)}>
                                            {"Edit"}
                                        </button>
                                        :
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={onAffiliateSave}>
                                            {"Save"}
                                        </button>
                                        }
                                        {/* TRACK AFFILIATE CODE INSIDE FIRESTORE THEN DISPLAY MANAGE AFFILIATE PROGRAM IF IT IS AVAILABLE*/}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </main>
            </div>
        </Container>
    )
}
