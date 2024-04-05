import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from '@/pages/api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'
import { useRouter } from 'next/router';
import { CreatorApplication } from '@/components/ui/creator/application';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { FAQ } from '@/components/ui/general';

const raleway = Raleway({subsets: ['latin']})

export default function CreatorApplicationPage() {
  
  const { isLoading, user } = useAuth();
  const router = useRouter()

  if (isLoading) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Join Zesti | Showcase Your TikTok Recipes & Earn</title>
        <meta name="title" content="Join Zesti | Showcase Your TikTok Recipes & Earn"/>
        <meta name="description" content="Instantly transform your videos into easy-to-read recipes & keep them in one place for your followers to enjoy!"/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background w-screen pb-48 ${raleway.className}`}>
        <div className="mt-48"/>
        <CreatorApplication/>
        <div className="text-xs lg:text-sm p-6 text-center text-gray-500 pb-28 items-center inline-flex gap-1">
          <span>Notice: Resubmitting the application multiple times will cause the review process to take longer</span>
        </div>
        <FAQ title={"Creator FAQ"} desc={"These are some of the most common questions we receive from creators"} type={"creator"}/>
      </main>
    </>
  )
}
