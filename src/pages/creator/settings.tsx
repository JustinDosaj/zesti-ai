import { CreatorSettingsComponent } from "@/components/dashboard/creator";
import { CreatorDashboard } from "@/components/elements/creatordash";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from "../api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'
const raleway = Raleway({subsets: ['latin']})


export default function Home() {
  
  const { isLoading, isCreator, user } = useAuth();

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
          <CreatorSettingsComponent/>
        </CreatorDashboard>
    </>
  )
}
