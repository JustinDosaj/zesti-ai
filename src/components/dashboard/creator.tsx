import React, { Fragment, useState, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Raleway } from 'next/font/google'
import { PageLoader } from '../shared/loader'
import { useAuth } from '@/pages/api/auth/auth'
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

export function CreatorSettingsComponent() {

    const { user, isLoading, loginWithTikTok, isCreator } = useAuth() 

    if (isLoading) return <PageLoader/>

    return(
        <div>
            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Creator Page</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                Create recipes on TikTok? Easily showcase them for your users with Zesti
            </p>
            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Connect Tiktok Account</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={loginWithTikTok}>
                            Connect
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

export function ProfileCreatorComponent() {

    const { user, isLoading } = useAuth() 

    if (isLoading) return <PageLoader/>

    return(
        <div className="bg-yellow-200">
            <p className="text-xl text-gray-600">PROFILE</p>
        </div>
    )
}