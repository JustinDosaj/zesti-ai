import { Container } from "@/components/shared/container"
import { Button } from "@/components/shared/button"
import { Raleway } from 'next/font/google'
import { EnvelopeIcon, UsersIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import Head from 'next/head';
import GoogleTags from "@/components/tags/conversion"
import { PromoteKitTag } from "@/components/tags/headertags";
import { SharedHomeSectionTitle } from "@/components/shared/title";
import { useAuth } from "@/pages/api/auth/auth";
import { KeyIcon } from "@heroicons/react/20/solid";
import useRequireAuth from "@/hooks/user/useRequireAuth";


const raleway = Raleway({subsets: ['latin']})


export default function Contact() {

    const { user, isLoading } = useAuth()
    const { require } = useRequireAuth(user, isLoading)

    return(
    <>
    <Head>
        <title>Zesti AI | Get in Touch for Support & Inquiries</title>
        <meta name="title" content="Zesti AI | Get in Touch for Support & Inquiries"/>
        <meta name="description" content="Have questions or need assistance? Reach out to the Zesti support team through our contact page. We are here to help with all your recipe conversion needs!"/>
        <GoogleTags/>
        <PromoteKitTag/>
    </Head>    
    <main className={`flex min-h-screen flex-col items-center bg-background h-screen w-screen ${raleway.className}`}>
        <Container className={"grid md:grid-cols-1 lg:flex-row gap-10 lg:gap-12 mb-36 mt-36"}>
            <div className="flex-1 flex flex-col text-center mt-4">
                <SharedHomeSectionTitle titleBlack="Creator Program Application" desc="Please input all the information below. You will receive a response in ~1 business day."/>
            </div>
            <form action="https://formspree.io/f/xoqgeqqb" method="POST" target="_blank" className="mx-auto w-full sm:w-[550px]">
                <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                    <span className="min-w-max pr-2 border-r border-box-border">
                        <UsersIcon className="h-6 w-6 text-black"/>                                                             
                    </span>
                    <input type="text" required={true} name="FULLNAME" placeholder="Name" className="w-full py-3 outline-none bg-transparent text-gray-500"/>
                </div>
                <div className="mt-4 py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                    <span className="min-w-max pr-2 border-r border-box-border">
                        <EnvelopeIcon className="h-6 w-6 text-black"/>                                                                 
                    </span>
                    <input disabled={true} required={true} type="email" name="EMAIL" value={user?.email || ''} placeholder="Email" className="w-full py-3 outline-none bg-transparent required email text-gray-500"/>
                </div>
                <div className="mt-4 py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                    <span className="min-w-max pr-2 border-r border-box-border">
                        <KeyIcon className="h-6 w-6 text-black"/>                                                                 
                    </span>
                    <input type="text" required={true} name="TIKTOK"  placeholder="TikTok Username" className="w-full py-3 outline-none bg-transparent required email text-gray-500"/>
                </div>
                <div className="mt-4 py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-3xl ease-linear focus-within:bg-body  focus-within:border-primary">
                    <textarea name="MSG" placeholder="We would love to hear about you, tell us a little about your yourself!" className="w-full py-3 outline-none bg-transparent text-gray-500"/>
                </div>
                <div className="flex justify-end mt-4 py-1 w-full pr-1 gap-3 items-center text-heading">
                    <Button isLink={false} buttonType="submit" text="" className={"min-w-max text-white"}>
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
    </main>
    </>
    )
}