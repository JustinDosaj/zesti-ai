import { LinkIcon } from "@heroicons/react/24/outline"
import { Button } from "../shared/button"
import { Loader } from "../shared/loader"
import { useAuth } from "@/pages/api/auth/auth";
import React, { useState, useEffect } from 'react'
import { handleYouTubeURLSubmit, handleTikTokURLSubmit } from "@/pages/api/handler/submit";
import { InputResponseModal, NotLoggedInModal } from "../shared/modals";
import Link from "next/link";
import { Notify } from '../shared/notify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import { LightBulbIcon } from '@heroicons/react/20/solid'

export function VideoComponent() {

    const { user, stripeRole } = useAuth()
    const [ url, setUrl ] = useState<string>('');
    const [ isOpen , setIsOpen ] = useState<boolean>(false);
    const [ loginPrompt, setLoginPrompt ] = useState<boolean>(false)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<string>('')
    const [ notify, setNotify ] = useState<boolean | null>(null)

    useEffect(() => {
        if (notify == true) {
            Notify(message)
            setNotify(false)
        }
    },[notify])

    async function onClick() {
        if (!user) {
            setLoginPrompt(true)
            return;
        } else {
        setIsLoading(true)
        
        const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        const tiktokPattern = /^(https?:\/\/)?(www\.)?tiktok\.com\/.+$/;
        
        if(youtubePattern.test(url)) {
            console.log("YouTube Link") 
            await handleYouTubeURLSubmit({url, user, setMessage, stripeRole, setNotify}).then((val) => {
                setSuccess(val)
                setIsOpen(val)
            });
        }
        else if (tiktokPattern.test(url)) {
            console.log("TikTok Link") 
            await handleTikTokURLSubmit({url, setUrl, user, setMessage, stripeRole, setNotify}).then((val) => {
                setSuccess(val)
                setIsOpen(val)
            });
        }
        else { Notify("Only tiktok and youtube videos are accepted") }

        setIsLoading(false)
        setUrl('')
        }
    }

    return(
    <div className="p-4 w-full flex flex-col items-center">
        <ToastContainer/>
        <div className="flex sm:flex-row flex-col gap-5 w-full justify-center">
            <form action="" method="POST" className="py-1 pl-6 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
            border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">

                <LinkIcon className="text-gray-600 h-10 w-10"/>
                <input type="text" name="web-page" value={url} placeholder="Paste Tiktok or YouTube Video" className="w-full text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
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
        <div className="mt-4 space-x-1 text-base text-center">
            <span className="text-gray-700">Curious about results? Check out this</span>
            <Link href="/about/demo" className="underline text-primary-main hover:text-primary-alt font-bold">example</Link>
        </div>
        <InputResponseModal isOpen={isOpen} setIsOpen={setIsOpen} success={success} message={message}/>
        <NotLoggedInModal loginPrompt={loginPrompt} setLoginPrompt={setLoginPrompt}/>
    </div>
    )
}

export function VideoHero(){

    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red">Convert</span>
                        <span className="text-black"> Video Recipe To</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Text Recipe</span> 
                    </h1>
                    <Paragraph className="text-base sm:text-lg mt-4 sm:mt-8 text-black">
                        Find a Tiktok or YouTube cooking video and simply enter the video link to convert it to a text recipe
                    </Paragraph>
                </div>
            </Container>
        </section>
    )
}

export function VideoTips() {

    const features = [
        {
          name: 'Find a YouTube Recipe:',
          description:
            'Find a YouTube Video Recipe (max 15 minutes) or YouTube short that you want to try.',
          icon: LightBulbIcon,
        },
        {
          name: 'Copy Link:',
          description: 'On mobile devices, select share then copy link. On desktop computers, copy the link from the search bar in your browser.',
          icon: LightBulbIcon,
        },
        {
          name: 'Paste Link',
          description: 'Paste the link into the Website Transformation Tool and retrieve the recipe',
          icon: LightBulbIcon,
        },
        {
            name: 'Go to Dashboard:',
            description: 'The recipe will appear in your dashboard shortly where you can begin cooking, make edits and communicate with Zesti chatbot',
            icon: LightBulbIcon,
        },
      ]
      

    return (
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
            <div className="mx-auto overflow-hidden bg-white mt-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid w-full gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
                <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                    <div className="max-w-4xl">
                    <h2 className="text-base font-semibold leading-7 text-primary-main text-center">Guide</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Get The Most Out Of Zesti</p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                        {features.map((feature: any) => (
                        <div key={feature.name} className="relative pl-9">
                            <dt className="inline font-semibold text-gray-900">
                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-primary-main" aria-hidden="true" />
                            {feature.name}
                            </dt>{' '}
                            <dd className="inline">{feature.description}</dd>
                        </div>
                        ))}
                    </dl>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </Container>
      )
}