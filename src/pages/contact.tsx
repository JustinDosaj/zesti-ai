import { Title } from "@/components/shared/title"
import { Paragraph } from "@/components/shared/paragraph"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/shared/button"
import { Raleway } from 'next/font/google'
import Head from 'next/head';


const raleway = Raleway({subsets: ['latin']})


export default function Contact() {
    return(
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background  h-screen ${raleway.className}`}>
        <section className="relative my-auto ">
            <Container className={"grid md:grid-cols-2 lg:flex-row gap-10 lg:gap-12"}>
                <div className="flex-1 flex flex-col">
                    <Title>
                        Contact Us
                    </Title>
                    <Paragraph className="mt-8">
                        Send us a message and we will respond to you as soon as possible!                
                    </Paragraph>
                    <Paragraph className="mt-2 inline-flex">
                        <span className="min-w-max pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                                <path d="M3 7l9 6l9 -6"></path>
                            </svg>                                                                
                        </span>
                        jdosaj@vurge.io
                    </Paragraph>
                    <Paragraph className="mt-2 inline-flex">
                        <span className="min-w-max pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                            </svg>                                                                 
                        </span>
                        (805) 206-1623
                    </Paragraph>
                    <Paragraph className="mt-2 inline-flex">
                        <span className="min-w-max pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pins" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z"></path>
                                <path d="M8 7l0 .01"></path>
                                <path d="M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z"></path>
                                <path d="M16 15l0 .01"></path>
                            </svg>                                                               
                        </span>
                        3400 Cottage Way, Ste G2 #19004 
                        Sacramento, California 95825 Us
                    </Paragraph>
                </div>
                <form action="https://formspree.io/f/maygvonw" method="POST" target="_blank">
                <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                    <span className="min-w-max pr-2 border-r border-box-border">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                         </svg>                                                                
                    </span>
                    <input type="text" name="FULLNAME" placeholder="Name" className="w-full py-3 outline-none bg-transparent text"/>
                        </div>
                        <div className="mt-4 py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                            <span className="min-w-max pr-2 border-r border-box-border">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                                    <path d="M3 7l9 6l9 -6"></path>
                                </svg>                                                                 
                            </span>
                            <input type="email" name="EMAIL" placeholder="Email" className="w-full py-3 outline-none bg-transparent required email"/>
                        </div>
                        <div className="mt-4 py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-3xl ease-linear focus-within:bg-body  focus-within:border-primary">
                            <textarea name="MSG" placeholder="Message..." className="w-full py-3 outline-none bg-transparent text"/>
                        </div>
                        <div className="flex justify-end mt-4 py-1 w-full pr-1 gap-3 items-center text-heading">
                            <Button buttonType="submit" text="" className={"min-w-max text-white"}>
                                <span className="hidden sm:flex relative z-[5]">
                                    Submit
                                </span>
                                <span className="flex sm:hidden relative z-[5]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>                                      
                                </span>
                            </Button>
                        </div>
                    </form>
            </Container>
        </section>
    </main>
    )
}