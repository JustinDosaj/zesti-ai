import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '@/components/elements/navbar'
import { Footer } from '@/components/elements/footer'
import { AuthProvider } from './api/auth/auth'
import { Analytics } from '@vercel/analytics/react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { NavigationProvider } from './api/context/navigation'

export default function App({ Component, pageProps }: AppProps) {

  return (

    <NavigationProvider>
      <AuthProvider>
          <Navbar/>
            <Component {...pageProps}/>
            <Analytics/>
            <ToastContainer/>
          <Footer/>
      </AuthProvider>
    </NavigationProvider>

  )
}
