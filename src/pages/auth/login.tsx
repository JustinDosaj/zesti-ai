import { Raleway } from 'next/font/google'
import Head from 'next/head';
import GoogleTags from "@/components/tags/conversion"
import React, { useState } from "react"
import { useAuth } from '../api/auth/auth';
import { Notify } from "@/components/shared/notify"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { PageLoader } from "@/components/shared/loader"
import { PromoteKitTag } from "@/components/tags/headertags"
import { LoginComponent } from "@/components/home/login"

const raleway = Raleway({subsets: ['latin']})


export default function Login() {

    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const { signUpWithEmailPassword, isLoading } = useAuth();

    async function signUpOnClick() {
        await signUpWithEmailPassword(email, password).catch((error) => {Notify("Error with credentials. If you are creating an account, your password must be 7 characters or longer")})
    }

    if (isLoading) return <PageLoader/>

    return(
    <>
    <Head>
        <title>Zesti AI | Login or Sign Up | Try for Free </title>
        <meta name="title" content="Zesti AI | Login or Sign Up | Try for Free"/>
        <meta name="description" content="Join Zesti to gain access to the best AI powered kitchen tool that helps you quickly save and edit recipes from cooking videos"/>
        <GoogleTags/>
        <PromoteKitTag/>
    </Head>
    <ToastContainer/>    
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background h-screen w-screen ${raleway.className}`}>
        <section className="relative my-auto">
            <LoginComponent/>
        </section>
    </main>
    </>
    )
}