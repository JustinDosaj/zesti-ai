import { Title } from "@/components/shared/title"
import { Container } from "@/components/shared/container"
import { AltButton, Button } from "@/components/shared/button"
import { Raleway } from 'next/font/google'
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline"
import Head from 'next/head';
import GoogleTags from "@/components/tags/conversion"
import React, { useState, useEffect } from "react"
import { useAuth } from "./api/auth/auth"
import { Notify } from "@/components/shared/notify"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { PageLoader } from "@/components/shared/loader"
import { RewardfulTag } from "@/components/tags/headertags"
import TikTikConversionTags2 from "@/components/tags/tiktok2"
import { LoginComponent } from "@/components/home-sections/login"

const raleway = Raleway({subsets: ['latin']})


export default function Login() {

    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const {user, signUpWithEmailPassword, login, sendPasswordReset, stripeRole, isLoading } = useAuth();

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
        <RewardfulTag/>
        <TikTikConversionTags2/>
    </Head>
    <ToastContainer/>    
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background h-screen ${raleway.className}`}>
        <section className="relative my-auto">
            <LoginComponent/>
        </section>
    </main>
    </>
    )
}