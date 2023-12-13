
import { useAuth } from "@/pages/api/auth/auth";
import { AdvancedControlsModal, InputResponseModal, NotLoggedInModal } from "../shared/modals";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { AltButton, Button } from "../shared/button";
import { Loader } from "../shared/loader";
import { handleCreativeChatSubmit } from "@/pages/api/handler/submit";
import { Notify } from '../shared/notify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import { db } from "@/pages/api/firebase/firebase";
import { LightBulbIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export function ChatComponent({role}: any) {

    const { user, stripeRole } = useAuth()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ isOptionsOpen, setIsOptionsOpen ] = useState<boolean>(false)
    const [ loginPrompt, setLoginPrompt ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)
    const [ message, setMessage] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('')
    const [ notify, setNotify ] = useState<boolean | null>(null)
    const [ recipes, setRecipes] = useState<any[]>([]);

    
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

    async function onClick(input: any) {

        if (!user) {
            setLoginPrompt(true)
            return;
        } else {
        setIsLoading(true) 
        await handleCreativeChatSubmit({input, user, setMessage, stripeRole, setNotify, recipes}).then((val) => {
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
    <div className="w-full flex flex-col items-center p-4 sm:p-0 justify-center animate-fadeIn">
        <ToastContainer/>
        <div className="flex sm:flex-row flex-col gap-5 w-full justify-center">
            <form action="" method="POST" className="pl-6 w-full max-w-md pr-1 flex gap-3 text-heading-3 shadow-lg shadow-box-shadow
            border border-box-border bg-box-bg rounded-lg ease-linear focus-within:bg-body focus-within:border-primary">
                <PencilIcon className="text-gray-600 h-6 w-6 mt-4"/>
                <textarea name="web-page" value={userInput} placeholder="Enter something..." rows={3} maxLength={1000} className="mt-4 w-full text-gray-500 outline-none bg-transparent " 
                onChange={(e) => {
                    adjustTextAreaHeight
                    setUserInput(e.target.value)
                    }}/>
            </form>
        </div>
        <div className="mt-4">
        {isLoading == false ?
            <div className="w-full space-x-2 sm:space-x-4">
            <Button buttonType="button" text="" className={"min-w-max text-white"}  
                onClick={ async () => { await onClick(userInput) }}>                              
                <span className="sm:flex relative z-[5]">
                    Create Recipe
                </span>
            </Button>
            <AltButton buttonType="button" text="" className={"min-w-max text-black"}
                onClick={() => setIsOptionsOpen(true)}>
                <span className="sm:flex relative z-[5]">
                    More Settings
                </span>
            </AltButton>
            </div>
            :
            <Loader/>
        }
        </div>
        {role !== 'premium' ? 
        <div className="mt-4 space-x-1 text-base text-center">
            <span className="text-gray-700">Get more out of Zesti with Premium. Try it now with a</span>
            <Link href="/pricing" className="underline text-primary-main hover:text-primary-alt font-bold">Free 7-Day Trial!</Link>
        </div>
        :
        <></>
        }
        <InputResponseModal isOpen={isOpen} setIsOpen={setIsOpen} success={success} message={message} role={stripeRole}/>
        <NotLoggedInModal loginPrompt={loginPrompt} setLoginPrompt={setLoginPrompt}/>
        <AdvancedControlsModal isOptionsOpen={isOptionsOpen} setIsOptionsOpen={setIsOptionsOpen} setUserInput={setUserInput} onSubmit={async (updatedInput: any) => await onClick(updatedInput)}/>
    </div>
    )
}

export function ChatHero({role, tokens}: any){

    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">
                        <span className="text-black">Create </span>          
                        <span className="primary-orange-text-gradient">AI Generated Recipe</span>
                    </h1>
                    <Paragraph className="text-base sm:text-lg mt-4 sm:mt-8 text-black">
                        {role == 'premium' || tokens > 0 ?
                        `Enter ingredients you have, describe a recipe the best you can, or enter a name of a dish. Then watch Zesti cook up a delicious recipe to follow.`
                        :
                        `No more recipes available. Try Zesti Premium free for 7 days to unlock more!`
                        }
                    </Paragraph>
                </div>
            </Container>
        </section>
    )
}

export function ChatTips() {

    const features = [
        {
            name: 'Advisory:',
            description:
              'Results can vary. The AI recipe generator is still early in development and may not always output with perfect accuracy.',
            icon: ExclamationTriangleIcon,
        },
        {
            name: 'Be Specific:',
            description:
                'The more descriptive you are, the better. For example, instead of asking for a tomato soup recipe, ask for a creamy tomato soup recipe that serves 4',
            icon: LightBulbIcon,
        },
        {
            name: 'Advanced Settings:',
            description: 'Select the More Settings button above to add additional information and get more control over your recipe.',
            icon: LightBulbIcon,
        },
        {
            name: 'Diet Type:',
            description: 'If you follow a specific diet, select a diet type so Zesti can create a recipe that follows the restrictions. If your diet does not appear, let Zesti know in the additional details.',
            icon: LightBulbIcon,
        },
        {
          name: 'Meal Type:',
          description: 'Let Zesti know if you are trying to make breakfast, lunch, dinner, dessert or even just a quick snack.',
          icon: LightBulbIcon,
        },
        {
            name: 'Time & Servings:',
            description: 'Make sure to tell Zesti how long you expect to cook and how much you want to make to help eliminate waste.',
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
                    <h2 className="text-base font-semibold leading-7 text-primary-main text-center">Tips</h2>
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