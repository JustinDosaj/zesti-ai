// pages/search-results.tsx
import { useEffect, useState } from 'react';
import { RecipeCardList } from '@/components/ui/recipe/list';
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


const SearchResults: React.FC = () => {
    
    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY}`);
    const recipesIndex: SearchIndex = searchClient.initIndex(`${process.env.NEXT_PUBLIC_ALGOLIA_ALL_RECIPES_INDEX}`);

    recipesIndex.setSettings({
        searchableAttributes: [
            'name',
            'video_title',
            'unordered(description)',
            'unordered(ingredients)'
        ],
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
                <title>Search TikTok & Instagram Recipes | Zesti AI</title>
                <meta name="title" content="Search TikTok & Instagram Recipes | Zesti AI"/>
                <meta name="description" content="Find your favorite TikTok & Instagram recipes on Zesti and never write down ingredients again!"/>
            </Head>
            <main className={`flex min-h-screen flex-col items-center bg-background w-full space-y-4 pb-48`}>
                <div className="mt-2 lg:mt-8"/>
                <Container>
                    <Title className="text-center">Search Recipes</Title>
                    <Paragraph className="mt-2 text-center">Find recipes from TikTok & Instagram that already exist on Zesti!</Paragraph>
                </Container>
                <SearchOrAddRecipe placeholder={"Search for recipes"} page="search"/>
                <RecipeCardList recipes={recipes}/>
                <div className="mt-2"/>
                <AdSense className="max-w-5xl" adSlot="2119249846" adFormat="auto" adStyle={{ width: '100%', height: '250px' }} role={stripeRole}/> 
            </main>
        </>
    );
}

export default SearchResults;
