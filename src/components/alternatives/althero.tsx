
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import React from 'react'
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { BtnLink } from "../shared/btnlink";

interface HeroProps {
    name: string,
}

export function AltHero({name}: HeroProps){
    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-black">The Best</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> {name} Alternative </span> 
                        <span className="text-black">for AI Powered Cooking Assistance</span>
                    </h1>
                    <Paragraph className="text-lg mt-8 text-black">
                        Instantly save YouTube & Tiktok recipes, use ai to create delicious recipes, and get your cooking questions answered immediately without leaving the recipe!
                    </Paragraph>
                    <BtnLink text="Try Zesti for Free" href="/login" className="align-middle mt-4 text-lg"/>
                </div>
            </Container>
        </section>
    )
}