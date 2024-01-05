import React, { useState, ReactNode } from 'react'
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { Raleway } from 'next/font/google'
import { PageLoader } from '../shared/loader'
import { Button } from '../shared/button'
import { useAuth } from '@/pages/api/auth/auth'
import { saveAffiliateLink } from '@/pages/api/firebase/functions'
const raleway = Raleway({subsets: ['latin']})


const navigation = [
  { name: 'Home', href: '/creator/home', icon: HomeIcon, current: true },
  { name: 'Add Recipe', href: '/creator/add-recipe', icon: UsersIcon, current: false },
  { name: 'Settings', href: '/creator/settings', icon: FolderIcon, current: false },
  { name: 'Profile', href: '#', icon: CalendarIcon, current: false },
]

function classNames(...classes: (string | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

  type CreatorDashboardProps = {
    children: ReactNode; // Accepts any valid React node
};

export function CreatorHomeComponent() {

    const { user, isLoading } = useAuth() 

    if (isLoading) return <PageLoader/>

    return(
        <div className="bg-yellow-200">
            <p className="text-xl text-gray-600">HOME</p>
        </div>
    )
}

export function CreatorSettingsComponent({userData}: any) {

    const { user, isLoading, loginWithTikTok, tikTokAccessToken } = useAuth()
    const [ affiliateLink, setAffiliateLink ] = useState<string>(userData?.affiliate_link) 

    console.log("Blah", userData?.affiliate_link)

    if (isLoading) return <PageLoader/>

    return(
        <div>
            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Creator Page</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                Create recipes on TikTok? Easily showcase them for your users with Zesti
            </p>
            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Email</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <div className="text-gray-700 text-sm lg:text-base">{user?.email}</div>
                        {/* *CHANGE TO SOMETHING ELSE AFTER FIRST TIKTOK CONNECTION --> OPTION TO RECONNECT OR CHANGE ACCOUNTS WILL DELETE CURRENT PAGE
                            *POSSIBLE REQUIRE TIKTOK ACCOUNT AUTHROIZATION BEFORE APPLICATION SUBMISSION TO ENSURE WE KNOW THIS PERSON OWNS A TIKTOK 
                        */}
                    </dd>
                </div>
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Connect Tiktok Account</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={loginWithTikTok}>
                            {tikTokAccessToken == null ? "Connect" : "Reconnect"}
                        </button>
                        {/* *CHANGE TO SOMETHING ELSE AFTER FIRST TIKTOK CONNECTION --> OPTION TO RECONNECT OR CHANGE ACCOUNTS WILL DELETE CURRENT PAGE
                            *POSSIBLE REQUIRE TIKTOK ACCOUNT AUTHROIZATION BEFORE APPLICATION SUBMISSION TO ENSURE WE KNOW THIS PERSON OWNS A TIKTOK 
                        */}
                    </dd>
                </div>
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Affiliate Program</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={() => {window.open(`https://zesti.promotekit.com/`)}}>
                            Setup
                        </button>
                        {/* TRACK AFFILIATE CODE INSIDE FIRESTORE THEN DISPLAY MANAGE AFFILIATE PROGRAM IF IT IS AVAILABLE*/}
                    </dd>
                </div>
                <div className="pt-6 flex justify-between items-center">
                    <input className="border border-gray-300 p-2 rounded-3xl w-3/4 font-semibold text-gray-700 sm:w-64 sm:flex-none sm:pr-6" 
                        placeholder="Copy & Paste Affiliate Link Here"
                        value={userData?.affiliate_link}
                        onChange={(val: any) => setAffiliateLink(val.target.value)}
                    />
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={() => {saveAffiliateLink(affiliateLink, user?.uid!)}}>
                            {"Save"}
                        </button>
                        {/* TRACK AFFILIATE CODE INSIDE FIRESTORE THEN DISPLAY MANAGE AFFILIATE PROGRAM IF IT IS AVAILABLE*/}
                    </dd>
                </div>
                <div className="pt-6 flex justify-end items-center">
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <Button buttonType="button" className="font-semibold text-sm lg:text-base" text="Create Page"
                            onClick={() => {window.open(`https://zesti.promotekit.com/`)}}>
                        </Button>
                        {/* TRACK AFFILIATE CODE INSIDE FIRESTORE THEN DISPLAY MANAGE AFFILIATE PROGRAM IF IT IS AVAILABLE*/}
                    </dd>
                </div>
            </dl>
        </div>
    )
}

export function AddRecipeCreatorComponent() {

    const { user, isLoading } = useAuth() 

    if (isLoading) return <PageLoader/>

    return(
        <div className="bg-yellow-200">
            <p className="text-xl text-gray-600">ADD RECIPE</p>
        </div>
    )
}