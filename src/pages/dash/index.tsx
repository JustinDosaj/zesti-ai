import { Raleway } from 'next/font/google'
import { LinkInput } from '@/components/dash-sections/link-input'
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { GridDisplay } from '@/components/dash-sections/grid-display';
import { getAllRecipes } from '../api/firebase/functions';
import { GetServerSideProps } from 'next';

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = context.query?.user as string
  const recipes = await getAllRecipes(user)
  return {props: {data: recipes}}
}


export default function Dashboard({data}: any) {

    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if(user == null && isLoading == false) {
        router.push('/')
      }
    }, [user])
  return (
    <main className={`flex min-h-screen flex-col items-center p-2 bg-background ${raleway.className}`}>
        <LinkInput user={user}/>
        <GridDisplay data={data}/>
    </main>
  )
}