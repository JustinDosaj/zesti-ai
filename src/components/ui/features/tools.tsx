import { Container } from "@/components/shared/container";
import { LinkIcon, LightBulbIcon, ExclamationTriangleIcon, CheckIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@/pages/api/auth/auth";
import { ResponseModal } from "@/components/shared/modals";
import { Button } from "@/components/shared/button";
import { Loader } from "@/components/shared/loader";
import { handleTikTokURLSubmit } from "@/pages/api/handler/submit";
import React, { useState, useEffect } from 'react';
import { Notify } from "@/components/shared/notify";
import { SharedHomeSectionTitle } from "@/components/shared/title";
import { useRouter } from "next/router";


interface ToolHeroProps {
    role: string | null,
    tokens: number,
    titleStart?: string,
    titleEnd?: string,
    description?: string
}


export function ToolHero({role, tokens, titleStart, titleEnd, description}: ToolHeroProps){

    return(
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn mt-48"}>
            <div className="relative flex flex-col items-center text-center lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                <SharedHomeSectionTitle titleBlack={titleStart} titleOrange={titleEnd} desc={role == 'premium' || tokens > 0 ? `${description}` : `No more recipes available. Try Zesti Premiium free for 7-days to unlock more!`}/>
            </div>
        </Container>
    )
}

export function VideoComponent() {

    const { user, stripeRole, userData } = useAuth()
    const [ url, setUrl ] = useState<string>('');
    const [ isOpen , setIsOpen ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<string>('')
    const [ notify, setNotify ] = useState<boolean | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (notify == true) {
            Notify(message)
            setNotify(false)
        }
    },[notify])

    async function onClick() {
        if (!user) {
            Notify("Please login to continue")
            return;
        } else {
            
            setIsLoading(true)
            const tiktokPattern = /^(https?:\/\/)?(www\.)?tiktok\.com\/.+$/;

            if (tiktokPattern.test(url)) {
                setIsOpen(true)
                Notify("Recipe processing, feel free to navigate around Zesti while it finishes.")
                await handleTikTokURLSubmit({url, user, setMessage}).then((val) => {

                });
            }
            else { Notify("Only tiktok videos are accepted") }
            setIsLoading(false)
            setUrl('')
        }
    }

    return(
        <div className="p-4 w-full flex flex-col items-center animate-fadeIn mt-2">
            <div className="flex sm:flex-row flex-col gap-5 w-full justify-center">
                <form action="" method="POST" className="py-1 pl-6 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">

                    <LinkIcon className="text-gray-600 h-10 w-10"/>
                    <input type="text" name="web-page" value={url} placeholder="Paste Tiktok Video Link" className="w-full text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                    {isLoading == false ?
                    <Button isLink={false} buttonType="button" text="" className={"min-w-max text-white"}  
                        onClick={ async () => { await onClick() }}>                              
                        <span className="hidden sm:flex relative z-[5]">
                            {`Get Recipe`}
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
            <div className="text-gray-500 text-xs lg:text-sm mt-2 inline-flex space-x-1">
                    {`You have ${userData?.tokens} recipe transcriptions remaining`}
            </div>
            <ResponseModal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                title={"Processing Recipe"} 
                text={"You can navigate freely around Zesti while you wait, we will notify you when it is ready"} 
                icon={CheckIcon} 
                iconColor={'green'} 
                modalFunction={() => router.push('/my-recipes')}
                displayAd={true} buttonName={"Go to Recipes"}
                role={stripeRole}
            />
        </div>
    )
}

export function VideoTips() {

    const features = [
        {
            name: 'Warning:',
            description:
                'A video will only transcribe into a recipe properly if there are audible instructions to go along with it.',
            icon: ExclamationTriangleIcon,
        },
        {
          name: 'Find Tiktok Recipe',
          description:
            'Find a tiktok video recipe with audible instructions.',
          icon: LightBulbIcon,
        },
        {
          name: 'Copy Video Link:',
          description: 'Copy the video link from the Tiktok app or website. The link can be found by selecting share then copy link while watching the video.',
          icon: LightBulbIcon,
        },
        {
          name: 'Paste Link:',
          description: 'Paste the link in the input bar above the click the "Get Recipe" button. The recipe will begin transcribing and you will be notified when it is complete.',
          icon: LightBulbIcon,
        },
        {
            name: 'Go to Your Recipes:',
            description: 'After the recipe has finished transcribing, it will be found inside your recipes which can be found using the navigation dropdown in the top right',
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
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">How to Transcribe Videos</p>
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

