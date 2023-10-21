import { Button } from "../shared/button";
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import { useAuth } from "@/pages/api/auth/auth";
import { handleSubmit } from "@/pages/api/handler/submit";
import { useState } from 'react'
import { Loader } from "../shared/loader";

export function Hero(){

    const { user, login } = useAuth()
    const [ url, setUrl ] = useState<string>();
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

 return(
    <section className="relative pt-24 lg:pt-32">
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
            <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight
                font-bold text-heading-1">            
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pr-2">Transform</span>
                Cooking Videos Into
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Readable Recipes</span> 
                </h1>
                <Paragraph className="mt-8">
                    There is nothing worse than scrubing along a video timeline while in the middle of cooking. Use Zesti to extract recipes videos and turn them into clear instructions.
                </Paragraph>
                <div className="mt-10 w-full flex max-w-md mx-auto lg:mx-0">
                    <div className="flex sm:flex-row flex-col gap-5 w-full">
                        <form action="" method="POST" className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                        border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-link w-10 h-10" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 15l6 -6"></path>
                                <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"></path>
                                <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"></path>
                            </svg>
                            <input type="text" name="web-page" value={url} placeholder="https://www.webnest.ai/" className="w-full py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                            {isLoading == false ?
                            <Button buttonType="button" text="" className={"min-w-max text-white"} 
                                onClick={ async () => { if(!user) { login() } else {
                                    setIsLoading(true) 
                                    await handleSubmit({url, user}); 
                                    setIsLoading(false)
                                    setUrl('')
                                }}}>
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
        </Container>
    </section>
 )
}