import { Raleway } from 'next/font/google'
import { LinkInput } from '@/components/dash-sections/link-input'
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { GridDisplay } from '@/components/dash-sections/grid-display';
import { getAllRecipes } from '../api/firebase/functions';
import { GetServerSideProps } from 'next';
import { useState } from "react";

const raleway = Raleway({subsets: ['latin']})

export default function Dashboard() {

    const { user, isLoading, stripeRole } = useAuth();
    const [onFirstLoad, setOnFirstLoad] = useState<boolean>(true)
    const [obj, setObj] = useState<any>([])
    const router = useRouter();


    async function onFirstPageLoad() {
      const recipes = await getAllRecipes(user?.uid).then((res) => {setObj([...obj, res])})
      setOnFirstLoad(false)
    }

    useEffect( () => {
      if(user == null && isLoading == false) {
        router.push('/')
      } else if (user !== null && isLoading == false && onFirstLoad == true) {
        onFirstPageLoad()
      }
    }, [user])
    
  return (
    <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <LinkInput user={user} stripeRole={stripeRole}/>
        <GridDisplay data={obj[0]} user={user}/>
    </main>
  )
}