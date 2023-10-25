import { Paragraph } from "../shared/paragraph"
import { Button } from "../shared/button"
import { Container } from "../shared/container"
import { useState } from 'react'
import { handleSubmit } from "@/pages/api/handler/submit"
import { Loader } from "../shared/loader";
import { InputResponseModal } from "../shared/modals"
import { LinkIcon } from "@heroicons/react/20/solid"

export function LinkInput({user, stripeRole}: any) {

    const [ url, setUrl ] = useState<string>();
    const [ isOpen , setIsOpen ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<string>('')

    async function onClick() {
        setIsLoading(true) 
        await handleSubmit({url, user, setMessage, stripeRole}).then((val) => { setSuccess(val) }); 
        setIsLoading(false)
        setUrl('')
        setIsOpen(true)
    }

    return(
    <section className="relative pt-32">
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
            <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr to-primary from-primaryteal absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
            <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight
                font-bold text-heading-1 text-black">
                Your Recipes
                </h1>
                <Paragraph className="mt-8 text-gray-600">
                    Transform a cooking video into a readable recipe so you no longer have to rewatch videos over and over to start cooking.
                </Paragraph>
                <div className="mt-10 w-full flex max-w-md mx-auto lg:mx-0">
                    <div className="flex sm:flex-row flex-col gap-5 w-full">
                    <form action="" method="POST" className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                        border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                            <LinkIcon className="text-gray-600 h-10 w-10"/>
                            <input type="text" name="web-page" value={url} placeholder="https://www.youtube.com/shorts/ZBIPT-hTv94" className="w-full py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                            {isLoading == false ?
                            <Button buttonType="button" text="" className={"min-w-max text-white"} 
                                onClick={ async () => {await onClick()}}>
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
            </div>
            <InputResponseModal isOpen={isOpen} setIsOpen={setIsOpen} success={success} message={message}/>
        </Container>
    </section>
    )
}