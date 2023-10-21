import { Container } from "../shared/container"
import { Navitem } from "../shared/navitem"
import { Button } from "../shared/button"
import { useAuth } from "@/pages/api/auth/auth"
import { getUserData } from "@/pages/api/firebase/functions"
import { useState, useEffect } from "react"
import { TokenAmount } from "../shared/tokenAmt"
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const navItems = [
    {
        href:"/",
        text:"Home",
    },
    {
        href:"/pricing",
        text:"Pricing",
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
        href: "/dashboard",
        text: "Dashboard",
        isDashboard: true,
    },
    {
        href: "/profile",
        text: "Profile",
    },
]

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
    }


export function Navbar({_user}: any) {
    
    const { user, login } = useAuth();
    const [tokens, setTokens] = useState<number>(0)

    useEffect(() => {
        UpdateUserData()
    },[tokens, user])

    async function UpdateUserData() {
        const response = await getUserData(user?.uid)
        setTokens(response ? response.tokens : 0)
    }

    return(
    <>
    <header className="absolute inset-x-0 top-0 z-50 py-6">
        <Container>
            <nav className="w-full flex justify-between relative">
                <div className="min-w-max inline-flex relative">
                    <a href="/" className="relative flex items-center gap-3">
                        <div className="relative w-8 h-8 overflow-hidden flex rounded-xl">
                            <img src="/logos/gradient-logo-only-transparent.png"/>
                        </div>
                        <div className="inline-flex text-lg font-semibold text-heading-1">
                            Zesti.ai
                        </div>
                    </a>
                </div>
                <div data-nav-overlay aria-hidden="true" className="fixed hidden inset-0 lg:!hidden bg-box-bg bg-opacity-50 backdrop-filter backdrop-blur-xl"></div>
                <div data-navbar className="flex h-0 overflow-hidden lg:!h-auto lg:scale-y-100 duration-300 ease-linear flex-col gap-y-6 gap-x-4 lg:flex-row w-full lg:justify-between lg:items-center absolute lg:relative top-full lg:top-0 bg-body lg:bg-transparent border-x border-x-box-border lg:border-x-0">
                    <ul className="border-t border-box-border lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-lg text-heading-2 w-full lg:justify-center lg:items-center">
                    {
                        user !== null ? 
                        navItemsLoggedIn.map(item=> {
                            return <Navitem {...item}/>
                        })
                        :
                        navItems.map(item=>{
                            return <Navitem {...item}/>
                        })
                    }
                    </ul>
                    <div className="lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b border-box-bg lg:border-0 px-6 lg:px-0">
                        { user ?
                        <div className="inline-flex">
                            <TokenAmount tokens={tokens}/>
                        </div>
                        :
                        <Button buttonType="button" text='Login' className="flex justify-center w-full sm:w-max" onClick={() => login()}/>
                        }
                    </div>
                </div>
                <Menu as="div" className="relative inline-block text-left lg:invisible">
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
                            <Menu.Item>
                            {({ active }) => (
                                <p className='block px-4 py-2 text-sm' >
                                <TokenAmount className="w-full grid grid-cols-6" tokens={tokens}/>
                                </p>
                            )}
                            </Menu.Item>
                            {
                                user !== null ? 
                                navItemsLoggedIn.map((item)=> (
                                    <Menu.Item>
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
                                :
                                navItems.map(item=>{
                                    return <Navitem {...item}/>
                                })
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