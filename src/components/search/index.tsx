import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import algoliasearch from 'algoliasearch/lite';
import { XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React, { useState, useEffect } from "react"
import { classNames } from '../shared/classNames';
import { Button } from '../shared/button';

interface SearchProps {
    searchLocation: "home" | "my-recipes",
    showDropDown: boolean,
    setRecipes?: any
}

export function Search({searchLocation, setRecipes, showDropDown}: SearchProps){

    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY}`);
    const recipesIndex = searchClient.initIndex(`${process.env.NEXT_PUBLIC_ALGOLIA_ALL_RECIPES_INDEX}`);
    const [ input, setInput ] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any>({ recipes: [] });

    console.log(searchResults.recipes)

    useEffect(() => {
        if (input.trim()) {
            handleSearch(input);
        }
    }, [input]);

    const handleSearch = async (query: any) => {
        try {
            const [ recipes ] = await Promise.all([
                recipesIndex.search(query)
            ]);
            setSearchResults({ recipes: recipes.hits });
            if (setRecipes) { setRecipes(recipes.hits) }
        } catch (error) {
            console.error("Algolia search error:", error);
        }
    };

    const clearSearch = async () => {
        setInput('');
        setRecipes([]);
    }
    
    const renderSearchResults = () => {
        return(
            <div className="absolute z-20 mt-16 w-[325px] md:w-[525px] bg-white shadow-lg border border-gray-200 rounded-3xl">
                {searchResults.recipes.map((result: any, index: number) => (
                    <Link key={index} href={`/recipe/${result.objectID}`} className="block px-4  text-gray-700 hover:bg-gray-100 rounded-3xl">
                        <div className="inline-flex space-x-3 items-center py-3">
                            <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(result.cover_image_url)}?alt=media`} alt={result.name} className="h-8 w-8 rounded-full object-cover"></img>
                            <span className="text-sm lg:text-base capitalize">{result.name}</span>
                        </div>
                    </Link>   
                ))}             
                <Link href={'/search'} className="block px-4 text-primary-main hover:text-primary-alt hover:bg-gray-100 rounded-3xl w-full text-center">
                    <div className="inline-flex space-x-1 items-center py-3">
                        <MagnifyingGlassIcon className="h-5 w-5"/>
                        <span className="text-sm lg:text-base capitalize">{"Expand Your Search"}</span>
                    </div>
                </Link> 
            </div>
        )
    };

    return(
        <div className={classNames(searchLocation == 'home' ? `` : 'px-2' ,`w-full flex-col`)}>
            <dl className="grid grid-cols-1 gap-10">
                <div className={classNames(searchLocation == 'home' ? `lg:justify-start` : ``, `flex justify-center`)}>
                    <div className="flex flex-col w-[325px] md:w-[500px] ">
                        <div className={classNames(searchLocation == 'home' ? `lg:justify-start` : '',`flex justify-center sm:flex-row flex-col gap-5 `)}>
                            <form action="" method="POST" className="py-1 pl-6 pr-6 flex gap-4 items-center text-heading-3 shadow-lg shadow-box-shadow
                            border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                                <MagnifyingGlassIcon className="text-gray-600 h-6 w-6"/>
                                <input type="text" autoComplete="off" name="web-page" value={input} placeholder="Search TikTok Username or Recipe" className="text-left w-[225px] md:w-[400px] text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setInput(e.target.value)}/>
                                <XMarkIcon onClick={clearSearch} className={classNames(input ? `text-red-600 hover:text-red-500 cursor-pointer` : `text-gray-600  cursor-default hover:text-gray-800`, `h-6 w-6 `)}/>
                            </form>  
                        </div>
                    </div>
                    {input && showDropDown && renderSearchResults()}
                </div>
            </dl>
        </div>
    )
}

interface AddOptionProps {
    setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function AddRecipeOption({setIsAddOpen}: AddOptionProps) {
    return(
        <div className="">
            <p className="text-center text-sm text-gray-500">{"OR"}</p>
            <div className="flex justify-center items-center pt-2">
                <Button className="bg-primary-main hover:bg-primary-alt text-white font-semibold py-2 px-4 rounded-3xl"
                    buttonType={"button"} 
                    isLink={false} 
                    onClick={() => setIsAddOpen(true)}
                    text={"Add Recipe"} 
                />
            </div>
        </div>
    )
}
