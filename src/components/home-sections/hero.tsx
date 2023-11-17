
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import React from 'react'
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';

export function Hero(){

    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pr-2">Upgrade</span>
                        <span className="text-black">Your Cooking Using</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Zesti AI Assistant</span> 
                    </h1>
                    <Paragraph className="text-lg mt-8 text-black">
                        Get your questions answered on the fly, create delicious recipes with what you have available, generate new ideas and turn cooking videos into ad-free text recipe
                    </Paragraph>
                </div>
            </Container>
        </section>
    )
}