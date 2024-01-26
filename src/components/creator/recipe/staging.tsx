import { useAuth } from '@/pages/api/auth/auth';
import Link from 'next/link';
import { PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect, useRef } from "react"
import algoliasearch from 'algoliasearch/lite';
import { Button } from '@/components/shared/button';
import { Container } from '@/components/shared/container';

// src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`}

export function StagingList({errorData, publicData, setIsOpen}: any) {

    const [ view, setView ] = useState<string>('public')
    const { creatorData } = useAuth();

    return (
    <Container className="grid justify-center w-full max-w-6xl mx-auto mt-6 pb-24 animate-fadeIn">
        <div className="p-6 bg-white rounded-3xl border shadow mt-2 w-[300px] xs:w-[400px] sm:w-[500px] md:w-[750px]">
            <div className="flex justify-end">
            <Button buttonType="button" text="Add New Recipe" onClick={() => setIsOpen(true)}/>
            </div>
            <AddRecipeSearch creatorData={creatorData}/>
            <div className="flex sm:justify-start gap-4 mt-4">
                <button onClick={() => setView('public')} className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-700 font-semibold px-4 rounded py-1 sm:py-2 sm:text-base">
                    {`Public (${publicData.length})`}
                </button>
                <button className={errorData ? `bg-red-600 hover:bg-red-300 text-white font-semibold px-4 py-1 sm:py-2 rounded text-sm sm:text-base` : `bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold py-1 sm:py-2 sm:text-base px-4 rounded`}
                    onClick={() => {
                        if(errorData.length > 0) {setView('errors')}
                        else {setView('public')}
                    }} 
                >
                    {`Errors (${errorData.length})`}
                </button>
            </div>
            <div className="mt-6 w-full">
                {view == 'errors' ? 
                errorData.map((item: any) => (
                    <div key={item.id} className="group relative border border-gray-200 p-2 rounded-2xl hover:bg-gray-100 w-full">
                        <div className="flex items-center">
                            <div className="flex-none w-24 relative mr-1 md:mr-4 p-1">
                                <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} alt={item.name} className="rounded-lg" />
                            </div>
                            <div className="flex-auto">
                                <h2 className="text-base sm:text-lg font-semibold text-gray-700">{item.title ? item.title : "Error"}</h2>
                                <div className="flex justify-start mt-1 p-1">
                                    <Link href={'/'}>
                                        <div className="text-white h-6 w-6 hover:text-gray-300 hover:bg-gray-400 bg-gray-500 rounded p-1 mr-2 flex items-center justify-center">
                                            <ArrowPathIcon className="h-5 w-5" />
                                        </div>
                                    </Link>
                                    <Link href={"/"}>
                                        <div className="text-white h-6 w-6 hover:bg-red-500 bg-red-600 rounded p-1 flex items-center justify-center">
                                            <TrashIcon className="h-5 w-5" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                : view == 'public' ? 
                    publicData.map((item: any) => (
                        <div key={item.id} className="group relative border border-gray-200 p-2 rounded-2xl hover:bg-gray-100 w-full mt-4">
                            <div className="flex items-center">
                                <div className="flex-none w-24 relative mr-1 md:mr-4 p-1">
                                    <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} alt={item.name} className="rounded-lg" />
                                </div>
                                <div className="flex-auto">
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-700">{item.name}</h2>
                                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">{item.id}</p>
                                    <div className="flex justify-start mt-1">
                                        <Link href={'/'}>
                                            <div className="text-white h-6 w-6 hover:text-gray-300 hover:bg-gray-400 bg-gray-500 rounded p-1 mr-2 flex items-center justify-center">
                                                <PencilIcon className="h-5 w-5" />
                                            </div>
                                        </Link>
                                        <Link href={"/"}>
                                            <div className="text-white h-6 w-6 hover:bg-red-500 bg-red-600 rounded p-1 flex items-center justify-center">
                                                <TrashIcon className="h-5 w-5" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                :
                <></>
                }
        </div>
      </div>
    </Container>
    );
}

export function AddRecipeSearch({creatorData}: any) {

    const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY}`);
    const recipesIndex = searchClient.initIndex('test_RECIPES_TIKTOK');
    const [ url, setUrl ] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any>({ recipes: [] });

    useEffect(() => {
      if (url.trim()) {
          handleSearch(url);
      }
    }, [url]);

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
              <div className="absolute z-20 mt-2 max-w-xs lg:max-w-2xl bg-white shadow-lg border border-gray-200 rounded-3xl">
                  {combinedResults.map((result, index) => (
                      <Link key={index} href={`/${result.owner_display_url}/${result.objectID}`} className="block px-4  text-gray-700 hover:bg-gray-100 rounded-3xl">
                          <div className="inline-flex space-x-2 items-center py-3">
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
        <div className="mt-4">
            <input type="text" placeholder="Search your public recipes" className="p-2 w-full border rounded-3xl" onChange={(e) => setUrl(e.target.value)}/>
        </div>
        {url && renderSearchResults()}
        </>
    )
}
