import { Paragraph } from "../shared/paragraph"
import { Container } from "../shared/container"
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from "../shared/notify"
import React, { useState, useEffect } from "react"

function classNames(...classes: (string | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

export function CreatorPageTitle() {
    return(
        <section className="pt-32">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
                <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr to-primary from-primaryteal absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight
                    font-bold text-heading-1 text-black">
                    Creator {/* Add username, profile img, etc. */}
                    </h1>
                    <Paragraph className="mt-4 text-gray-600">
                         Access all your saved recipes, and all the tools Zesti has available and your account usage
                    </Paragraph>
                </div>
            </Container>
        </section>
        )
}

export function CreatorSearch() {
    
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
                <div className=" w-full flex flex-col items-center animate-fadeIn ">
                    <div className="flex sm:flex-row flex-col gap-5">
                        <form action="" method="POST" className="py-1 pl-6 pr-6 flex  gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                        border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                            <MagnifyingGlassIcon className="text-gray-600 h-6 w-6"/>
                            {/* ADD DYNAMIC USERNAME TO PLACEHOLDER */}
                            <input type="text" name="web-page" value={url} placeholder="Search recipes from <username>" className="text-left w-64 lg:w-96 text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                        </form>
                    </div>
                </div>
            </dl>
        </div>
    </Container>
    )
}

export function CreatorRecipeTitle() {
    return(
      <Container className="relative sm:flex justify-center items-center lg:flex-wrap gap-10 lg:gap-4 w-full animate-fadeIn">
        <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">{"<USERNAME> Recently Uploaded Recipes"}</h3>
    </Container>
    )
}