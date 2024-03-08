"use client;"
import { Container } from "../shared/container"
import { Navitem } from "../shared/navitem"
import { useAuth } from "@/pages/api/auth/auth"
import { Button } from "../shared/button"
import Link from "next/link"
import Image from "next/image"
import { BookOpenIcon, HomeIcon, PaperAirplaneIcon, WalletIcon, UserIcon, PencilSquareIcon } from "@heroicons/react/20/solid"
import { DropDownMenuDesktop, DropDownMenuMobile } from "./menus"
import useAccountStatus from "@/hooks/useAccountStatus"
import { useRouter } from "next/router"


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
        href:"/about/pricing",
        text:"Pricing",
        icon: WalletIcon,
    },
    {
        href:"/about/contact",
        text: "Contact",
        icon: PaperAirplaneIcon,
    },
    {
        href: "/account",
        text: "Account Settings",
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
        text: "Creator Page Settings",
        icon: PencilSquareIcon, 
    },
    {
        href: "/account",
        text: "Account Settings",
        icon: UserIcon,
    },
    {
        href:"/about/pricing",
        text:"Pricing",
        icon: WalletIcon,
    },
    {
        href:"/about/contact",
        text: "Contact",
        icon: PaperAirplaneIcon,
    },
]

export function Navbar() {
    
    const { user, userData } = useAuth();
    const { accountStatus, accountStatusMessage, loginWithTikTok, navCreator } = useAccountStatus()
    const router = useRouter()

    const mainNavButton = {
        name: userData?.tiktokAccessToken == null && accountStatus == 'creator' ?  'Connect TikTok' : accountStatusMessage,
        function:  userData?.tiktokAccessToken == null && accountStatus == 'creator' ? () => loginWithTikTok()
                    : () => router.push(navCreator),
    }

    const navItemsDesktop = [
        { href: "/", text: "Home" },
        { href: "/about/pricing", text: "Pricing"},
        { href: "/about/contact", text: "Contact"},
        // Add more items as needed
    ];

    const desktopNavItems = [
        {
            href: "/my-recipes",
            text: "My Recipes",
            icon: BookOpenIcon,
        },
        {
            href: "/account",
            text: "Account Settings",
            icon: UserIcon,
        },
    ]

    if(accountStatus == 'creator') {
        desktopNavItems.push({
            href: "/creator/edit",
            text: "Edit Your Page",
            icon: PencilSquareIcon,
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
                    {/* Main Orange Button for Primary navigation based on accountStatus: base_user, creator_connect_tiktok, creator_connect_affiliate, creator_generate_page, creator*/}
                    <div className="inline-flex items-center space-x-4">
                        <Button buttonType="button" isLink={false} onClick={() => mainNavButton.function()} text={mainNavButton.name}/>
                        <DropDownMenuDesktop navItems={desktopNavItems} isHidden={!user}/> 
                    </div>

                </div>
                {!user ? 
                    <Button isLink={true} text='Login' href='/auth/login' className="lg:hidden"/> 
                : accountStatus == 'creator' ?
                    <DropDownMenuMobile navItems={creatorItemsLoggedInMobile}/>
                : 
                    <DropDownMenuMobile navItems={navItemsLoggedInMobile}/>
                }
            </nav>
        </Container>
    </header>

    )
}