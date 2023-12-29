import { Title } from "@/components/shared/title"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/shared/button"
import { Raleway } from 'next/font/google'
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import Head from 'next/head';
import GoogleTags from "@/components/tags/conversion"
import React, { useState, useEffect } from "react"
import { useAuth } from "./api/auth/auth"
import {useRouter} from "next/router"
import { Notify } from "@/components/shared/notify"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { PromoteKitTag } from "@/components/tags/headertags"
 
 
 
 const raleway = Raleway({subsets: ['latin']})
 
 
 export default function Reset() {
 
     const [ email, setEmail ] = useState<string>('')
     const {user, sendPasswordReset} = useAuth();
     const router = useRouter()
 
     async function resetPasswordOnClick() {
        await sendPasswordReset(email).then((val) => {
            Notify("Password reset email sent")
            setEmail('')
        }).catch((error) => {
            console.error("Error: ", error)
            Notify("Problem resetting password. Double check your email and try again.")
        })    
    }
     
     useEffect(() => {
         if(user) { router.push('/') }
     },[user])
 
     return(
     <>
     <Head>
        <title>Zesti AI | Login or Sign Up | Try for Free </title>
        <meta name="description" content="Join Zesti to gain access to the best AI powered kitchen tool that helps you quickly save and edit recipes from cooking videos"/>
        <meta name="robots" content="noindex" />
        <GoogleTags/>
        <PromoteKitTag/>
     </Head>
     <ToastContainer/>    
     <main className={`flex min-h-screen flex-col items-center justify-between bg-background h-screen ${raleway.className}`}>
         <section className="relative my-auto">
             <Container className={"grid md:grid-cols-1 lg:flex-row gap-10 lg:gap-12"}>
                 <div className="flex-1 flex flex-col">
                     <Title className="text-black text-center text-3xl md:text-4xl">
                          Reset Password
                     </Title>
                 </div>
                 <form method="POST" target="_blank" className="my-auto md:w-96">
                     <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                         <span className="min-w-max pr-2 border-r border-box-border">
                             <EnvelopeIcon className="h-6 w-6 text-black"/>                                                             
                         </span>
                         <input type="text" name="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full py-3 outline-none bg-transparent text-gray-700"/>
                     </div>
                     <div className="grid grid-cols-1 justify-center mt-4 py-1 w-full pr-1 gap-3 items-center text-heading">
                         <Button buttonType="button" onClick={() => resetPasswordOnClick()} text="" className={"min-w-max text-white"}>
                             <span className="relative z-[5]">
                                 Reset Password
                             </span>
                         </Button>
                     </div>
                 </form>

             </Container>
         </section>
     </main>
     </>
     )
 }