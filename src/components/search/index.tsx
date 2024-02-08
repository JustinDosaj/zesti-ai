import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Notify } from "../shared/notify"
import { InlineBtnLink } from "../shared/button"
import algoliasearch from 'algoliasearch/lite';
import { XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React, { useState, useEffect  } from "react"

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function Search() {

    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY}`);
    const creatorsIndex = searchClient.initIndex(`${process.env.NEXT_PUBLIC_ALGOLIA_CREATOR_RECIPE_INDEX}`);
    const recipesIndex = searchClient.initIndex(`${process.env.NEXT_PUBLIC_ALGOLIA_RECIPE_INDEX}`);
    
    const [ input, setInput ] = useState<string>('');
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
        if (input.trim()) {
            handleSearch(input);
        }
    }, [input]);

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

        return (
            <div className="absolute z-20 mt-16 w-full max-w-xs lg:max-w-md bg-white shadow-lg border border-gray-200 rounded-3xl">
                {combinedResults.map((result, index) => (
                    <>{result.display_name ? 
                        <Link key={index} href={`/${result.display_url}`} className="block px-4 text-gray-700 hover:bg-gray-100 rounded-3xl">
                            <div className="inline-flex items-center py-3 space-x-3">
                                <img src={result.avatar_url} alt={result.display_name} className="h-8 w-8 rounded-full"></img>
                                <span className="text-sm lg:text-base capitalize">{result.display_name}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="h-[13px] w-[13px] text-gray-500">
                                    <path fill="currentColor" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                </svg>
                            </div>
                        </Link>
                        :
                        <Link key={index} href={`/${result.owner_display_url}/${result.objectID}`} className="block px-4  text-gray-700 hover:bg-gray-100 rounded-3xl">
                            <div className="inline-flex space-x-3 items-center py-3">
                                <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(result.cover_image_url)}?alt=media`} alt={result.name} className="h-8 w-8 rounded-full"></img>
                                <span className="text-sm lg:text-base capitalize">{result.name}</span>
                            </div>
                        </Link>
                        }
                    </>
                ))}
            </div>
        );
    };

    return(

        <div className="w-full flex-col px-2">
            <dl className="grid grid-cols-1 gap-10">
                <div className="w-full flex flex-col items-center">
                    <div className="flex sm:flex-row flex-col gap-5">
                        <form action="" method="POST" className="py-1 pl-6 pr-6 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                            <MagnifyingGlassIcon className="text-gray-600 h-6 w-6"/>
                            <input type="text" name="web-page" value={input} placeholder="Search TikTok Username or Recipe" className="text-left w-56 lg:w-96 text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setInput(e.target.value)}/>
                            <XMarkIcon onClick={() => setInput('')} className={classNames(input ? `text-red-600 hover:text-red-500 cursor-pointer` : `text-gray-600 cursor-default hover:text-gray-800`, `h-6 w-6 `)}/>
                        </form>  
                    </div>
                    {input && renderSearchResults()}
                    <div className="text-gray-500 mt-4 text-center">
                        <span>Can&apos;t find a tiktok account or recipe? </span>
                        <InlineBtnLink href={'/tools/video'} text="Click here"/>
                        <span> to save any TikTok recipe</span>
                    </div>
                </div>
            </dl>
        </div>

    )
}

