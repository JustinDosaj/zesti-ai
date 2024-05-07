import { GetServerSideProps } from "next";
import Head from 'next/head';
import { Hero, HomePageCTA, HomePageScroller, ChatFeature, HomeVideoToRecipe } from '@/components/ui/features/users';
import { FAQ } from '@/components/ui/general';


export const getServerSideProps: GetServerSideProps = async () => {

  const GetRandomRecipes = (await (import ('./api/firebase/functions'))).GetRandomRecipes
  const recipes = await GetRandomRecipes(9);

  return {
    props: { recipes }
  }
}

export default function Home({recipes}: any) {
  
  return (
    <>
      <Head>
        <title>Zesti AI | A Better Way to Save TikTok Recipes</title>
        <meta name="title" content="Zesti AI | A Better Way to Save TikTok Recipes"/>
        <meta name="description" content="Instantly save delicious recipes from TikTok by using Zesti AI to transcribe your faovirte recipe videos to text!"/>
      </Head>
      <main className={`main-seo-page-class`}>
        <Hero 
          titleStart={"A Better Way to Save"} 
          titleEnd={"TikTok Recipes"} 
          description={"Copy & paste a TikTok recipe link or search by ingredients, usernames & more!"}
        />
        <HomePageScroller recipes={recipes}/>
        <HomeVideoToRecipe titleStart={"Instantly Convert"} titleEnd={"Video to Recipe"} desc={""}/>
        <ChatFeature/>
        <HomePageCTA/>
        <FAQ title="FAQ" desc="Answers to the most common questions we get" type="user"/>
      </main>
    </>
  )
}
