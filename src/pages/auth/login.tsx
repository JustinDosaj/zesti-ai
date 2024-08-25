import Head from 'next/head';
import React, { useEffect } from "react"
import { useAuth } from '@/context/AuthContext';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Title } from '@/components/shared/title';
import { Paragraph } from '@/components/shared/paragraph';
import { Container } from '@/components/shared/container';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/shared/button';
import { ButtonLoader } from '@/components/shared/loader';


export default function Login() {

    const { login, sendSignInLink, user } = useAuth();
    const [email, setEmail] = useState("");
    const router = useRouter();
  
    const [error, setError] = useState<string | null>(null); // Add error state
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const { redirect } = router.query;
  
    const handlePasswordlessLogin = async () => {
  
  
      setIsLoading(true);
      setError(null);
  
      try {
        await sendSignInLink(email, redirect as string);
      } catch (error) {
        setError("Failed to send sign-in link. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };


    useEffect(() => {
        if (user) {
            router.push('/my-recipes')
        } 
    },[user, isLoading])

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
        <Container>
            <Title className="text-center">Login / Sign Up</Title>
            <Paragraph className="text-center mt-2">Select one of the options below to sign up or login to Zesti</Paragraph>
            <div className="w-full max-w-lg mx-auto space-y-8 lg:p-0 mt-6">
                <div className=" p-4 sm:px-10">
                    <form className="space-y-6">
                        <div className="mt-4 py-1 pl-5 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                            <span className="min-w-max pr-2 border-r border-box-border">
                                <EnvelopeIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-700"/>                                                                 
                            </span>
                            <input 
                                id="email"
                                type="email" 
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                value={email} 
                                required={true} 
                                name="EMAIL"
                                placeholder="Email" 
                                className="w-full py-2 lg:py-3 outline-none bg-transparent required email text-gray-500"
                            />
                            <Button buttonType="button" onClick={handlePasswordlessLogin} text="" className={"min-w-max text-white"} isLink={false} isDisabled={isLoading} >
                                { !isLoading ?
                                    <span className="flex relative z-[5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>                                      
                                    </span>
                                    :
                                    <ButtonLoader/>
                                }
                            </Button>
                        </div>


                        {error && (
                            <div className="text-red-500 text-sm mt-2">{error}</div>
                        )}

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-200 rounded-md text-gray-800">
                                or
                            </span>
                            </div>
                        </div>
                        <div className="flex">
                            <button onClick={login} disabled={isLoading} className="inline-flex mx-auto space-x-2 align-middle bg-black text-white p-3 pr-4 pl-4 rounded-3xl hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                <span>Connect with Google</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
            
    </main>
    </>
    )
}