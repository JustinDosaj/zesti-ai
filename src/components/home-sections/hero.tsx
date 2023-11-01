import { Button } from "../shared/button";
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import { useAuth } from "@/pages/api/auth/auth";
import { handleSubmit } from "@/pages/api/handler/submit";
import { useState } from 'react'
import { Loader } from "../shared/loader";
import { InputResponseModal } from "../shared/modals";
import { LinkIcon } from "@heroicons/react/20/solid";
import { ToastContainer } from 'react-toastify';
import React from 'react'
import Link from "next/link";
import { Notify } from "../shared/notify";
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';

export function Hero(){

    const { user, stripeRole } = useAuth()
    const [ url, setUrl ] = useState<string>('');
    const [ isOpen , setIsOpen ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<string>('')

    async function onClick() {
        if (!user) {
            Notify('Please Login or Sign Up')
            return;
        } else {
        setIsLoading(true) 
        await handleSubmit({url, user, setMessage, stripeRole}).then((val) => {setSuccess(val)});
        setIsLoading(false)
        setUrl('')
        setIsOpen(true)
        }
    }

    return(
    <section className="relative pt-24 lg:pt-36">
        <ToastContainer/>
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
            <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                    <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                    <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                </div>
                <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">            
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pr-2">Turn</span>
                    <span className="text-black">Cooking Videos Into</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Text Recipes</span> 
                </h1>
                <Paragraph className="text-lg mt-8 text-black">
                    Transform your cooking with Zesti! Paste a YouTube link and instantly turn cooking videos into detailed, ad-free recipes. No more pausing or rewinding.
                </Paragraph>
                <div className="mt-10 w-full flex max-w-md mx-auto lg:mx-0">
                    <div className="flex sm:flex-row flex-col gap-5 w-full">
                        <form action="" method="POST" className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                        border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">

                            <LinkIcon className="text-gray-600 h-10 w-10"/>
                            <input type="text" name="web-page" value={url} placeholder="Paste a Youtube Link" className="w-full text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                            {isLoading == false ?
                            <Button buttonType="button" text="" className={"min-w-max text-white"}  
                                onClick={ async () => { await onClick() }}>                              
                                <span className="hidden sm:flex relative z-[5]">
                                    Get Recipe
                                </span>
                                <span className="flex sm:hidden relative z-[5]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>                                      
                                </span>
                            </Button>
                            :
                            <Loader/>
                            }
                        </form>
                    </div>
                </div>
                <div className="mt-2 space-x-1 text-sm">
                    <span className="text-gray-400">Try for free! (No credit card required).</span>
                </div>
                <div className="mt-4 space-x-1 text-base">
                    <span className="text-gray-700">Curious about results? Check out this</span>
                    <Link href="/demo" className="underline text-primary-main hover:text-primary-alt font-bold">example</Link>
                </div>
            </div>
            <InputResponseModal isOpen={isOpen} setIsOpen={setIsOpen} success={success} message={message}/>
        </Container>
    </section>
 )
}