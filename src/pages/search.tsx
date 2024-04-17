// pages/search-results.tsx

import { useRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import { useEffect, useState } from 'react';
import { RecipeCardList } from '@/components/ui/recipe/list';
import { Search } from '@/components/search';
import { Raleway } from 'next/font/google'
import { TitleSection } from '@/components/shared/title';
import Breadcrumbs from '@/components/shared/breadcrumb';
import useSetBreadcrumbs from '@/components/shared/setBreadcrumbs';

const raleway = Raleway({subsets: ['latin']})

const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY}`);
const recipesIndex = searchClient.initIndex(`${process.env.NEXT_PUBLIC_ALGOLIA_ALL_RECIPES_INDEX}`);

interface Recipe {
    objectID: string;
    name: string;
    cover_image_url: string;
    // Define other properties as needed
}

const SearchResults: React.FC = () => {
    useSetBreadcrumbs()
    const router = useRouter();
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [ recipes, setRecipes ] = useState<any>([])

    useEffect(() => {
        if (router.isReady) { // Ensures router.query is populated
            const queryParam = router.query.query; // 'query' is the name of the parameter in the URL
            if (typeof queryParam === 'string') { // Check if it's a string to satisfy TypeScript
                setSearchQuery(queryParam);
            }
        }
    }, [router.isReady, router.query]);

    useEffect(() => {
        const fetchResults = async () => {
            if (searchQuery && searchQuery.trim().length > 0) {
                try {
                    const { hits } = await recipesIndex.search<Recipe>(searchQuery);
                    setSearchResults(hits);
                } catch (error) {
                    console.error("Algolia search error:", error);
                }
            }
        };
        if (searchQuery) {
            fetchResults();
        }
    }, [searchQuery]);

    console.log(recipes)

    return (
        <main className={`flex min-h-screen flex-col items-center bg-background w-screen space-y-4 pb-48 ${raleway.className}`}>
            <Breadcrumbs/>
            <TitleSection titleBlack="Search for Recipes" desc="Look up recipes by their names, descriptions, creator & more!"/>
            <Search searchLocation="my-recipes" setRecipes={setRecipes} showDropDown={false}/>
            <RecipeCardList recipes={recipes}/>
        </main>
    );
}

export default SearchResults;
