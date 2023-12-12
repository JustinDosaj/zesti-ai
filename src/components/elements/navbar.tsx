"use client;"

import { Container } from "../shared/container"
import { Navitem } from "../shared/navitem"
import { useAuth } from "@/pages/api/auth/auth"
import { useState, useEffect } from "react"
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BtnLink } from "../shared/button"
import Link from "next/link"
import Image from "next/image"
import { db } from "@/pages/api/firebase/firebase"
import { Loader } from "../shared/loader"
import { Cog6ToothIcon, HomeIcon, SparklesIcon, PaperAirplaneIcon, RectangleGroupIcon, SquaresPlusIcon, WalletIcon } from "@heroicons/react/20/solid"

const navItems = [
    {
        href:"/",
        text:"Home",
    },
    {
        href:"/pricing",
        text:"Pricing",
    },
    {
        href:"/contact",
        text: "Contact",
    },
]

const navItemsLoggedIn = [
    {
        href:"/",
        text:"Home",
    },
    {
        href:"/pricing",
        text:"Pricing",
    },
    {
        href:"/contact",
        text: "Contact",
    },
    {
        href: "/profile",
        text: "Settings",
    },
]

const navItemsLoggedInMobile = [
    {
        href:"/",
        text:"Home",
        icon: HomeIcon,
    },
    {
        href:"/dashboard",
        text:"My Dashboard",
        icon: SquaresPlusIcon,
    },
    {
        href:"/pricing",
        text:"Pricing",
        icon: WalletIcon,
    },
    {
        href:"/contact",
        text: "Contact",
        icon: PaperAirplaneIcon,
    },
    {
        href: "/profile",
        text: "Settings",
        icon: Cog6ToothIcon,
    },
]

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
    }


export function Navbar({_user}: any) {
    
    const { user, stripeRole, isLoading } = useAuth();
    const [tokens, setTokens] = useState<number>(0)

    useEffect(() => {
        if (user?.uid) {
            // Set up a real-time listener to the user's tokens
            const unsubscribe = db.doc(`users/${user.uid}`)
                .onSnapshot(doc => {
                    const userData = doc.data();
                    setTokens(userData?.tokens || 0);
                });

            // Clean up the listener when the component unmounts
            return () => unsubscribe();
        }
    }, [user?.uid]);

    if (isLoading == true) return(<></>)

    return(
    <>
    <header className="absolute inset-x-0 top-0 z-50 py-6">
        <Container>
            <nav className="w-full flex justify-between relative">
                <div className="min-w-max inline-flex relative">
                    <Link href="/" className="relative flex items-center gap-3">
                        <div className="relative w-14 h-14 overflow-hidden flex rounded-xl">
                            <Image src="/images/Zesti-Logo.png" alt="Zesti Artificial Intelligence Recipe Helper Logo" width={60} height={30}/>
                        </div>
                        <div className="inline-flex sm:visible text-2xl font-semibold text-heading-1 text-black">
                            Zesti.ai
                        </div>
                    </Link>
                </div>
                <div data-navbar className="flex h-0 overflow-hidden lg:!h-auto lg:scale-y-100 duration-300 ease-linear flex-col gap-y-6 gap-x-4 lg:flex-row w-full lg:justify-between lg:items-center absolute lg:relative top-full lg:top-0 bg-body lg:bg-transparent border-x border-x-box-border lg:border-x-0">
                    <ul className="border-t border-box-border lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-14 text-xl text-heading-2 w-full lg:justify-center lg:items-center">
                    {
                        user !== null ? 
                        navItemsLoggedIn.map(item=> {
                            return <Navitem key={item.text} {...item}/>
                        })
                        : 
                        navItems.map(item=>{
                            return <Navitem key={item.text} {...item}/>
                        })
                    }
                    </ul>
                    <div className="lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b border-box-bg lg:border-0 px-6 lg:px-0">
                    {
                    !user ?
                    <BtnLink text='Login' className="flex justify-center w-full sm:w-max" href='/login'/>
                    :
                    <div className="inline-flex">
                        <BtnLink href="/dashboard" text={'Dashboard'}/>
                    </div>
                    }
                </div>
                </div>
                <Menu as="div" className="relative inline-block text-left lg:invisible  mt-3">
                    <div>
                        <Menu.Button className="flex items-center rounded-full text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 focus:ring-offset-primary-alt">
                            <span className="sr-only">Open options</span>
                            <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >   
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {
                                user !== null ? 
                                navItemsLoggedInMobile.map((item)=> (
                                    <Menu.Item key={item.text}>
                                    {({ active }) => (
                                        <a
                                        href={item.href}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        >
                                            <span className="inline-flex gap-x-2 items-center">
                                                <item.icon className="h-5 w-5 text-primary-main"/>
                                                {item.text}
                                            </span>
                                        </a>
                                        
                                    )}
                                    </Menu.Item>
                                ))
                                :
                                navItems.map((item)=> (
                                    <Menu.Item key={item.text}>
                                    {({ active }) => (
                                        <a
                                        href={item.href}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        >
                                        {item.text}
                                        </a>
                                    )}
                                    </Menu.Item>
                                ))
                            }
                        </div>
                        </Menu.Items>
                    </Transition>
                    </Menu>
            </nav>
        </Container>
    </header>
    </>
    )
}