// pages/search-results.tsx
import algoliasearch from 'algoliasearch/lite';
import { useState } from 'react';
import { RecipeCardList } from '@/components/ui/recipe/list';
import { AddRecipeOption, Search } from '@/components/search';
import { Raleway } from 'next/font/google'
import { TitleSection } from '@/components/shared/title';
import Breadcrumbs from '@/components/shared/breadcrumb';
import useSetBreadcrumbs from '@/components/shared/setBreadcrumbs';
import { AddModal } from '@/components/ui/modals/add';
import { UserIcon } from '@heroicons/react/20/solid';
import { useAuth } from './api/auth/auth';

const raleway = Raleway({subsets: ['latin']})

interface Recipe {
    objectID: string;
    name: string;
    cover_image_url: string;
    // Define other properties as needed
}

const SearchResults: React.FC = () => {
    
    useSetBreadcrumbs()

    const [ recipes, setRecipes ] = useState<any>([])
    const [ isAddOpen, setIsAddOpen ] = useState<boolean>(false)

    return (
        <main className={`flex min-h-screen flex-col items-center bg-background w-screen space-y-4 pb-48 ${raleway.className}`}>
            <Breadcrumbs/>
            <TitleSection titleBlack="Search for Recipes" desc="Search recipes by usernames, ingredients, descriptions & more! If you cannot find what you're looking then you can add "/>
            <Search searchLocation="my-recipes" setRecipes={setRecipes} showDropDown={false}/>
            <AddRecipeOption setIsAddOpen={setIsAddOpen}/>
            <RecipeCardList recipes={recipes}/>
            <AddModal
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                title="Add Recipe"
                text="Click share on the Tiktok video and select copy link. Then paste the link below to add the recipe!"
                icon={UserIcon}
            />

        </main>
    );
}

export default SearchResults;
