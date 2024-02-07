"use client;"

import { Container } from "../shared/container"
import { Navitem } from "../shared/navitem"
import { useAuth } from "@/pages/api/auth/auth"
import { BtnLink, Button } from "../shared/button"
import Link from "next/link"
import Image from "next/image"
import { BookOpenIcon, HomeIcon, PaperAirplaneIcon, WalletIcon, UserIcon, VideoCameraIcon } from "@heroicons/react/20/solid"
import { DropDownMenuDesktop, DropDownMenuMobile } from "./menus"
import useAccountStatus from "@/hooks/useAccountStatus"
import { useRouter } from "next/router"
import { callGenerateCreatorPage } from "@/pages/api/handler/submit"


const navItemsLoggedInMobile = [
    {
        href:"/",
        text:"Home",
        icon: HomeIcon,
    },
    {
        href:"/my-recipes",
        text:"My Recipes",
        icon: BookOpenIcon,
    },
    {
        href:"/nav/pricing",
        text:"Pricing",
        icon: WalletIcon,
    },
    {
        href:"/nav/contact",
        text: "Contact",
        icon: PaperAirplaneIcon,
    },
    {
        href: "/nav/profile",
        text: "Profile",
        icon: UserIcon,
    },
]

const creatorItemsLoggedInMobile = [
    {
        href:"/",
        text:"Home",
        icon: HomeIcon,
    },
    {
        href:"/my-recipes",
        text:"My Recipes",
        icon: BookOpenIcon,
    },
    { 
        href:"/creator/edit",
        text: "Manage Creator Page",
        icon: VideoCameraIcon, 
    },
    {
        href: "/nav/profile",
        text: "Profile Settings",
        icon: UserIcon,
    },
    {
        href:"/nav/pricing",
        text:"Pricing",
        icon: WalletIcon,
    },
    {
        href:"/nav/contact",
        text: "Contact",
        icon: PaperAirplaneIcon,
    },
]

const creatorItemsLoggedInMobileNoToken = [
    {
        href:"/",
        text:"Home",
        icon: HomeIcon,
    },
    {
        href:"/my-recipes",
        text:"My Recipes",
        icon: BookOpenIcon,
    },
    { 
        href:"/nav/profile",
        text: "Connect TikTok",
        icon: VideoCameraIcon, 
    },
    {
        href: "/nav/profile",
        text: "Profile Settings",
        icon: UserIcon,
    },
    {
        href:"/nav/pricing",
        text:"Pricing",
        icon: WalletIcon,
    },
    {
        href:"/nav/contact",
        text: "Contact",
        icon: PaperAirplaneIcon,
    },
]


export function Navbar() {
    
    const { user, isLoading, userData, creatorData } = useAuth();
    const { accountStatus, accountStatusMessage, loginWithTikTok, navCreator } = useAccountStatus(userData, isLoading, creatorData)
    const router = useRouter()

    const mainNavButton = {
        name: accountStatusMessage,
        function:  accountStatus == "creator_connect_tiktok" ? () => loginWithTikTok() 
                    : accountStatus == "creator_generate_page" ? async () => await callGenerateCreatorPage({userData, creatorData})
                    : () => router.push(navCreator),
    }

    const navItemsDesktop = [
        { href: "/", text: "Home" },
        { href: "/nav/pricing", text: "Pricing"},
        { href: "/nav/contact", text: "Contact"},
        // Add more items as needed
    ];

    const desktopNavItems = [
        {
            href: "/my-recipes",
            text: "My Recipes",
            icon: BookOpenIcon,
        },
        {
            href: "/nav/profile",
            text: "Profile Settings",
            icon: UserIcon,
        },
    ]

    if(accountStatus == 'creator_complete') {
        desktopNavItems.push({
            href: "/creator/edit",
            text: "Manage Creator Page",
            icon: VideoCameraIcon,
        })
    }

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
                    <div className="inline-flex items-center space-x-4">
                        <Button buttonType="button" onClick={() => mainNavButton.function()} text={mainNavButton.name}/>
                        <DropDownMenuDesktop navItems={desktopNavItems}/> 
                    </div>

                </div>
                {!user ? (
                    <BtnLink text='Login' href='/auth/login' className="lg:hidden"/>
                ) 
                : user && userData?.isCreator == true && (!userData.tiktokAccessToken || userData?.activeToken == false) ?
                    <DropDownMenuMobile navItems={creatorItemsLoggedInMobileNoToken}/>
                : userData?.isCreator == false || !userData?.isCreator ? 
                    <DropDownMenuMobile navItems={navItemsLoggedInMobile}/>
                :
                    <DropDownMenuMobile navItems={creatorItemsLoggedInMobile}/>
                }
            </nav>
        </Container>
    </header>

    )
}