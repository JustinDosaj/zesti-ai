import { Container } from "../shared/container"
import { ChevronDoubleRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from "../shared/notify"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { InlineBtnLink } from "../shared/button"
import algoliasearch from 'algoliasearch/lite';

export function DashboardRecipeTitle() {
    return(
    <Container className="relative sm:flex justify-center items-center lg:flex-wrap gap-10 lg:gap-4 w-full animate-fadeIn">
        <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">Recent Saved Recipes</h3>
        <div className="grid justify-center pl-3 sm:absolute sm:right-0">
          <Link href="/dashboard/recipebook" passHref className="hover:bg-primary-dark text-gray-700 hover:text-gray-500 font-semibold py-2 px-4">
            <span className="inline-flex items-center gap-x-1.5">
              <span className="underline">View All Recipes</span>
              <ChevronDoubleRightIcon className="h-5 w-5"/>
            </span>
          </Link>
        </div>
    </Container>
    )
}

export function Search() {

    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY}`);
    const creatorsIndex = searchClient.initIndex('test_CREATORS');
    const recipesIndex = searchClient.initIndex('test_RECIPES');
    
    const [ url, setUrl ] = useState<string>('');
    const [ message, setMessage ] = useState<string>('')
    const [ notify, setNotify ] = useState<boolean | null>(null)
    const [searchResults, setSearchResults] = useState<any>({ creators: [], recipes: [] });

    useEffect(() => {
        if (notify == true) {
            Notify(message)
            setNotify(false)
        }
    },[notify, message])

    useEffect(() => {
        if (url.trim()) {
            handleSearch(url);
        }
    }, [url]);

    const handleSearch = async (query: any) => {
        try {
            const [creators, recipes] = await Promise.all([
                creatorsIndex.search(query),
                recipesIndex.search(query)
            ]);
            setSearchResults({ creators: creators.hits, recipes: recipes.hits });
        } catch (error) {
            console.error("Algolia search error:", error);
            setMessage("Error occurred during search");
            setNotify(true);
        }
    };

    const renderSearchResults = () => {
        // Combine and limit results
        const combinedResults = [...searchResults.creators.slice(0, 5), ...searchResults.recipes.slice(0, 5)].slice(0, 5);

        if (combinedResults.length === 0) {
            return null;
        }

        console.log(combinedResults)

        return (
            <div className="absolute z-20 mt-16 w-full max-w-xs lg:max-w-md bg-white shadow-lg border border-gray-200 rounded-3xl">
                {combinedResults.map((result, index) => (
                    <Link key={index} href={`/${result.display_name}`} className="block px-4  text-gray-700 hover:bg-gray-100 rounded-3xl">
                        <div className="inline-flex space-x-2 items-center py-3">
                            <img src={result.avatar_url} alt={result.display_name} className="h-8 w-8 rounded-full"></img>
                            <span className="text-sm lg:text-base capitalize">{result.display_name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
        <div className="w-full flex-col">
            <dl className="grid grid-cols-1 gap-10">
            <div className="w-full flex flex-col items-center animate-fadeIn ">
                <div className="flex sm:flex-row flex-col gap-5">
                    <form action="" method="POST" className="py-1 pl-6 pr-6 flex  gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                    border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                        <MagnifyingGlassIcon className="text-gray-600 h-6 w-6"/>
                        <input type="text" name="web-page" value={url} placeholder="Search TikTok Username or Recipe" className="text-left w-64 lg:w-96 text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                    </form>  
                </div>
                {url && renderSearchResults()}
                <div className="text-gray-500 mt-4 text-center">
                    <span>Can&apos;t find a recipe? </span>
                    <InlineBtnLink href={'/tools/video'} text="Click here"/>
                    <span> to save any TikTok recipe</span>
                </div>
            </div>
            </dl>
        </div>
    </Container>
    )
}
  