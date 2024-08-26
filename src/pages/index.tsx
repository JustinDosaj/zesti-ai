import { GetServerSideProps } from "next";
import { getEntriesForContentTypes } from "@/lib/contentfulHelpers";
import Head from 'next/head';
import dynamic from "next/dynamic";
import { Hero } from "@/components/ui/general/hero";
import { Gallery } from "@/components/ui/general/gallery";

const CTA = dynamic(() => import('@/components/ui/general/cta').then((mod) => mod.CTA), { ssr: false })
const FAQ = dynamic(() => import('@/components/ui/general/faq').then((mod) => mod.FAQ), { ssr: false })
const ThreeBoxFeature = dynamic(() => import('@/components/ui/general/threeboxfeature').then((mod) => mod.ThreeBoxFeature), { ssr: false })

export const getServerSideProps: GetServerSideProps = async () => {

  const GetRecentRecipes = (await (import ('./api/firebase/functions'))).GetRecentRecipes
  const recipes = await GetRecentRecipes(9);

  const entries = await getEntriesForContentTypes(['hero', 'faq', 'chatFeature'])
  const heroContent = entries.hero[0]
  const faqContent = entries.faq[0]

  return {
    props: { heroContent, faqContent, recipes }
  }
}

export default function Home({heroContent, faqContent, recipes}: any) {

  return (  
    <>
      <Head>
        <title>Zesti AI | Instantly Save Recipes from TikTok & Instagram</title>
        <meta name="title" content="Zesti AI | Instantly Save Recipes from TikTok & Instagram"/>
        <meta name="description" content="Instantly save delicious recipes from TikTok or Instagram by using Zesti AI to transcribe your faovirte recipe videos to text!"/>
      </Head>
      <main className={`main-seo-page-class`}>
        <Hero heroContent={heroContent}/>
        <Gallery recipes={recipes}/>
        <ThreeBoxFeature type="home"/>
        <CTA/>
        <FAQ qA={faqContent.qA.fields.user} title="FAQ" desc="Answers to the most common questions we get" type="user"/>
      </main>
    </>
  )
}
