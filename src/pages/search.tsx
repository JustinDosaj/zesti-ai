// pages/search-results.tsx
import { useEffect, useState } from 'react';
import { RecipeCardList } from '@/components/ui/recipe/list';
import { SearchOrAddRecipe } from '@/components/search';
import { TitleSection } from '@/components/shared/title';
import { useRouter } from 'next/router';
import { useAuth } from './api/auth/auth';
import Head from 'next/head';
import algoliasearch, { SearchIndex } from 'algoliasearch';
import { Notify } from '@/components/shared/notify';
import AdSense from '@/components/tags/adsense';


const SearchResults: React.FC = () => {
    
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
    const [ urlParam, setUrlParam ] = useState<string>('')
    const { stripeRole } = useAuth();

    const router = useRouter()

    useEffect(() => {
        if(router.isReady) {
            const { q } = router.query
            if (q) {
                setUrlParam(decodeURIComponent(q as string))
            }
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
                <title>Search TikTok Recipes | Zesti AI</title>
            </Head>
            <main className={`flex min-h-screen flex-col items-center bg-background w-full space-y-4 pb-48`}>
                <div className="mt-2 lg:mt-8"/>
                <TitleSection titleBlack="Add or Find Recipes" desc="Copy & paste a TikTok or Instagram link to get the recipe in seconds or search for recipes that already exist on Zesti!"/>
                <SearchOrAddRecipe align={"center"}/>
                <AdSense className="max-w-4xl" adSlot="5445664417" adFormat="auto" adStyle={{ width: '100%', height: '90px' }} role={stripeRole}/> 
                <RecipeCardList recipes={recipes}/>
                <div className="mt-2"/>
                <AdSense className="max-w-5xl" adSlot="2119249846" adFormat="auto" adStyle={{ width: '100%', height: '250px' }} role={stripeRole}/> 
            </main>
        </>
    );
}

export default SearchResults;
