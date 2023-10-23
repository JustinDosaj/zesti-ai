"use client;"

import { Container } from "../shared/container"
import { Paragraph } from "../shared/paragraph"
import { FooterNav } from "../shared/footernav"
import { GroupFooterNav } from "../blocks/groupfooternav"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/pages/api/auth/auth"

const loggedInFooterNav = [
    {
        itemText:"Home",
        itemLink:"/"
    },
    {
        itemText:"Pricing",
        itemLink:"/pricing"
    },
    {
        itemText:"Dashboard",
        itemLink:"/dashboard"
    },
    {
        itemText:"Profile",
        itemLink:"/profile"
    },
    
]

const loggedOutFooterNav =[
    {
        itemText:"Home",
        itemLink:"/"
    },
    {
        itemText:"Pricing",
        itemLink:"/pricing"
    },
]

const footerSupport = [
    {
        itemText:"Contact",
        itemLink:"/contact"
    }
]

var year = new Date().getFullYear()

export function Footer() {

    const { user } = useAuth();

    return(
    <>
        <footer className="relative  bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900 pt-28 p-4 md:p-0">
            <div className="invisible sm:visible absolute right-0 top-0 h-full w-full flex justify-end">
                <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
                    <span
                    className="absolute w-16 h-16 -top-1 -right-1 bg-primaryteal rounded-md rotate-45"
                    ></span>
                    <span
                    className="absolute w-16 h-16 -bottom-1 -right-1 bg-primarypink rounded-md rotate-45"
                    ></span>
                    <span
                    className="absolute w-16 h-16 -bottom-1 -left-1 bg-primary rounded-md rotate-45"
                    ></span>
                </div>
            </div>
            <div className="invisible sm:visible absolute left-0 bottom-0 h-full w-full flex items-end">
                <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
                    <span
                    className="absolute w-16 h-16 -top-1 -right-1 bg-primary rounded-md rotate-45"
                    ></span>
                    <span
                    className="absolute w-16 h-16 -bottom-1 -right-1 bg-primaryteal rounded-md rotate-45"
                    ></span>
                    <span
                    className="absolute w-16 h-16 -bottom-1 -left-1 bg-primarypink rounded-md rotate-45"
                    ></span>
                </div>
            </div>
            <Container className="pb-8 relative overflow-hidden">
                
                <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 blur-2xl opacity-20 w-24 h-16 sm:w-48 sm:h-36 rounded-full rotate-12 skew-x-6 bg-primary"></span>
                <div className="grid grid-cols-2 lg:grid-cols-3 lg:items-stretch gap-8 lg:gap-24 relative mt-0 sm:mt-24">
                    <div className="col-span-2 lg:col-span-1 h-auto flex flex-col">
                        <div className="h-full">
                            <Link href="/" className="relative flex items-center gap-3">
                                <div className="relative w-16 h-16 overflow-hidden flex rounded-xl">
                                <Image src="/images/Zesti-Logo.png" alt="Zesti AI Recipe Helper Logo" width={70} height={30}/>
                                </div>
                                <div className="inline-flex text-2xl font-semibold text-heading-1">
                                    Zesti.ai
                                </div>
                            </Link>
                            <Paragraph className={"mt-8"}>
                                Stop rewatching videos over and over to get the recipe. Just input the link, and get cooking!
                            </Paragraph>
                        </div>
                    </div>
                    <GroupFooterNav>
                        <FooterNav title={"Navigation"} navItems={user ? loggedInFooterNav: loggedOutFooterNav}/>
                    </GroupFooterNav>
                    <GroupFooterNav>
                        <FooterNav title={"Support"} navItems={footerSupport}/>
                    </GroupFooterNav>
                </div>
            </Container>
            <div className="border-t border-gray-300 py-2 relative">
                <Container>
                    <div className="flex justify-center items-center gap-6 md:text-lg text-heading-3 text-gray-400">
                        <div>
                            &copy; 
                            <span id="year">
                                {year}
                            </span> Vurge LLC. All right reserved
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    </>
    )
}