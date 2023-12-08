
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import React from 'react'
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { BtnLink } from "../shared/button";

export function NewUserHero(){
    return(

        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 py-24 pt-36"}>
            <div className="pb-6 space-y-4 relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-3 border-2 border-primary-main rounded-3xl shadow-lg">
                <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                    <span className="text-black">Welcome to</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Zesti.ai</span>
                </h1>
                <Paragraph className="text-lg mt-8 text-black">
                    You are all set to start creating recipes or saving your favorite cooking videos, just click below to get started!
                </Paragraph>
                
                <div className="flex items-center justify-center gap-x-6 mt-12">
                    <BtnLink text="Get Started!" href="/dashboard" className="align-middle text-sm xs:text-base pr-3 pl-3 sm:pr-6 sm:pl-6"/>
                    <Link href="/about/subscription/premium" className="text-xs sm:text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">
                    Try Premium Free <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </Container>
  
    )
}

export function WelcomePricingTitle(){
    return(

        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 my-auto"}>
            <div className="pb-6 space-y-4 relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                <h1 className="text-3xl/tight sm:text-3xl/tight md:text-4xl/tight xl:text-5xl/tight font-bold text-heading-1 mt-6">          
                    <span className="text-black">Check out</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Zesti Premium!</span>
                </h1>
                <Paragraph className="text-lg mt-8 text-black">
                    Join hundreds of users creating delicious recipes with Zesti Premium!
                </Paragraph>
            </div>
        </Container>
  
    )
}

export function PremiumUserHero(){
    return(

        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 my-auto"}>
            <div className="pb-6 space-y-4 relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-3 border-2 border-primary-main rounded-3xl shadow-lg">
                <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                    <span className="text-black">Thank you for joining</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Zesti Premium!</span>
                </h1>
                <Paragraph className="text-lg mt-8 text-black">
                    Your account is upraded to premium and is ready to go! Head to your dashboard to start cooking up something delicious!
                </Paragraph>
                <div className="flex items-center justify-center gap-x-6 mt-12">
                    <BtnLink text="Go to Dashboard" href="/dashboard" className="align-middle text-sm xs:text-base pr-3 pl-3 sm:pr-6 sm:pl-6"/>
                </div>
            </div>
        </Container>
  
    )
}