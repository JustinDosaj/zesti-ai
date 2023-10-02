import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '@/components/elements/navbar'
import { Footer } from '@/components/elements/footer'
import { initFirebase } from './api/firebase/firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

export default function App({ Component, pageProps }: AppProps) {

  const app = initFirebase();
  const provider = new GoogleAuthProvider;
  const auth = getAuth();

  return (
  <>
  <Navbar provider={provider} auth={auth}/>
    <Component {...pageProps} provider={provider} auth={auth}/>
  <Footer/>
  </>
  )
}
