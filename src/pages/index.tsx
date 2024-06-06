import { GetServerSideProps } from "next";
import { getEntriesForContentTypes } from "@/lib/contentfulHelpers";
import Head from 'next/head';
import dynamic from "next/dynamic";

const Hero = dynamic(() => import('@/components/ui/features/users').then((mod) => mod.Hero), { ssr: false })
const HomePageCTA = dynamic(() => import('@/components/ui/features/users').then((mod) => mod.HomePageCTA), { ssr: false })
const HomePageScroller = dynamic(() => import('@/components/ui/features/users').then((mod) => mod.HomePageScroller), { ssr: false })
const ChatFeature = dynamic(() => import('@/components/ui/features/users').then((mod) => mod.ChatFeature), { ssr: false })
const FAQ = dynamic(() => import('@/components/ui/general').then((mod) => mod.FAQ), { ssr: false })

export const getServerSideProps: GetServerSideProps = async () => {

  const GetRandomRecipes = (await (import ('./api/firebase/functions'))).GetRandomRecipes
  const recipes = await GetRandomRecipes(9);

  const entries = await getEntriesForContentTypes(['hero', 'faq', 'chatFeature'])
  const heroContent = entries.hero[0]
  const faqContent = entries.faq[0]
  const chatFeature = entries.chatFeature[0]

  return {
    props: { recipes, heroContent, faqContent, chatFeature }
  }
}

export default function Home({recipes, heroContent, faqContent, chatFeature}: any) {

  return (  
    <>
      <Head>
        <title>Zesti AI | A Better Way to Save Recipes from TikTok & Instagram</title>
        <meta name="title" content="Zesti AI | A Better Way to Save Recipes from TikTok & Instagram"/>
        <meta name="description" content="Instantly save delicious recipes from TikTok or Instagram by using Zesti AI to transcribe your faovirte recipe videos to text!"/>
      </Head>
      <main className={`main-seo-page-class`}>
        <Hero heroContent={heroContent}/>
        <HomePageScroller recipes={recipes}/>
        <ChatFeature data={chatFeature}/>
        <HomePageCTA/>
        <FAQ qA={faqContent.qA.fields.user} title="FAQ" desc="Answers to the most common questions we get" type="user"/>
      </main>
    </>
  )
}
