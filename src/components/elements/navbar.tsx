"use client;"
import { Container } from "../shared/container"
import { Navitem } from "../shared/navitem"
import { useAuth } from "@/pages/api/auth/auth"
import { Button } from "../shared/button"
import Link from "next/link"
import Image from "next/image"
import { BookOpenIcon, HomeIcon, PaperAirplaneIcon, WalletIcon, UserIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { DropDownMenuDesktop, DropDownMenuMobile } from "./menus"
import { useRouter } from "next/router"


export function Navbar() {
    
    const { user, login } = useAuth();
    const router = useRouter()

    const navItemsDesktop = [
        { href: "/", text: "Home" },
        { href: "/search", text: "Search"},
        { href: "/about/pricing", text: "Pricing"},
        { href: "/about/contact", text: "Contact"},
        // Add more items as needed
    ];

    const desktopDropDownItems = [
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

    const navItemsMobileLoggedOut = [
        {
            href:"/",
            text:"Home",
            icon: HomeIcon,
        },
        {
            href: "/search",
            text: "Search",
            icon: MagnifyingGlassIcon,
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
            href: "/search",
            text: "Search",
            icon: MagnifyingGlassIcon,
        },
        {
            href: "/account",
            text: "Account Settings",
            icon: UserIcon,
        },
    ]

    return(

    <header className="absolute inset-x-0 top-0 z-45 py-6 w-screen">
        <Container>
            <nav className="flex justify-between items-center">
                {/* Logo & Text -- Turns visible on screen size large */}
                <div className="hidden lg:flex justify-start w-1/3 ">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-14 h-14 overflow-hidden flex rounded-xl">
                            <img src="/images/Zesti-Logo.png" alt="Zesti Artificial Intelligence Recipe Helper Logo" width={60} height={30}/>
                        </div>
                        <div className="hidden lg:inline-flex text-2xl font-semibold text-heading-1 text-black">
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

                {/* Desktop menu only visible on large screens or bigger */}
                <div className="hidden lg:flex justify-end w-1/3">
                    <div className="inline-flex items-center space-x-4">
                        {user ? 
                            <Button buttonType="button" isLink={false} onClick={() => router.push('/my-recipes')} text={"My Recipes"}/>
                        :
                            <Button buttonType="button" isLink={false} onClick={login} text={"Login"}/>
                        }
                        <DropDownMenuDesktop navItems={desktopDropDownItems} isHidden={!user}/> 
                    </div>

                </div>
                {!user ?
                    <div className="flex lg:hidden justify-between items-center w-full"> 
                        <DropDownMenuMobile navItems={navItemsMobileLoggedOut}/> 
                        <Button buttonType="button" isLink={false} onClick={login} text={"Login"}/>
                    </div>
                : 
                    <div className="flex lg:hidden justify-between items-center w-full"> 
                        <DropDownMenuMobile navItems={navItemsLoggedInMobile}/> 
                        <Button buttonType="button" isLink={false} onClick={() => router.push('/my-recipes')} text={"My Recipes"}/>
                    </div>
                }
            </nav>
        </Container>
    </header>

    )
}