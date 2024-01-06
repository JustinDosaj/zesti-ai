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
import { SparklesIcon, VideoCameraIcon, LinkIcon } from "@heroicons/react/20/solid"
import { Container } from '../shared/container'
import Link from 'next/link'
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
            <p className="text-lg text-gray-600">Show links (view page, etc.)</p>
            <p className="text-lg text-gray-600">Show basic navigation options like add recipe or view page</p>
        </div>
    )
}

export function CreatorSettingsComponent({userData}: any) {

    const { user, isLoading, loginWithTikTok, tikTokAccessToken } = useAuth()
    const [ affiliateLink, setAffiliateLink ] = useState<string>(userData?.affiliate_link) 

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
            <p className="text-lg text-gray-600">Recipe navigation to add custom recipe or tiktok recipe</p>
        </div>
    )
}

export function CreatorTools() {

    const stats = [
        { 
            id: 1, 
            name: 'Add Recipe', 
            icon: SparklesIcon, 
            colorType: 'green', 
            href: '/tools/generator', 
            desc: "Create new recipes just for you" 
        },
        { 
            id: 2, 
            name: 'Edit Settings', 
            icon: VideoCameraIcon, 
            colorType: 'red', 
            href: '/tools/video', 
            desc: "Save recipes from YouTube or TikTok" 
        },
        { 
            id: 3, 
            name: 'View Page', 
            icon: LinkIcon, 
            colorType: 'yellow', 
            href: '/tools/website', 
            desc: "Remove clutter from recipe websites"
        },
      ]

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
    <div className="w-full">
      <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">Other Tools</h3>
      <dl className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
        <div key={item.id}>
            <Link href={item.href} className="">
                <div
                    key={item.id}
                    className="relative overflow-hidden rounded-3xl bg-white px-4 pb-12 pt-5 orange-border-shadow sm:px-6 sm:pt-6 hover:bg-gray-200 hover:ease-in hover:duration-100"
                >
                    <dt>
                    <div className={classNames(item.colorType == 'green' ? 'bg-color-alt-green bg-opacity-80' : item.colorType == 'yellow' ? 'bg-yellow-400' : item.colorType == 'red' ? 'bg-red-400' : 'bg-color-alt-green bg-opacity-80', `absolute rounded-xl p-3`)}>
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-lg font-semibold text-black">{item.name}</p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-sm sm:text-base text-gray-900">{item.desc}</p>
                    <div className="flex justify-center absolute inset-x-0 bottom-0 bg-gray-150 px-4 py-4 sm:px-6">
                        <div className="flex justify-center font-medium cursor-pointer text-white bg-gray-900 w-full text-sm p-2 rounded-3xl hover:bg-gray-700 hover:ease-in hover:duration-100">
                            Add Recipe<span className="sr-only"> {item.name} stats</span>
                        </div>
                    </div>
                    </dd>
                </div>
            </Link>
          </div>
        ))}
      </dl>
    </div>
    </Container>
    )
}