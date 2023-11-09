import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '@/components/elements/navbar'
import { Footer } from '@/components/elements/footer'
//import { initFirebase } from './api/firebase/firebase'
import { AuthProvider } from './api/auth/auth'
import { Analytics } from '@vercel/analytics/react';
import { Chatbox } from '@/components/chat/chatbox'

export default function App({ Component, pageProps }: AppProps) {

  return (
  <>
    <AuthProvider>
        <Navbar/>
          <Component {...pageProps}/>
          <Analytics/>
          <Chatbox/>
        <Footer/>
    </AuthProvider>
  </>
  )
}
