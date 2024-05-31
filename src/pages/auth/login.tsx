import Head from 'next/head';
import React, { useEffect } from "react"
import { useAuth } from '../api/auth/auth';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { PageLoader } from "@/components/shared/loader"
import { LoginComponent } from '@/components/ui/auth/login';
import { useRouter } from 'next/router';
import { Title, TitleSection } from '@/components/shared/title';


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
    </Head>
    <ToastContainer/>    
    <main className={`flex min-h-screen flex-col jutify-between space-y-4 items-center bg-background h-screen w-screen`}>
        <div className="mt-2 lg:mt-8"/>
        <TitleSection titleBlack={"Login or Sign Up"} desc={"Select one of the options below to sign up or login to Zesti"}/>
        <LoginComponent/>
    </main>
    </>
    )
}