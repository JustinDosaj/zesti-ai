import Head from 'next/head';
import { PageLoader } from '@/components/shared/loader';
import { useState } from 'react';
import useRequireAdmin from '@/hooks/admin/useRequireAdmin';
import { AdminMassUpdateRecipes, AdminUpdateRecipe } from '@/pages/api/admin/functions';

export default function Home() {
  
  const isAdmin = useRequireAdmin();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ userInput, setUserInput ] = useState<string>("");

  if(!isAdmin) return <PageLoader/>

  const handleSubmit = async () => {
    setIsLoading(true)
    await AdminUpdateRecipe({userInput})
    setIsLoading(false)
  }

  const handleSubmit2 = async () => {
    setIsLoading(true)
    await AdminMassUpdateRecipes()
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Admin | Restricted Access</title>
     </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen pb-28`}>
        <div className="my-auto space-x-4">
          <input type="text" className="bg-primary text-black p-2 rounded-md border border-gray-300" placeholder="Search for a user" onChange={(e) => setUserInput(e.target.value)} value={userInput}/>
          <button 
            disabled={isLoading}
            type="button"
            onClick={handleSubmit} 
            className="border bg-primary-main text-white p-2 rounded-3xl hover:bg-primary-alt">
              {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </main>
    </>
  )
}
