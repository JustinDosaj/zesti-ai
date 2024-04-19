import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { Hero } from '@/components/ui/features/users';
import { useAuth } from './api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { Raleway } from 'next/font/google'

const raleway = Raleway({subsets: ['latin']})


interface Creator {
  name: string;
  desc: string;
  imageSrc: string;
  href: string;
}

export default function Home() {
  
  const { isLoading } = useAuth();

  if (isLoading) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Zesti AI | Find Transcribed Recipes from TikTok</title>
        <meta name="title" content="Zesti AI | Find Transcribed Recipes from TikTok"/>
        <meta name="description" content="Spend less time writing recipes down and more time cooking! Find transcribed recipes from your favorite TikTok Chefs or transcribe a recipe yourself!"/>
        <GoogleTags/>
      </Head>
      <main className={`main-seo-page-class ${raleway.className}`}>
        <Hero 
          titleStart={"Your Favorite TikTok Recipes"} 
          titleEnd={"Instantly"} 
          description={"Paste the link to a TikTok recipe below or search by ingredients, usernames & more!"}
        />
      </main>
    </>
  )
}
