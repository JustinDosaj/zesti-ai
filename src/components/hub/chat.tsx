
import { useAuth } from "@/pages/api/auth/auth";
import { InputResponseModal, NotLoggedInModal } from "../shared/modals";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from "../shared/button";
import { Loader } from "../shared/loader";
import { handleCreativeChatSubmit } from "@/pages/api/handler/submit";
import { Notify } from '../shared/notify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import { db } from "@/pages/api/firebase/firebase";

export function ChatComponent() {

    const { user, stripeRole } = useAuth()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ loginPrompt, setLoginPrompt ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('')
    const [ notify, setNotify ] = useState<boolean | null>(null)
    const [recipes, setRecipes] = useState<any[]>([]);

    
    useEffect( () => {
          const unsubscribe = db.collection(`users/${user?.uid}/recipes`)
            .onSnapshot((snapshot: any) => {
              const updatedRecipes = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
              setRecipes(updatedRecipes);
            });
      }, [user])

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
        await handleCreativeChatSubmit({userInput, user, setMessage, stripeRole, setNotify, recipes}).then((val) => {
            setSuccess(val)
            setIsOpen(val)
        });
        setIsLoading(false)
        setUserInput('')
        }
    }

    const adjustTextAreaHeight = (e: any) => {
        setUserInput(e.target.value);
    
        // Dynamically adjust the rows
        const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
        // Minimum number of rows
        const newRows = numberOfLineBreaks + 1;
        e.target.rows = newRows < 1 ? 1 : newRows; // Adjust the 5 to your minimum rows
    };


    return(
    <div className="w-full flex flex-col items-center p-4 sm:p-0">
        <ToastContainer/>
        <div className="flex sm:flex-row flex-col gap-5 w-full justify-center">
            <form action="" method="POST" className="pl-6 w-full max-w-md pr-1 flex gap-3 text-heading-3 shadow-lg shadow-box-shadow
            border border-box-border bg-box-bg rounded-lg ease-linear focus-within:bg-body focus-within:border-primary">
                <PencilIcon className="text-gray-600 h-6 w-6 mt-4"/>
                <textarea name="web-page" value={userInput} placeholder="Enter something..." rows={5} maxLength={1000} className="mt-4 w-full text-gray-500 outline-none bg-transparent" 
                onChange={(e) => {
                    adjustTextAreaHeight
                    setUserInput(e.target.value)
                    }}/>
            </form>
        </div>
        <div className="mt-4">
        {isLoading == false ?
            <Button buttonType="button" text="" className={"min-w-max text-white"}  
                onClick={ async () => { await onClick() }}>                              
                <span className="sm:flex relative z-[5]">
                    Create Recipe
                </span>
            </Button>
            :
            <Loader/>
        }
        </div>
        <div className="mt-2 space-x-1 text-sm">
            <span className="text-gray-400">Try for free! (No credit card required).</span>
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

export function ChatHero(){

    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red">Create</span>
                        <span className="text-black"> A Delicious Recipe With</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Zesti AI</span> 
                    </h1>
                    <Paragraph className="text-base sm:text-lg mt-4 sm:mt-8 text-black">
                        Enter ingredients you have, describe a recipe the best you can, or enter a name of a dish. Then watch Zesti cook up a delicious recipe to follow.
                    </Paragraph>
                </div>
            </Container>
        </section>
    )
}