// pages/search-results.tsx
import { useEffect, useState } from 'react';
import { SearchOrAddRecipe } from '@/components/search/search-add-recipe';
import { Title } from '@/components/shared/title';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Head from 'next/head';
import algoliasearch, { SearchIndex } from 'algoliasearch';
import { Notify } from '@/components/shared/notify';
import AdSense from '@/components/tags/adsense';
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
    
    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY}`);
    const recipesIndex: SearchIndex = searchClient.initIndex(`${process.env.NEXT_PUBLIC_ALGOLIA_ALL_RECIPES_INDEX}`);

    recipesIndex.setSettings({
        searchableAttributes: [
            'unordered(name)',
            'unordered(video_title)',
            'unordered(description)',
            'unordered(ingredients)'
        ],
        typoTolerance: 'true',
        removeWordsIfNoResults: 'allOptional',
    })

    const [ recipes, setRecipes ] = useState<any>([])
    const { stripeRole } = useAuth();

    const router = useRouter()

    useEffect(() => {
        if(router.isReady) {
            const { q } = router.query
            handleSearch(q)
        }
    },[router.isReady, router.query])

    const handleSearch = async (query: any) => {

        try {
            const [ recipes ] = await Promise.all([
                recipesIndex.search(query)
            ]);

            const sortedRecipes = recipes.hits.sort((a: any, b: any) => {
                const dateA = new Date(a.data.date_added).getTime();
                const dateB = new Date(b.data.date_added).getTime();
                return dateB - dateA;
            });

            setRecipes(sortedRecipes) 
            
        } catch(error) {
            Notify("Problem fetching recipes, please try again later")
        }

    };

    return (
        <>
            <Head>
                <title>Add TikTok & Instagram Recipes | Zesti AI</title>
                <meta name="title" content="Add TikTok & Instagram Recipes | Zesti AI"/>
                <meta name="description" content="Instantly save your favorite social media recipes without the hassle of rewatching the video to get every ingredient!"/>
            </Head>
            <main className={`flex min-h-screen flex-col items-center bg-background w-full space-y-4 pb-48`}>
                <div className="mt-2 lg:mt-8"/>
                <Container>
                    <Title className="text-center">Add Recipe</Title>
                    <Paragraph className="mt-2 text-center">Copy & paste a TikTok or Instagram link to save the recipe in seconds!</Paragraph>
                </Container>
                <SearchOrAddRecipe align={"center"}/>
                <div className="pt-24"/>
                <Gallery recipes={recentRecipes}/>
                <div className="mt-2"/>
                <AdSense className="max-w-5xl" adSlot="2119249846" adFormat="auto" adStyle={{ width: '100%', height: '250px' }} role={stripeRole}/> 
            </main>
        </>
    );
}

export default AddRecipe;
