// pages/search-results.tsx
import { useEffect, useState } from 'react';
import { RecipeCardList } from '@/components/ui/recipe/list';
import { AddRecipe } from '@/components/search';
import { Raleway } from 'next/font/google'
import { TitleSection } from '@/components/shared/title';
import Breadcrumbs from '@/components/shared/breadcrumb';
import useSetBreadcrumbs from '@/components/shared/setBreadcrumbs';
import { useRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';

const raleway = Raleway({subsets: ['latin']})

const SearchResults: React.FC = () => {
    
    useSetBreadcrumbs()

    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY}`);
    const recipesIndex = searchClient.initIndex(`${process.env.NEXT_PUBLIC_ALGOLIA_ALL_RECIPES_INDEX}`);

    const [ recipes, setRecipes ] = useState<any>([])
    const [ urlParam, setUrlParam ] = useState<string>('')

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
        } catch (error) {
            console.error("Algolia search error:", error);
        }
    };

    return (
        <main className={`flex min-h-screen flex-col items-center bg-background w-screen space-y-4 pb-48 ${raleway.className}`}>
            <Breadcrumbs/>
            <TitleSection titleBlack="Search for Recipes" desc="Enter a TikTok Recipe link below or search by ingredients, instructions, usernames & more!"/>
            <AddRecipe align={"center"}/>
            <RecipeCardList recipes={recipes}/>
        </main>
    );
}

export default SearchResults;
