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

  const entries = await getEntriesForContentTypes(['hero', 'faq'])
  const heroContent = entries.hero[0]
  const faqContent = entries.faq[0]

  return {
    props: { heroContent, faqContent, recipes }
  }
}

export default function Home({heroContent, faqContent, recipes}: any) {

  const seoTitle = "Zesti AI | Instantly Save TikTok & Instagram Recipes as Text"

  return (  
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="title" content={seoTitle}/>
        <meta name="description" content="Instantly save delicious recipes from TikTok or Instagram by using Zesti AI to transcribe your faovirte recipe videos to text!"/>
        <meta property="og:title" content={seoTitle}/>
        <meta property="og:description" content="Instantly save delicious recipes from TikTok or Instagram by using Zesti AI to transcribe your faovirte recipe videos to text!"/>
        <meta property="og:image" content="https://www.zesti.ai/images/x/x_meta_image.png"/>
        <meta property="og:url" content="https://www.zesti.ai/"/>
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@zestidotai"/>
        <meta name="twitter:creator" content="@zestidotai"/>
        <meta name="twitter:title" content={seoTitle}/> 
        <meta name="twitter:description" content="Instantly save delicious recipes from TikTok or Instagram with Zesti AI!"/> 
        <meta name="twitter:image" content="https://www.zesti.ai/images/x/x_meta_image.png"/>
        <meta name="twitter:image:alt" content={seoTitle}/>
        <meta name="twitter:url" content="https://www.zesti.ai/"/>  
      </Head>
      <main className={`main-seo-page-class`}>
        <Hero heroContent={heroContent}/>
        <Gallery recipes={recipes}/>
        <ThreeBoxFeature type="home" desc={"Zesti makes it easy to copy recipes so you can do more cooking and less scrolling!"}/>
        <CTA/>
        <FAQ qA={faqContent.qA.fields.user} title="FAQ" desc="Answers to the most common questions we get" type="user"/>
      </main>
    </>
  )
}
