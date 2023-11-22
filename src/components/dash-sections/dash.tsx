import { Paragraph } from "../shared/paragraph"
import { Container } from "../shared/container"
import { SparklesIcon, VideoCameraIcon, LinkIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useAuth } from "@/pages/api/auth/auth"
import React, { useEffect, useState } from "react"
import Link from "next/link"

function classNames(...classes: (string | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

export function RecipePageTitle() {
    return(
        <section className="relative pt-32">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr to-primary from-primaryteal absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight
                    font-bold text-heading-1 text-black">
                    Dashboard
                    </h1>
                    <Paragraph className="mt-4 text-gray-600">
                         Access all your saved recipes, all the tools Zesti has available and your account usage
                    </Paragraph>
                </div>
            </Container>
        </section>
        )
}

export function AddRecipePageTitle() {
    return(
        <section className="relative pt-32">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr to-primary from-primaryteal absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight
                    font-bold text-heading-1 text-black">
                    Add Recipe
                    </h1>
                    <Paragraph className="mt-4 text-gray-600">
                         Create, save & edit recipes that are created using Zesti AI or are found on websites and videos.
                    </Paragraph>
                </div>
            </Container>
        </section>
        )
}

export function Tools() {

    const { stripeRole } = useAuth()

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
            name: 'Social Media Recipe', 
            icon: stripeRole == 'premium' ? VideoCameraIcon : LockClosedIcon, 
            colorType: 'red', 
            href: '/tools/video', 
            desc: "Save recipes from YouTube or TikTok" },
        { 
            id: 3, 
            name: 'Website Recipe', 
            icon: stripeRole == 'premium' ? LinkIcon : LockClosedIcon, 
            colorType: 'yellow', 
            href: '/tools/website', 
            desc: "Remove clutter from recipe websites"
                },
      ]

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
    <div className="w-full">
      <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">Tools</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
        <div key={item.id}>
            <Link href={item.href} className="">
                <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow border border-gray-200 sm:px-6 sm:pt-6 hover:bg-gray-200 hover:ease-in hover:duration-100"
                >
                    <dt>
                    <div className={classNames(item.colorType == 'green' ? 'bg-color-alt-green bg-opacity-80' : item.colorType == 'yellow' ? 'bg-yellow-400' : item.colorType == 'red' ? 'bg-red-400' : 'bg-color-alt-green bg-opacity-80', `absolute rounded-md p-3`)}>
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-xl font-semibold text-black">{item.name}</p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-base text-gray-900">{item.desc}</p>
                    <div className="flex justify-center absolute inset-x-0 bottom-0 bg-gray-150 px-4 py-4 sm:px-6">
                        <div className="flex justify-center font-medium cursor-pointer text-white bg-black w-full text-sm p-2 rounded-3xl hover:bg-gray-700 hover:ease-in hover:duration-100">
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

interface Recipe {
    id: string;
    complete: boolean;
    failed?: boolean;
    // other fields
  }

interface UsageProps {
    data: Recipe[];
    tokens: number;
    usage: number;
  }

export function Usage({data, tokens, usage}: UsageProps) {

    const { user, stripeRole } = useAuth()
    
    const stats = [
        { name: 'Recipes Remaining', value: `${stripeRole !== 'premium' ? tokens : usage}` },
        { name: 'Saved Recipes', value: `${stripeRole !== 'premium' ? `${data.length} / 5` : `${data.length} / unlimited`}`},
        { name: 'Account Status', value: `${stripeRole ? stripeRole : 'Free'}`},
      ]

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
        <div className="w-full rounded-2xl">
            <dl className="mx-auto grid grid-cols-1 gap-px lg:grid-cols-3 border rounded-xl bg-gray-100">
                {stats.map((stat) => (
                    <div
                    key={stat.name}
                    className="flex flex-wrap items-baseline gap-x-4 gap-y-2 px-4 py-4 sm:px-6 xl:px-8 justify-center"
                    >
                    <dt className="text-sm font-medium leading-6 text-gray-500 text-center">{stat.name}</dt>
                    <dd className="w-full flex-none text-xl font-medium leading-4 tracking-tight text-gray-900 text-center">
                        {stat.value}
                    </dd>
                    <Link href={stripeRole == 'premium' ? `/profile` : `/pricing`}
                        className={classNames(stat.name == 'Account Status' ? 'block' : 'hidden', 'text-sm underline text-primary-main hover:text-primary-alt')}>
                            {stripeRole == 'premium' ? `Manage Account` : `Upgrade Account`}
                    </Link>
                    </div>
                ))}
            </dl>
        </div>
    </Container>
)}