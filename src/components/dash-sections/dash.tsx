import { Paragraph } from "../shared/paragraph"
import { Container } from "../shared/container"
import { SparklesIcon, VideoCameraIcon, LinkIcon, LockClosedIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'
import { useAuth } from "@/pages/api/auth/auth"
import React from "react"
import Link from "next/link"

function classNames(...classes: (string | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

export function DashboardPageTitle() {
    return(
        <section className="relative pt-32">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
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
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
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
      <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">Tools</h3>
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

interface Recipe {
    id: string;
    complete: boolean;
    failed?: boolean;
    // other fields
  }

export function DashboardRecipeTitle() {
    return(
      <Container className="relative sm:flex justify-center items-center lg:flex-wrap gap-10 lg:gap-4 w-full animate-fadeIn">
        <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">Recent Recipes</h3>
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

export function RecipeBookTitle() {
    return(
        <Container className="pt-32 animate-fadeIn">
            <div className="flex lg:relative justify-center items-center lg:flex-wrap gap-10 lg:gap-4 w-full">
                <div className="inline-flex items-center">
                    <h3 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight font-bold text-heading-1 text-black text-center">Recipe Book</h3>
                    <div className="absolute left-0">
                        <Link href="/dashboard" passHref className="hover:bg-primary-dark text-gray-700 hover:text-gray-500 font-semibold py-2 px-4 lg:px-0">
                            <span className="inline-flex items-center mt-2 gap-x-1.5 px-0 sm:px-4 md:px-8 lg:px-0">
                                <ChevronDoubleLeftIcon className="h-7 w-7 lg:h-5 lg:w-5"/>
                                <span className="hidden lg:block underline">Back to Dashboard</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <Paragraph className="mt-4 text-center text-gray-600">
                View all the recipes you have saved and created with Zesti
            </Paragraph>
        </Container>
    )
}

interface UsageProps {
    data: Recipe[];
    tokens: number;
}

export function Usage({data, tokens}: UsageProps) {

    const { stripeRole } = useAuth()

    return(
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
            <div className="p-4 py-10 sm:p-8 sm:pl-16 sm:pr-16 w-full bg-white rounded-3xl shadow-lg border-gray-300 border flex justify-between  space-x-1.5">
                <div className="w-1/3 flex flex-col items-center text-center">
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className="text-xl sm:text-3xl font-semibold text-black">{tokens ? tokens : '0'}</p>
                </div>
                <div className="w-1/3 flex flex-col items-center text-center">
                    <p className="text-sm text-gray-600">Total Recipes</p>
                    <p className="text-xl sm:text-3xl font-semibold text-black">{data.length}</p>

                </div>
                <div className="w-1/3 flex flex-col items-center text-center space-y-1">
                    <p className="text-sm text-gray-600">Status</p>
                    <Link href={"/profile"} className="bg-color-alt-green text-white text-sm sm:text-lg font-semibold px-2.5 py-0.5 rounded-3xl">
                        {stripeRole == 'premium' ? 'Premium' : 'Base'}
                    </Link>
                </div>
            </div>
        </Container>
    )
}
  