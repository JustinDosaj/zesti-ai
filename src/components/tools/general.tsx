import { Paragraph } from "../shared/paragraph"
import { Container } from "../shared/container"
import { useAuth } from "@/pages/api/auth/auth";
import { InputResponseModal, LoginModal } from "../shared/modals";
import { Button } from "../shared/button";
import { Loader } from "../shared/loader";
import { Notify } from '../shared/notify';
import { ToastContainer } from 'react-toastify';
import { LightBulbIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { LinkIcon } from "@heroicons/react/24/outline"
import { handleYouTubeURLSubmit, handleTikTokURLSubmit } from "@/pages/api/handler/submit";
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';


interface ToolHeroProps {
    role: string | null,
    tokens: number,
    titleStart?: string,
    titleEnd?: string,
    description?: string
}

export function ToolHero({role, tokens, titleStart, titleEnd, description}: ToolHeroProps){

    return(
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn mt-36"}>
            <div className="relative flex flex-col items-center text-center lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                <h1 className="section-title-text-size font-bold text-heading-1 mt-6">
                    <span className="text-black">{titleStart} </span>          
                    <span className="primary-orange-text-gradient">{titleEnd}</span>
                </h1>
                <Paragraph className="text-base sm:text-lg mt-4 text-black">
                    {role == 'premium' || tokens > 0 ?
                    `${description}`
                    :
                    `No more recipes available. Try Zesti Premium free for 7 days to unlock more!`
                    }
                </Paragraph>
            </div>
        </Container>
    )
}

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
    <div className="p-4 w-full flex flex-col items-center animate-fadeIn mt-2">
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
        <InputResponseModal isOpen={isOpen} setIsOpen={setIsOpen} success={success} message={message} role={stripeRole}/>
        <LoginModal loginPrompt={loginPrompt} setLoginPrompt={setLoginPrompt} title={"Feature Requires Account"} message={"Please create an account to continue"}/>
    </div>
    )
}

export function VideoTips() {

    const features = [
        {
            name: 'Advisory:',
            description:
                'Max video allowed is 15 minutes and results can vary. (ie. Videos with no audible cooking instructions will not process properly)',
            icon: ExclamationTriangleIcon,
        },
        {
          name: 'Find a YouTube or TikTok Recipe:',
          description:
            'Find a video recipe that you want to try! (max 15 minutes)',
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
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
            <div className="mx-auto overflow-hidden bg-white mt-16">
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