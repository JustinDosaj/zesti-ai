
import { useAuth } from "@/pages/api/auth/auth";
import { InputResponseModal, NotLoggedInModal } from "../shared/modals";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from "../shared/button";
import { Loader } from "../shared/loader";
import { handleCreativeChatSubmit } from "@/pages/api/handler/submit";
import { Notify } from '../shared/notify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Message {
    id: string;
    sender: string;
    text: string;
    timestamp: Date | { seconds: number, nanoseconds: number }; // Adjust based on the actual shape of the timestamp
  }

export default function ChatComponent() {

    const { user, stripeRole } = useAuth()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ loginPrompt, setLoginPrompt ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('')
    const [ notify, setNotify ] = useState<boolean | null>(null)

    useEffect(() => {
        if(notify == true) {
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
        await handleCreativeChatSubmit({userInput, user, setMessage, stripeRole, setNotify}).then((val) => {
            setSuccess(val)
            setIsOpen(val)
        });
        setIsLoading(false)
        setUserInput('')
        }
    }


    return(
    <div className="mt-10 mb-6 w-full flex flex-col items-center">
        <ToastContainer/>
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Discover New Recipes with Zesti</h2>
        <p className="text-center mb-6 max-w-2xl mx-auto text-gray-700">Enter ingredients you have or simply say what you are in the mood for and Zesti will do its best to come up with something delicious!</p>
        <div className="flex sm:flex-row flex-col gap-5 w-full justify-center">
            <form action="" method="POST" className="py-1 pl-6 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
            border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                <PencilIcon className="text-gray-600 h-10 w-10"/>
                <input type="text" name="web-page" value={userInput} placeholder="Create Something Delicious" className="w-full text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setUserInput(e.target.value)}/>
                {isLoading == false ?
                <Button buttonType="button" text="" className={"min-w-max text-white"}  
                    onClick={ async () => { await onClick() }}>                              
                    <span className="hidden sm:flex relative z-[5]">
                        Create Recipe
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
        <div className="mt-2 space-x-1 text-sm">
            <span className="text-gray-400">Try for free! (No credit card required).</span>
        </div>
        <div className="mt-4 space-x-1 text-base text-center">
            <span className="text-gray-700">Curious about results? Check out this</span>
            <Link href="/demo" className="underline text-primary-main hover:text-primary-alt font-bold">example</Link>
        </div>
        <InputResponseModal isOpen={isOpen} setIsOpen={setIsOpen} success={success} message={message}/>
        <NotLoggedInModal loginPrompt={loginPrompt} setLoginPrompt={setLoginPrompt}/>
    </div>
    )
}