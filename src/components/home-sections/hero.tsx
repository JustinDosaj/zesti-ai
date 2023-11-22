
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import { Button } from "../shared/button";
import Link from "next/link";
import React from 'react'
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { useAuth } from "@/pages/api/auth/auth";

export function Hero(){

    const router = useRouter()
    const { user } = useAuth()

    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pr-2">Upgrade</span>
                        <span className="text-black">Your Cooking Using</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Zesti AI Assistant</span> 
                    </h1>
                    <Paragraph className="text-lg mt-8 text-black">
                        Get your questions answered on the fly, create delicious recipes with what you have available, generate new ideas and turn cooking videos into ad-free text recipe
                    </Paragraph>
                    { !user ? 
                    <Button
                        onClick={() => router.push('/login')}
                        buttonType="button"
                        text="Try for Free"
                        className="mt-4 w-48"
                    >
                    </Button>
                    :
                    <Button
                        onClick={() => router.push('/dashboard')}
                        buttonType="button"
                        text="Go to Dashboard"
                        className="mt-4 w-48"
                    >
                    </Button>
                    }
                    <p className="text-sm mt-1 text-gray-500">No Credit Card Required.</p>
                </div>
            </Container>
        </section>
    )
}

export function Hero2(){

    const router = useRouter()
    const { user } = useAuth()

    return(
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-2 py-32 sm:py-40 lg:px-8 sm:mt-12">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1 ">
                <div className="flex w-fit mx-auto sm:inline-flex sm:justify-left items-center border border-gray-300 rounded-3xl p-2 space-x-1 ">
                    <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                    <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                </div>
                <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6 grid text-center sm:text-left">          
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pr-2">Upgrade</span>
                    <span className="text-black">Your Cooking Using</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Zesti AI Assistant</span> 
                </h1>
                <Paragraph className="text-base sm:text-lg mt-8 text-black text-center sm:text-left">
                    Create AI generated recipes, automatically save recipes from YouTube & Tiktok, and get cooking questions answered instantly!
                </Paragraph>
              { !user ?
                <div className="mt-10 grid sm:flex items-center gap-x-6 justify-center sm:justify-start">
                    <Button
                        onClick={() => router.push('/login')}
                        buttonType="button"
                        text="Try for Free"
                        className=""
                    >
                    </Button>
                    <p className="text-xs font-semibold leading-6 text-gray-600 text-center sm:text-left">
                        No Credit Card Required.
                    </p>
                </div>
                :
                <div className="mt-10 flex items-center gap-x-6 justify-center sm:justify-start">
                    <Button
                        onClick={() => router.push('/dashboard')}
                        buttonType="button"
                        text="Go to Dashboard"
                        className=""
                    >
                    </Button>
                </div>
                }
            </div>
            <Image
                src="/images/no-bg-iso.png"
                alt="Cooking Recipes Screenshot"
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                width={500} height={500}
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </Container>
    )
}