import { GetServerSideProps } from "next";
import Head from 'next/head';
import { Hero, HomePageCTA, HomePageScroller, ChatFeature } from '@/components/ui/features/users';
import { FAQ } from '@/components/ui/general';
import { useAuth } from "./api/auth/auth";
import { PageLoader } from "@/components/shared/loader";



export const getServerSideProps: GetServerSideProps = async () => {

  const GetRandomRecipes = (await (import ('./api/firebase/functions'))).GetRandomRecipes
  const recipes = await GetRandomRecipes(9);

  return {
    props: { recipes }
  }
}

export default function Home({recipes}: any) {

  const { isLoading } = useAuth();

  if (isLoading) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Zesti AI | A Better Way to Save Recipes from TikTok & Instagram</title>
        <meta name="title" content="Zesti AI | A Better Way to Save Recipes from TikTok & Instagram"/>
        <meta name="description" content="Instantly save delicious recipes from TikTok or Instagram by using Zesti AI to transcribe your faovirte recipe videos to text!"/>
      </Head>
      <main className={`main-seo-page-class`}>
        <Hero 
          titleStart={"A Better Way to Save Recipes from"} 
          titleEnd={"TikTok & Instagram"} 
          description={"Copy & paste a TikTok recipe link or search by ingredients, usernames & more!"}
        />
        <HomePageScroller recipes={recipes}/>
        <ChatFeature/>
        <HomePageCTA/>
        <FAQ title="FAQ" desc="Answers to the most common questions we get" type="user"/>
      </main>
    </>
  )
}
