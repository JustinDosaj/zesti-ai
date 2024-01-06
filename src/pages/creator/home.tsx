import { CreatorHomeComponent } from "@/components/dashboard/creator";
import { CreatorDashboard } from "@/components/elements/creatordash";
import { Raleway } from 'next/font/google'
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from "../api/auth/auth";
import { PageLoader } from '@/components/shared/loader';
import { PromoteKitTag } from '@/components/tags/headertags';
import { CreatorTools } from "@/components/dashboard/creator";
const raleway = Raleway({subsets: ['latin']})

export default function Home() {
  
  const { isLoading, isCreator, user } = useAuth();

  if(isLoading) return <PageLoader/>

  return (
    <>
        <Head>
            <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
            <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
            <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
            <GoogleTags/>
            <PromoteKitTag/>
        </Head>
        <CreatorDashboard>
          <CreatorHomeComponent/>
          <CreatorTools/>
        </CreatorDashboard>
    </>
  )
}
