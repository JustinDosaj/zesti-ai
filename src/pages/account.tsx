import { TitleSection } from '@/components/shared/title'
import Head from "next/head"
import { ProfilePageComponent } from '@/components/ui/user/account'
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
    <main className={`flex min-h-screen flex-col items-center bg-background w-full`}>
      <div className="mt-4 lg:mt-8"/>
      <TitleSection titleBlack="Your Account"/>
      <ProfilePageComponent/>
    </main>
    </>
    )
}