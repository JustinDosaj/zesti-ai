import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '@/components/elements/navbar'
import { Footer } from '@/components/elements/footer'
//import { initFirebase } from './api/firebase/firebase'
import { AuthProvider } from './api/auth/auth'
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'



export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const isCreatorPage = router.pathname.includes('/creator/');

  return (
  <>
    <AuthProvider>
        {!isCreatorPage && <Navbar/>}
          <Component {...pageProps}/>
          <Analytics/>
          <ToastContainer/>
        {!isCreatorPage && <Footer/>}
    </AuthProvider>
  </>
  )
}
