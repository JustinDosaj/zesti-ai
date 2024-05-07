// pages/search-results.tsx
import { useEffect, useState } from 'react';
import { RecipeCardList } from '@/components/ui/recipe/list';
import { SearchOrAddRecipe } from '@/components/search';
import { Raleway } from 'next/font/google'
import { TitleSection } from '@/components/shared/title';
import Breadcrumbs from '@/components/shared/breadcrumb';
import useSetBreadcrumbs from '@/components/shared/setBreadcrumbs';
import { useRouter } from 'next/router';
import { useAuth } from './api/auth/auth';
import AdSenseDisplay from '@/components/tags/adsense';
import Head from 'next/head';
import algoliasearch, { SearchIndex } from 'algoliasearch';

const raleway = Raleway({subsets: ['latin']})

const SearchResults: React.FC = () => {
    
    useSetBreadcrumbs()

    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY}`);
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

            setRecipes(recipes.hits) 
        } catch(error) {
            console.error("Error searching for recipes:", error)
        }

    };

    return (
        <>
            <Head>
                <title>Search TikTok Recipes | Zesti AI</title>
            </Head>
            <main className={`flex min-h-screen flex-col items-center bg-background w-screen space-y-4 pb-48 ${raleway.className}`}>
                <Breadcrumbs/>
                <TitleSection titleBlack="Search for Recipes" desc="Copy & paste a TikTok recipe link or search by ingredients, usernames & more!"/>
                <SearchOrAddRecipe align={"center"}/>
                <RecipeCardList recipes={recipes}/>
                <div className="pt-12 w-[300px] md:w-[728px]">
                    <AdSenseDisplay adSlot="2119249846" adFormat="horizontal" widthRes="true" role={stripeRole}/>
                </div>
            </main>
        </>
    );
}

export default SearchResults;
