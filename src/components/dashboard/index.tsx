import { Container } from "../shared/container"
import { ChevronDoubleRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from "../shared/notify"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { InlineBtnLink } from "../shared/button"

function classNames(...classes: (string | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
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
        <div className="w-full flex-col">
            <dl className="grid grid-cols-1 gap-10">
            <div className="w-full flex flex-col items-center animate-fadeIn ">
                <div className="flex sm:flex-row flex-col gap-5">
                    <form action="" method="POST" className="py-1 pl-6 pr-6 flex  gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                    border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                        <MagnifyingGlassIcon className="text-gray-600 h-6 w-6"/>
                        <input type="text" name="web-page" value={url} placeholder="Search TikTok Username or Recipe" className="text-left w-64 lg:w-96 text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                    </form>
                </div>
                <div className="text-gray-500 mt-4">
                    <span>Can&apos;t find a recipe? </span>
                    <InlineBtnLink href={'/tools/video'} text="Click here"/>
                    <span> to save any TikTok recipe</span>
                </div>
            </div>
            </dl>
        </div>
    </Container>
    )
}
  