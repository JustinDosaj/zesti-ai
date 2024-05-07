import { Raleway } from 'next/font/google'
import Head from 'next/head';
import GoogleTags from "@/components/tags/conversion"
import React, { useEffect, useState } from "react"
import { useAuth } from '../api/auth/auth';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { PageLoader } from "@/components/shared/loader"
import { LoginComponent } from '@/components/ui/auth/login';
import { useRouter } from 'next/router';

const raleway = Raleway({subsets: ['latin']})


export default function Login() {

    const { isLoading, user } = useAuth();
    const router = useRouter()


    useEffect(() => {
        if (user) {
            router.push('/my-recipes')
        } 
    },[user, isLoading])

    if (isLoading) return <PageLoader/>

    return(
    <>
    <Head>
        <title>Zesti AI | Login or Sign Up | Try for Free </title>
        <meta name="title" content="Zesti AI | Login or Sign Up | Try for Free"/>
        <meta name="description" content="Join Zesti and find delicious recipes from TikTok already transcribed! Zesti is free to use, but offers a 7-day free trial for our premium model!"/>
        <GoogleTags/>
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