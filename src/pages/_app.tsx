import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import dynamic from 'next/dynamic'

const ToastContainer = dynamic(() => import('react-toastify').then((mod) => mod.ToastContainer), { ssr: false })
const Navbar = dynamic(() => import('@/components/elements/navbar').then((mod) => mod.Navbar), { ssr: false })
const Footer = dynamic(() => import('@/components/elements/footer').then((mod) => mod.Footer), { ssr: false })
const Analytics = dynamic(() => import('@vercel/analytics/react').then((mod) => mod.Analytics), { ssr: false })
const AuthProvider = dynamic(() => import('./api/auth/auth').then((mod) => mod.AuthProvider), { ssr: false })


export default function App({ Component, pageProps }: AppProps) {

  return (
      <AuthProvider>
          <Navbar/>
            <Component {...pageProps}/>
            <Analytics/>
            <ToastContainer/>
          <Footer/>
      </AuthProvider>
  )
}
