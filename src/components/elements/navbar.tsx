"use client;"

import { Container } from "../shared/container"
import { Navitem } from "../shared/navitem"
import { useAuth } from "@/pages/api/auth/auth"
import { useEffect } from "react"
import { BtnLink } from "../shared/button"
import Link from "next/link"
import Image from "next/image"
import { db } from "@/pages/api/firebase/firebase"
import { BookOpenIcon, Cog6ToothIcon, HomeIcon, PaperAirplaneIcon, SquaresPlusIcon, WalletIcon, UserIcon } from "@heroicons/react/20/solid"
import { DropDownMenuDesktop, DropDownMenuMobile } from "./menus"

const userDesktopNavItems = [
    {
        href: "/profile",
        text: "Profile",
        icon: UserIcon,
    },
]

const creatorDesktopNavItems = [
    {
        href: "/cookbook",
        text: "My Recipes",
        icon: BookOpenIcon,
    },
    {
        href: "/profile",
        text: "Profile",
        icon: UserIcon,
    },
]

const navItemsLoggedInMobile = [
    {
        href:"/",
        text:"Home",
        icon: HomeIcon,
    },
    {
        href:"/cookbook",
        text:"My Recipes",
        icon: BookOpenIcon,
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
        text: "Profile",
        icon: Cog6ToothIcon,
    },
]

const creatorItemsLoggedInMobile = [
    {
        href:"/",
        text:"Home",
        icon: HomeIcon,
    },
    { 
        href:"/creator/home",
        text: "Creator Dashboard",
        icon: SquaresPlusIcon, 
    },
    {
        href:"/cookbook",
        text:"My Recipes",
        icon: BookOpenIcon,
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
        text: "Profile",
        icon: Cog6ToothIcon,
    },
]

export function Navbar() {
    
    const { user, isLoading, isCreator } = useAuth();

    const navItemsDesktop = [
        { href: "/", text: "Home" },
        { href: "/pricing", text: "Pricing"},
        { href: "/contact", text: "Contact"},
        // Add more items as needed
    ];

    useEffect(() => {
        if (user?.uid) {
            // Set up a real-time listener to the user's tokens
            const unsubscribe = db.doc(`users/${user.uid}`)
                .onSnapshot(doc => {
                    const userData = doc.data();
                });

            // Clean up the listener when the component unmounts
            return () => unsubscribe();
        }
    }, [user?.uid]);

    if (isLoading == true) return(<></>)

    return(

    <header className="absolute inset-x-0 top-0 z-45 py-6 w-screen">
        <Container>
            <nav className="flex justify-between items-center">
                <div className="flex justify-start w-1/3">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-14 h-14 overflow-hidden flex rounded-xl">
                            <Image src="/images/Zesti-Logo.png" alt="Zesti Artificial Intelligence Recipe Helper Logo" width={60} height={30}/>
                        </div>
                        <div className="inline-flex sm:visible text-2xl font-semibold text-heading-1 text-black">
                            Zesti.ai
                        </div>
                    </Link>
                </div>
                <div className="hidden lg:flex justify-center w-1/3">
                    <ul className="hidden lg:flex items-center justify-center gap-x-8 text-xl">
                        {navItemsDesktop.map(item=> {
                            return <Navitem key={item.text} {...item}/>
                        })}
                    </ul>
                </div>
                <div className="hidden lg:flex justify-end w-1/3">
                    {!user ? 
                    (
                        <BtnLink text='Login' href='/auth/login'/>
                    ) 
                    :
                    user && isCreator == true ? 
                    <div className="inline-flex items-center space-x-4">
                        <BtnLink href="/creator/home" text={'Dashboard'}/>
                        <DropDownMenuDesktop navItems={creatorDesktopNavItems}/>  
                    </div>
                    : 
                    <div className="inline-flex items-center space-x-4">
                        <BtnLink href="/cookbook" text={'My Recipes'}/>
                        <DropDownMenuDesktop navItems={userDesktopNavItems}/>
                    </div>
                    }
                </div>
                { isCreator == false || !isCreator ? 
                    <DropDownMenuMobile navItems={navItemsLoggedInMobile}/>
                :
                    <DropDownMenuMobile navItems={creatorItemsLoggedInMobile}/>
                }
            </nav>
        </Container>
    </header>

    )
}