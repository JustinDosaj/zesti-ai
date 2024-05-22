import { GetServerSideProps } from "next";
import Head from 'next/head';
import { Hero, HomePageCTA, HomePageScroller, ChatFeature } from '@/components/ui/features/users';
import { FAQ } from '@/components/ui/general';
import { getEntriesForContentTypes } from "@/lib/contentfulHelpers";



export const getServerSideProps: GetServerSideProps = async () => {

  const GetRandomRecipes = (await (import ('./api/firebase/functions'))).GetRandomRecipes
  const recipes = await GetRandomRecipes(9);

  const entries = await getEntriesForContentTypes(['hero'])
  const heroContent = entries.hero[0]

  return {
    props: { recipes, heroContent }
  }
}

export default function Home({recipes, heroContent}: any) {


  return (
    <>
      <Head>
        <title>Zesti AI | A Better Way to Save Recipes from TikTok & Instagram</title>
        <meta name="title" content="Zesti AI | A Better Way to Save Recipes from TikTok & Instagram"/>
        <meta name="description" content="Instantly save delicious recipes from TikTok or Instagram by using Zesti AI to transcribe your faovirte recipe videos to text!"/>
      </Head>
      <main className={`main-seo-page-class`}>
        <Hero 
          titleStart={heroContent.titleStart} 
          titleEnd={heroContent.titleEnd} 
          description={heroContent.description}
          imageUrl={heroContent.image.fields.file.url}
        />
        <HomePageScroller recipes={recipes}/>
        <ChatFeature/>
        <HomePageCTA/>
        <FAQ title="FAQ" desc="Answers to the most common questions we get" type="user"/>
      </main>
    </>
  )
}
