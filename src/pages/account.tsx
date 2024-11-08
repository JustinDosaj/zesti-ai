import { Title } from '@/components/shared/title'
import Head from "next/head"
import { AccountComponent } from '@/components/ui/auth/account'
import useRequireAuth from '@/hooks/user/useRequireAuth'


export default function Account() {

    // Redirect if user is not logged in
    useRequireAuth()

    return(
    <>
    <Head>
      <meta name="robots" content="noindex" />
      <title>Zesti AI | Your Account</title>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center space-y-4 bg-background w-full`}>
      <div className="mt-8"/>
      <Title>Your Account</Title>
      <div className="mt-2"/>
      <AccountComponent/>
    </main>
    </>
    )
}