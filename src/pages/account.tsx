import { useAuth } from './api/auth/auth'
import { TitleSection } from '@/components/shared/title'
import Head from "next/head"
import { ProfilePageComponent } from '@/components/ui/user/account'
import { PageLoader } from '@/components/shared/loader'
import useRequireAuth from '@/hooks/user/useRequireAuth'


export default function Account() {

    // Redirect if user is not logged in
    useRequireAuth()

    const { isLoading, userData } = useAuth();

    if(isLoading) return <PageLoader/>

    return(
    <>
    <Head>
      <meta name="robots" content="noindex" />
      <title>Zesti AI | Your Account</title>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center bg-background w-screen`}>
      <div className="mt-36"/>
      <TitleSection titleBlack="Your Account"/>
      <div className={userData?.account_status == 'user'  ? `mx-auto` : `grid grid-cols-1 xl:gap-x-3` }>
        <ProfilePageComponent/>
      </div>
      <div className="mt-36"/>
    </main>
    </>
    )
}