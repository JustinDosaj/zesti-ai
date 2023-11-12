import { Raleway } from 'next/font/google'
import { LinkInput } from '@/components/dash-sections/link-input'
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { GridDisplay } from '@/components/dash-sections/grid-display';
import { getAllRecipes } from '../api/firebase/functions';
import { useState } from "react";
import { PageLoader } from "@/components/shared/loader";
import Head from 'next/head';
import { db } from '../api/firebase/firebase';
import Hub from '@/components/hub/hub';

const raleway = Raleway({subsets: ['latin']})

export default function Dashboard() {

    const { user, isLoading, stripeRole } = useAuth();
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
    const [recipes, setRecipes] = useState<any[]>([]);
    const router = useRouter();


    useEffect( () => {
      if(user == null && isLoading == false) {
        router.replace('/')
      } else if (user !== null && isLoading == false) {
        const unsubscribe = db.collection(`users/${user.uid}/recipes`)
          .onSnapshot((snapshot) => {
            const updatedRecipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRecipes(updatedRecipes);
            setIsLoadingRecipes(false);
          });
      }
    }, [user])
    
  return (
    <>
    <Head>
      <title>Zesti | Your Dashboard</title>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <LinkInput user={user} stripeRole={stripeRole}/>
        <Hub/>
        {isLoadingRecipes ? <PageLoader/> : <GridDisplay data={recipes} user={user}/>}
        
    </main>
    </>
  )
}