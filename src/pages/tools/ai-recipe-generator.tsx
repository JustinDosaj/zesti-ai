// pages/search-results.tsx
import { ThreeBoxFeature } from '@/components/ui/general/threeboxfeature';
import { Title } from '@/components/shared/title';
import { useAuth } from '@/context/AuthContext';
import Head from 'next/head';
import AdSense from '@/components/ads/adsense';
import { Paragraph } from '@/components/shared/paragraph';
import { Container } from '@/components/shared/container';
import { GetServerSideProps } from "next";
import { GeneratorInput } from '@/components/tools/generator-input';


export const getServerSideProps: GetServerSideProps = async () => {

  const GetRecentRecipes = (await (import ('../api/firebase/functions'))).GetRecentRecipes
  const recentRecipes = await GetRecentRecipes(9);

  return {
    props: { recentRecipes }
  }
}


const AIGenerator: React.FC = () => {
    
    const { stripeRole } = useAuth();

    return (
        <>
        <Head>
            <title>AI Recipe Generator - 100% Free, No Login</title>
            <meta name="title" content="AI Recipe Generator - 100% Free, No Login"/>
            <meta name="description" content="Tell Zesti AI what kind of recipe you feel like making, and in seconds you will have a delicious recipe ready to cook!"/>
            <meta property="og:title" content="AI Recipe Generator - 100% Free, No Login"/>
            <meta property="og:description" content="Tell Zesti AI what kind of recipe you feel like making, and in seconds you will have a delicious recipe ready to cook!"/>
            <meta property="og:image" content="https://www.zesti.ai/images/x/x_meta_image.png"/>
            <meta property="og:url" content="https://www.zesti.ai/"/>
            <meta property="og:type" content="website"/>
        </Head>
            <main className={`flex min-h-screen flex-col items-center bg-background w-full space-y-4 pb-48`}>
                <div className="mt-8"/>
                <Container>
                    <Title className="text-center">AI Recipe Generator</Title>
                    <Paragraph className="mt-2 text-center">Describe what kind of recipe you would like to generate and let Zesti do it for you</Paragraph>
                </Container>
                <GeneratorInput/>
                <div className="pt-2"/>
                <AdSense className="mx-auto max-w-[320px] md:max-w-[728px]" adSlot="3663491065" adFormat="horizontal" adStyle={{ width: '100%', maxHeight: '90px', height: '90px' }} role={stripeRole}/> 
                <div className="pt-4"/>
                <ThreeBoxFeature showTitle={false} type="ai" desc={"Use Zesti AI recipe generator to create delicious and creative recipes in seconds!"}/>
                <div className="pt-4"/>
                <AdSense className="max-w-5xl" adSlot="9109019747" adFormat="auto" adStyle={{ width: '100%', height: '250px' }} role={stripeRole}/> 
            </main>
        </>
    );
}

export default AIGenerator;
