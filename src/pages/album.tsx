// Page not in use on production while instagram albums are disabled



import { useEffect, useState } from 'react';
import { RecipeCardList } from '@/components/ui/recipe/list';
import { SearchOrAddRecipe } from '@/components/search';
import { TitleSection } from '@/components/shared/title';
import { useRouter } from 'next/router';
import { useAuth } from './api/auth/auth';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { GetRecipeByIds } from './api/firebase/functions';


interface AlbumResultsProps {
    recipes: [];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { query } = context; 
    const ids = query.q as string[]

    const recipes = await GetRecipeByIds(ids)

    return { props: { recipes } }
}

const AlbumResults: React.FC<AlbumResultsProps> = (recipes) => {

    const [ urlParam, setUrlParam ] = useState<string>('')
    const [ albumIds, setAlbumIds ] = useState<string[]>([])    
    const { stripeRole } = useAuth();

    const router = useRouter()

    useEffect(() => {
        if(router.isReady) {
            const { q } = router.query

            if (q) {
                setUrlParam(decodeURIComponent(q as string))
                for(let i = 0; i < urlParam.split(',').length; i++) { 
                    setAlbumIds([...albumIds, urlParam.split(',')[i]])
                }
            }
            //handleSearch(q)
        }
    },[router.isReady, router.query])


    return (
        <>
            <Head>
                <title>Search TikTok Recipes | Zesti AI</title>
            </Head>
            <main className={`flex min-h-screen flex-col items-center bg-background w-full space-y-4 pb-48`}>
                <div className="mt-2 lg:mt-8"/>
                <TitleSection titleBlack="Search for Recipes" desc="Copy & paste a TikTok or Instagram recipe link or search by ingredients, usernames & more!"/>
                <SearchOrAddRecipe align={"center"}/>
                <RecipeCardList recipes={recipes.recipes}/>
            </main>
        </>
    );
}

export default AlbumResults;
