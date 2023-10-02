import { Raleway } from 'next/font/google'
import { Hero } from '@/components/sections/hero'
import { SignIn } from './api/auth/login'




const raleway = Raleway({subsets: ['latin']})

export default function Home({auth, provider}: any) {

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${raleway.className}`}>
      <Hero provider={provider} auth={auth}/>
    </main>
  )
}
