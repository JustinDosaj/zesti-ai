import { Raleway } from 'next/font/google'
import React from 'react';
import { ChatHero, ChatTips } from '@/components/hub/chat';
import Head from 'next/head';
import { ChatComponent } from '@/components/hub/chat';
import { FAQ } from '@/components/home-sections/faq';
import { useAuth } from '../api/auth/auth';

const raleway = Raleway({subsets: ['latin']})

export default function Generator() {
  // Comment
  const { stripeRole, isLoading } = useAuth()

  return (
    <>
      <Head>
        <title>Zesti AI | Creative Recipe Generator | Try for Free</title>
        <meta name="title" content="Zesti AI | Creative Recipe Generator | Try for Free"/>
        <meta name="description" content="Use AI to create recipes for free, and to help you through the process of making the dish you have chosen!"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <ChatHero/>
        <ChatComponent/>
        <ChatTips/>
        <FAQ/>
      </main>
    </>
  )
}
