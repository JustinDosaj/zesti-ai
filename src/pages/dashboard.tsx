import { Raleway } from 'next/font/google'
import { LinkInput } from '@/components/dash-sections/link-input'
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { useEffect } from 'react';

const raleway = Raleway({subsets: ['latin']})

export default function Dashboard() {

    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if(user == null && isLoading == false) {
        router.push('/')
      }
    }, [user])

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
        <LinkInput/>
    </main>
  )
}