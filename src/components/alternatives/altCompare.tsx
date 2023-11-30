
import { Container } from "../shared/container";
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { BtnLink } from "../shared/button";

interface CompetitorApp {
    name: string;
    priceMonthly: string;
    videoToRecipe: boolean;
    urlToRecipe: boolean;
    aiGeneratedRecipe: boolean;
    chatAssistance: boolean;
}

// Your Zesti app data
const zestiApp = {
    name: 'Zesti.ai',
    priceMonthly: 'Free-to-use', // Replace with your app's monthly price
    videoToRecipe: true,
    urlToRecipe: true,
    aiGeneratedRecipe: true,
    chatAssistance: true,
};


export function AltCompare({name, priceMonthly, videoToRecipe, urlToRecipe, aiGeneratedRecipe, chatAssistance}: CompetitorApp){
    
    return(

            <Container className={"gap-10 lg:gap-12 pt-8 pb-24"}>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 p-8 md:p-16">
                    <h1 className="text-3xl/tight sm:text-3xl/tight md:text-4xl/tight xl:text-5xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-black">Comparing</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Zesti vs {name}</span> 
                    </h1>
                </div>
                <div className="bg-white mt-4">
                    <div className="mx-auto  ">
                        <div className=" mx-auto">
                            <table className="w-full table-fixed text-left xs:text-center border-separate border-spacing-y-3 border rounded-3xl p-1 xs:p-4">
                                <thead>
                                    <tr>
                                    <th className="w-1/3 px-4 py-2 text-sm font-bold text-gray-900">Features</th>
                                    <th className="w-1/3 px-8 xs:px-6 py-2 text-sm sm:text-xl font-bold text-primary-main">{zestiApp.name}</th>
                                    <th className="w-1/3 px-8 xs:px-6 text-sm sm:text-xl font-bold text-gray-900">{name}</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm sm:text-base text-gray-900">
                                    <tr>
                                        <td className="px-4 py-2 border-r border-gray-200">Monthly Price</td>
                                        <td className="px-8 xs:px-6 py-2 ">{zestiApp.priceMonthly}</td>
                                        <td className="px-8 xs:px-6 py-2">{priceMonthly}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 capitalize border-r border-gray-200">{"AI Recipe Generator"}</td>
                                        <td className="px-4 py-2">{<CheckIcon className="mx-auto h-5 w-5 text-color-alt-green" aria-hidden="true" />}</td>
                                        <td className="px-4 py-2">{aiGeneratedRecipe ? <CheckIcon className="mx-auto h-5 w-5 text-color-alt-green" aria-hidden="true" /> : <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 capitalize border-r border-gray-200">{"Save Tiktok & YouTube Recipes"}</td>
                                        <td className="px-4 py-2">{<CheckIcon className="mx-auto h-5 w-5 text-color-alt-green" aria-hidden="true" />}</td>
                                        <td className="px-4 py-2">{urlToRecipe ? <CheckIcon className="mx-auto h-5 w-5 text-color-alt-green" aria-hidden="true" /> : <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 capitalize border-r border-gray-200">{"AI Chat Assistant"}</td>
                                        <td className="px-4 py-2">{<CheckIcon className="mx-auto h-5 w-5 text-color-alt-green" aria-hidden="true" />}</td>
                                        <td className="px-4 py-2">{chatAssistance ? <CheckIcon className="mx-auto h-5 w-5 text-color-alt-green" aria-hidden="true" /> : <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 capitalize border-r border-gray-200">{"Save Web Recipe"}</td>
                                        <td className="px-4 py-2">{<CheckIcon className="mx-auto h-5 w-5 text-color-alt-green" aria-hidden="true" />}</td>
                                        <td className="px-4 py-2">{videoToRecipe? <CheckIcon className="mx-auto h-5 w-5 text-color-alt-green" aria-hidden="true" /> : <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    <div className="grid justify-center mt-4">
                        <BtnLink text="Try Zesti for Free" href="/login" className="align-middle mt-4 text-lg"/>
                    </div>
            </Container>
   
    )
}