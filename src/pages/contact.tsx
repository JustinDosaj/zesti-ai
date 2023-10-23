import { Title } from "@/components/shared/title"
import { Paragraph } from "@/components/shared/paragraph"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/shared/button"
import { Raleway } from 'next/font/google'
import { EnvelopeIcon, MapPinIcon, UsersIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import Head from 'next/head';


const raleway = Raleway({subsets: ['latin']})


export default function Contact() {
    return(
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background  h-screen ${raleway.className}`}>
        <section className="relative my-auto ">
            <Container className={"grid md:grid-cols-2 lg:flex-row gap-10 lg:gap-12"}>
                <div className="flex-1 flex flex-col">
                    <Title className="text-black">
                        Contact Us
                    </Title>
                    <Paragraph className="mt-8 text-gray-600">
                        Send us a message and we will respond to you as soon as possible!                
                    </Paragraph>
                    <Paragraph className="mt-2 inline-flex text-gray-600">
                        <span className="min-w-max pr-2">
                            <EnvelopeIcon className="h-6 w-6 text-black"/>                                                                 
                        </span>
                        jdosaj@vurge.io
                    </Paragraph>
                    <Paragraph className="mt-2 inline-flex text-gray-600">
                        <span className="min-w-max pr-2">
                            <MapPinIcon className="h-6 w-6 text-black"/>                                                               
                        </span>
                        3400 Cottage Way, Ste G2 #19004 
                        Sacramento, California 95825 Us
                    </Paragraph>
                </div>
                <form action="https://formspree.io/f/maygvonw" method="POST" target="_blank">
                <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                    <span className="min-w-max pr-2 border-r border-box-border">
                        <UsersIcon className="h-6 w-6 text-black"/>                                                             
                    </span>
                    <input type="text" name="FULLNAME" placeholder="Name" className="w-full py-3 outline-none bg-transparent text"/>
                        </div>
                        <div className="mt-4 py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                            <span className="min-w-max pr-2 border-r border-box-border">
                                <EnvelopeIcon className="h-6 w-6 text-black"/>                                                                 
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
                                    <PaperAirplaneIcon className="h-6 w-6 text-white"/>                                     
                                </span>
                            </Button>
                        </div>
                    </form>
            </Container>
        </section>
    </main>
    )
}