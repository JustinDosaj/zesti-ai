import { Title } from "@/components/shared/title"
import { Container } from "@/components/shared/container"
import { AltButton, Button } from "@/components/shared/button"
import { Raleway } from 'next/font/google'
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline"
import Head from 'next/head';
import GoogleTags from "@/components/google/conversion"
import React, { useState, useEffect } from "react"
import { useAuth } from "./api/auth/auth"
import {useRouter} from "next/router"
import { Notify } from "@/components/shared/notify"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const raleway = Raleway({subsets: ['latin']})


export default function Login() {

    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const {user, signUpWithEmailPassword, login, sendPasswordReset} = useAuth();
    const router = useRouter()

    async function signUpOnClick() {
        await signUpWithEmailPassword(email, password).catch((error) => {Notify("Error with credentials. If you are creating an account, your password must be 7 characters or longer")})
    }
    
    useEffect(() => {
        if(user) { router.push('/dashboard') }
    },[user])

    return(
    <>
    <Head>
        <title>Zesti AI | Login or Sign Up | Try for Free </title>
        <meta name="title" content="Zesti AI | Login or Sign Up | Try for Free"/>
        <meta name="description" content="Join Zesti to gain access to the best AI powered kitchen tool that helps you quickly save and edit recipes from cooking videos"/>
        <GoogleTags/>
    </Head>
    <ToastContainer/>    
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background h-screen ${raleway.className}`}>
        <section className="relative my-auto">
            <Container className={"grid md:grid-cols-1 lg:flex-row gap-10 lg:gap-12"}>
                <div className="flex-1 flex flex-col">
                    <Title className="text-black text-center text-3xl md:text-4xl">
                        Login
                    </Title>
                </div>
                <div className="flex-1 flex flex-col">
                    <button onClick={login} className="inline-flex mx-auto space-x-2 align-middle bg-black text-white p-2 pr-4 pl-4 rounded-3xl hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        <span>Connect with Google</span>
                    </button>
                </div>
                {/*<div className="mx-auto text-gray-700">OR</div>
                <form method="POST" target="_blank" className="my-auto md:w-96">
                    <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                        <span className="min-w-max pr-2 border-r border-box-border">
                            <EnvelopeIcon className="h-6 w-6 text-black"/>                                                             
                        </span>
                        <input type="text" name="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full py-3 outline-none bg-transparent text-gray-700"/>
                    </div>
                    <div className="mt-4 py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                        <span className="min-w-max pr-2 border-r border-box-border">
                            <KeyIcon className="h-6 w-6 text-black"/>                                                                 
                        </span>
                        <input type="password" name="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"  className="w-full py-3 outline-none bg-transparent required email text-gray-700"/>
                    </div>
                    <div className="grid grid-cols-2 justify-center mt-4 py-1 w-full pr-1 gap-3 items-center text-heading">
                        <Button buttonType="button" onClick={() => signUpOnClick()} text="" className={"min-w-max text-white"}>
                            <span className="relative z-[5]">
                                Sign Up
                            </span>

                        </Button>
                        <AltButton buttonType="button" onClick={() => signUpOnClick()} text="" className={"min-w-max text-white"}>
                            <span className="relative z-[5] text-black">
                                Login
                            </span>
                        </AltButton>
                    </div>
                    <div className="text-center mt-4">
                        <Link href="/reset" className="text-sm text-black text-right underline hover:text-gray-500">Forgot Password?</Link>
                    </div>
                </form>*/}

            </Container>
        </section>
    </main>
    </>
    )
}