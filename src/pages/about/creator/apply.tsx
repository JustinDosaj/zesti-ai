import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { CookBookFeature, HomeVideoToRecipe } from '@/components/ui/features/users';
import { CreatorFAQ, CreatorCTA } from '@/components/ui/features/creators';
import { SharedHero } from '@/components/ui/general';
import { SharedHomeSectionTitle } from '@/components/shared/title';
import { useAuth } from '@/pages/api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'
import { useRouter } from 'next/router';
import { CreatorApplication } from '@/components/ui/creator/application';

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
      <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
        <div className="mt-36"/>
        <CreatorApplication/>
      </main>
    </>
  )
}
