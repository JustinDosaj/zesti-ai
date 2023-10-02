import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '@/components/elements/navbar'
import { Footer } from '@/components/elements/footer'
import { initFirebase } from './api/firebase/firebase'
import { AuthProvider } from './api/auth/auth'

export default function App({ Component, pageProps }: AppProps) {

  const app = initFirebase();

  return (
  <>
    <AuthProvider>
        <Navbar/>
          <Component {...pageProps}/>
        <Footer/>
    </AuthProvider>
  </>
  )
}
