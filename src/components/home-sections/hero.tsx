import { Button } from "../shared/button";
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import { useAuth } from "@/pages/api/auth/auth";
import { handleSubmit } from "@/pages/api/handler/submit";
import { useState } from 'react'

export function Hero(){

    const { user, login } = useAuth()
    const [ url, setUrl ] = useState<string>();

 return(
    <section className="relative pt-24 lg:pt-32">
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
            <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 ">
                <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-primarypink blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
                <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-primary blur-xl opacity-80"></span>
            </div>
            <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr to-primary from-primaryteal absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
            <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight
                font-bold text-heading-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 from-20% via-primary via-30% to-blue-700">Optimize </span>
                your website to increase
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 from-20% via-primary via-30% to-blue-700 pl-2">traffic & conversions</span>
                </h1>
                <Paragraph className="mt-8">
                    Get ready to increase your website visibility with optimized SEO and google ads in a click
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
                            <input type="text" name="web-page" placeholder="https://www.webnest.ai/" className="w-full py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                            <Button buttonType="button" text="" className={"min-w-max text-white"} 
                            onClick={ () => { !user ? login() : handleSubmit({url, user})}}>
                                <span className="hidden sm:flex relative z-[5]">
                                    Optimize Site
                                </span>
                                <span className="flex sm:hidden relative z-[5]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>                                      
                                </span>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    </section>
 )
}