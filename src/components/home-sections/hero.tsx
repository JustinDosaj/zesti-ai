
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import { Button } from "../shared/button";
import Link from "next/link";
import React from 'react'
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

export function Hero(){

    const router = useRouter()

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
                    <Button
                        onClick={() => router.push('/login')}
                        buttonType="button"
                        text="Try for Free"
                        className="mt-4 w-48"
                    >
                    </Button>
                    <p className="text-sm mt-1 text-gray-500">No Credit Card Required.</p>
                </div>
            </Container>
        </section>
    )
}

export function Hero2(){

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-main/5">
                <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
                <div className="px-6 lg:px-0 lg:pt-4">
                    <div className="mx-auto max-w-2xl">
                    <div className="max-w-lg">
                        <div className="grid justify-center sm:justify-start mt-24 sm:mt-32 lg:mt-16">
                            <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                                <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                                <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                            </div>
                        </div>
                        <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6 text-center sm:text-left">          
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pr-2">Upgrade</span>
                            <span className="text-black">Your Cooking Using</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Zesti AI Assistant</span> 
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-700 text-center sm:text-left">
                            Get your questions answered on the fly, create delicious recipes with what you have available, generate new ideas and turn cooking videos into ad-free text recipe
                        </p>
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 items-center justify-center sm:justify-start">
                            <Button
                                onClick={''}
                                buttonType="button"
                                text="Try for Free"
                                className=""
                            >
                            </Button>
                            <p className="text-xs font-semibold leading-6 text-gray-600 text-center sm:text-left">
                                No Credit Card Required.
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
                    <div
                    className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
                    aria-hidden="true"
                    />
                    <div className="shadow-lg md:rounded-3xl">
                    <div className="bg-primary-main [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                        <div
                        className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                        aria-hidden="true"
                        />
                        <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                        <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                            <div className="w-fit overflow-hidden rounded-tl-xl">
                                <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                                <Image
                                    src="/images/video-image.jpg"
                                    alt="Cooking Recipes Screenshot"
                                    className="bg-transparent rounded-xl w-full max-w-none rounded-tl-xl"
                                    width={400} height={400}
                                />
                                </div>
                            <div className="px-6 pb-10 pt-6">{/* Your code example */}</div>
                            </div>
                        </div>
                        <div
                            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                            aria-hidden="true"
                        />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
            </div>
            </div>
    </Container>
    )
}