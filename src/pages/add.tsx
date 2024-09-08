// pages/search-results.tsx
import { SearchOrAddRecipe } from '@/components/tools/search-add-recipe';
import { Title } from '@/components/shared/title';
import { useAuth } from '@/context/AuthContext';
import Head from 'next/head';
import AdSense from '@/components/ads/adsense';
import { Paragraph } from '@/components/shared/paragraph';
import { Container } from '@/components/shared/container';
import { Gallery } from '@/components/ui/general/gallery';
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async () => {

  const GetRecentRecipes = (await (import ('./api/firebase/functions'))).GetRecentRecipes
  const recentRecipes = await GetRecentRecipes(9);

  return {
    props: { recentRecipes }
  }
}


const AddRecipe: React.FC = ({recentRecipes}: any) => {
    
    const { stripeRole } = useAuth();

    return (
        <>
            <Head>
                <title>Add TikTok & Instagram Recipes | Zesti AI</title>
                <meta name="title" content="Add TikTok & Instagram Recipes | Zesti AI"/>
                <meta name="description" content="Instantly save your favorite social media recipes without the hassle of rewatching the video to get every ingredient!"/>
            </Head>
            <main className={`flex min-h-screen flex-col items-center bg-background w-full space-y-4 pb-48`}>
                <div className="mt-8"/>
                <Container>
                    <Title className="text-center">Add Recipe</Title>
                    <Paragraph className="mt-2 text-center">Copy & paste a TikTok or Instagram link to save the recipe in seconds!</Paragraph>
                </Container>
                <SearchOrAddRecipe placeholder="Enter Recipe URL" page="add"/>
                <AdSense className="mx-auto max-w-[320px] md:max-w-[728px]" adSlot="3663491065" adFormat="horizontal" adStyle={{ width: '100%', maxHeight: '90px', height: '90px' }} role={stripeRole}/> 
                <div className="pt-2"/>
                <Gallery recipes={recentRecipes}/>
                <div className="mt-2"/>
                <AdSense className="max-w-5xl" adSlot="9109019747" adFormat="auto" adStyle={{ width: '100%', height: '250px' }} role={stripeRole}/> 
            </main>
        </>
    );
}

export default AddRecipe;
