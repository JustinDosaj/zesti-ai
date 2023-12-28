import { Container } from "../shared/container"
import { SparklesIcon, VideoCameraIcon, LinkIcon, ChevronDoubleRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from "../shared/notify"
import React, { useState, useEffect } from "react"
import Link from "next/link"

function classNames(...classes: (string | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

export function Tools() {

    const stats = [
        { 
            id: 1, 
            name: 'AI Recipe Generator', 
            icon: SparklesIcon, 
            colorType: 'green', 
            href: '/tools/generator', 
            desc: "Create new recipes just for you" },
        { 
            id: 2, 
            name: 'Save Cooking Video', 
            icon: VideoCameraIcon, 
            colorType: 'red', 
            href: '/tools/video', 
            desc: "Save recipes from YouTube or TikTok" },
        { 
            id: 3, 
            name: 'Website Recipe', 
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

export function DashboardRecipeTitle() {
    return(
    <Container className="relative sm:flex justify-center items-center lg:flex-wrap gap-10 lg:gap-4 w-full animate-fadeIn">
        <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">Recent Saved Recipes</h3>
        <div className="grid justify-center pl-3 sm:absolute sm:right-0">
          <Link href="/dashboard/recipebook" passHref className="hover:bg-primary-dark text-gray-700 hover:text-gray-500 font-semibold py-2 px-4">
            <span className="inline-flex items-center gap-x-1.5">
              <span className="underline">View All Recipes</span>
              <ChevronDoubleRightIcon className="h-5 w-5"/>
            </span>
          </Link>
        </div>
    </Container>
    )
}

export function Search() {
    
    const { user, stripeRole } = useAuth()
    const [ url, setUrl ] = useState<string>('');
    const [ message, setMessage ] = useState<string>('')
    const [ notify, setNotify ] = useState<boolean | null>(null)

    useEffect(() => {
        if (notify == true) {
            Notify(message)
            setNotify(false)
        }
    },[notify])

    async function onClick() {

    }

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
        <div className="w-full flex-col ">
            <dl className="grid grid-cols-1 gap-10">
            <div className="w-full flex flex-col items-center animate-fadeIn ">
                <div className="flex sm:flex-row flex-col gap-5">
                    <form action="" method="POST" className="py-1 pl-6 pr-6 flex  gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                    border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                        <MagnifyingGlassIcon className="text-gray-600 h-6 w-6"/>
                        <input type="text" name="web-page" value={url} placeholder="Search TikTok Username or Recipe" className="text-left w-64 lg:w-96 text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                    </form>
                </div>
            </div>
            </dl>
        </div>
    </Container>
    )
}
  