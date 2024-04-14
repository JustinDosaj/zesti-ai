import Head from 'next/head';
import { PageLoader } from '@/components/shared/loader';
import { Raleway } from 'next/font/google'
import useRequireAdmin from '@/hooks/admin/useRequireAdmin';
import { useState } from 'react';
import { useAuth } from '@/pages/api/auth/auth';
import { AdminProtoTypeUserSubmit } from '@/pages/api/admin/functions';
import { PrototypeSearch } from '@/components/search';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {
  
  const isAdmin = useRequireAdmin();

  const [url, setUrl] = useState<string>('')
  const { user } = useAuth();

    const onSubmitClick = async () => {
        await AdminProtoTypeUserSubmit({url, setUrl, user})
    }

  if(!isAdmin) return <PageLoader/>

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Admin | Restricted Access</title>
     </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen pb-28 ${raleway.className}`}>
        <input className="mt-48 border border-gray-300 py-3 px-6 text-gray-700 mx-auto"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            value={url}
        />
        <button className="border border-orange-500 py-3 px-6 text-gray-700 mx-auto "
            onClick={onSubmitClick}
        > 
        Submit
        </button>
        <PrototypeSearch searchLocation='my-recipes'/>
      </main>
    </>
  )
}