export function HomePageSearch() {

    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY}`);
    const creatorsIndex = searchClient.initIndex('test_CREATORS');
    const recipesIndex = searchClient.initIndex('test_RECIPES_TIKTOK');
    
    const [ input, setInput ] = useState<string>('');
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
        if (input.trim()) {
            handleSearch(input);
        }
    }, [input]);

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

        return (
            <div className="absolute z-20 mt-16 w-full max-w-xs lg:max-w-md bg-white shadow-lg border border-gray-200 rounded-3xl">
                {combinedResults.map((result, index) => (
                    <>{result.display_name ? 
                        <Link key={index} href={`/${result.display_url}`} className="block px-4 text-gray-700 hover:bg-gray-100 rounded-3xl">
                            <div className="inline-flex items-center py-3 space-x-3">
                                <img src={result.avatar_url} alt={result.display_name} className="h-8 w-8 rounded-full"></img>
                                <span className="text-sm lg:text-base capitalize">{result.display_name}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="h-[13px] w-[13px] text-gray-500">
                                    <path fill="currentColor" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                </svg>
                            </div>
                        </Link>
                        :
                        <Link key={index} href={`/${result.owner_display_url}/${result.objectID}`} className="block px-4  text-gray-700 hover:bg-gray-100 rounded-3xl">
                            <div className="inline-flex space-x-3 items-center py-3">
                                <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(result.cover_image_url)}?alt=media`} alt={result.name} className="h-8 w-8 rounded-full"></img>
                                <span className="text-sm lg:text-base capitalize">{result.name}</span>
                            </div>
                        </Link>
                        }
                    </>
                ))}
            </div>
        );
    };

    return(

        <div className="w-full flex-col">
            <dl className="grid grid-cols-1 gap-10">
                <div className="w-full flex flex-col">
                    <div className="flex sm:flex-row flex-col gap-5 justify-center lg:justify-start">
                        <form action="" method="POST" className="py-1 pl-6 pr-6 flex gap-4 items-center text-heading-3 shadow-lg shadow-box-shadow
                        border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                            <MagnifyingGlassIcon className="text-gray-600 h-6 w-6"/>
                            <input type="text" name="web-page" value={input} placeholder="Search TikTok Username or Recipe" className="text-left w-56 lg:w-96 text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setInput(e.target.value)}/>
                            <XMarkIcon onClick={() => setInput('')} className={classNames(input ? `text-red-600 hover:text-red-500 cursor-pointer` : `text-gray-600 cursor-default hover:text-gray-800`, `h-6 w-6 `)}/>
                        </form>  
                    </div>
                    {input && renderSearchResults()}
                    <div className="text-gray-500 mt-4 text-center">
                        <span>Can&apos;t find a tiktok account or recipe? </span>
                        <InlineBtnLink href={'/tools/video'} text="Click here"/>
                        <span> to save any TikTok recipe</span>
                    </div>
                </div>
            </dl>
        </div>

    )
    
}

export function ManageRecipesSearch({creatorData}: any) {

    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY}`);
    const recipesIndex = searchClient.initIndex('test_RECIPES_TIKTOK');
    const [ input, setInput ] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any>({ recipes: [] });

    useEffect(() => {
      if (input.trim()) {
          handleSearch(input);
      }
    }, [input]);

    const handleSearch = async (query: any) => {
      try {
          const [ recipes ] = await Promise.all([
              recipesIndex.search(query, {
                filters: `owner_display_url:"${creatorData.display_url}"` // Adding filter for owner_display_name
            })
          ]);
          setSearchResults({ recipes: recipes?.hits });
      } catch (error) {
          console.error("Algolia search error:", error);
      }
  };

      const renderSearchResults = () => {
          // Combine and limit results
          const combinedResults = [...searchResults.recipes.slice(0, 5)].slice(0, 5);

          if (combinedResults.length === 0) {
              return null;
          }

          return (
              <div className="absolute w-[275px] xs:w-[350px] sm:w-[450px] md:w-[700px] z-20 mt-1 bg-white shadow-lg border border-gray-200 rounded-3xl">
                  {combinedResults.map((result, index) => (
                      <Link key={index} href={`/${result.owner_display_url}/${result.objectID}`} className="block px-4  text-gray-700 hover:bg-gray-100 rounded-3xl">
                          <div className="inline-flex space-x-2 items-center py-2">
                              <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(result.cover_image_url)}?alt=media`} alt={result.name} className="h-8 w-8 rounded-full"></img>
                              <span className="text-sm lg:text-base capitalize">{result.name}</span>
                          </div>
                      </Link>
                  ))}
              </div>
          );
      };

    return(
        <>
        <form action="" method="POST" className="mt-4 py-1 pl-6 pr-6 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear">
            <MagnifyingGlassIcon className="text-gray-600 h-6 w-6"/>
            <input type="text" value={input} placeholder="Search your public recipes" className="text-left w-full text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setInput(e.target.value)}/>
            <XMarkIcon onClick={() => setInput('')} className={classNames(input ? `text-red-600 hover:text-red-500 cursor-pointer` : `text-gray-600 cursor-default hover:text-gray-800`, `h-6 w-6 `)}/>
        </form>
        {input && renderSearchResults()}
        </>
    )
}