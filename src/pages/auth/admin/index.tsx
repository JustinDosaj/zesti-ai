import Head from 'next/head';
import { useAuth } from '@/pages/api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { Raleway } from 'next/font/google'
import useRequireAdmin from '@/hooks/admin/useRequireAdmin';

const raleway = Raleway({subsets: ['latin']})

export default function Home() {
  
  const isAdmin = useRequireAdmin();

  if(!isAdmin) return <PageLoader/>

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Admin | Restricted Access</title>
     </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen space-y-48 ${raleway.className}`}>
        
      </main>
    </>
  )
}
