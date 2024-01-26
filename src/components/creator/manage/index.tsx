import { useAuth } from '@/pages/api/auth/auth';
import Link from 'next/link';
import { PencilIcon, TrashIcon, ArrowPathIcon, LinkIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect } from "react"
import algoliasearch from 'algoliasearch/lite';
import { Button } from '@/components/shared/button';
import { Container } from '@/components/shared/container';
import { deleteCreatorError } from '@/pages/api/firebase/functions';
import { Notify } from '@/components/shared/notify';


export function CreatorAddRecipeLinkComponent({url, setUrl}: any) {

    return(
    <div className="grid items-center mt-2 space-y-2">
        <div className="inline-flex gap-1">
            <span className="text-gray-700 font-semibold text-left">Step 1:</span>
            <span className="text-gray-600">Copy & Paste Video Link</span>
        </div>
        <div className="gap-5 w-full justify-center mt-1">
            <form action="" method="POST" className="py-1 pl-6 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
            border border-box-border bg-box-bg rounded-lg ease-linear focus-within:bg-body  focus-within:border-primary">
                <LinkIcon className="text-gray-600 h-6 w-6"/>
                <input type="text" name="web-page" value={url} placeholder="Paste Your TikTok Video Link" className="w-full text-gray-500 py-2 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
            </form>
        </div>
    </div>
    )
}

export function CreatorAddRecipeTextComponent({rawText, setRawText}: any) {
    return(
        <div className="pt-6">
            <div className="grid text-left">
                <span className="text-gray-700 font-semibold text-left">Step 2:</span>
                <span className="text-gray-600">Enter ingredients & instructions if not available in video audio</span>
            </div>
            <textarea
                value={rawText}
                onChange={(e) => {setRawText(e.target.value)}}
                className={`text-gray-500 whitespace-normal w-full bg-gray-100 mt-2 p-2 rounded-lg text-sm h-36`}
                placeholder={`Enter the ingredients & instructions for recipe`}
            />
            <div className={`inline-flex items-center space-x-2`}>
            <ExclamationCircleIcon className="h-4 w-4 text-white rounded-3xl bg-yellow-400"/>
            <p className="text-xs text-gray-600">Do not worry about being organized, Zesti will structure the recipe for you</p>
            </div>
      </div>
    )
}

export function CreatorResubmitRecipeTextComponent({rawText, setRawText}: any) {
    return(
        <div className="pt-6">
            <div className="grid text-left">
                <span className="text-gray-700 font-semibold text-left">Step 1:</span>
                <span className="text-gray-600">Please enter ingredients & instructions for the recipe and try submitting again</span>
            </div>
            <textarea
                value={rawText}
                onChange={(e) => {setRawText(e.target.value)}}
                className={`text-gray-500 whitespace-normal w-full bg-gray-100 mt-2 p-2 rounded-lg text-sm h-36`}
                placeholder={`Enter the ingredients & instructions for recipe`}
            />
            <div className={`inline-flex items-center space-x-2`}>
            <ExclamationCircleIcon className="h-4 w-4 text-white rounded-3xl bg-yellow-400"/>
            <p className="text-xs text-gray-600">Do not worry about being organized, Zesti will structure the recipe for you</p>
            </div>
      </div>
    )
}

export function ManageRecipesList({errorData, publicData, setIsOpen, setIsResubmitOpen, setUrl, setRecipeId, setIsDeleteOpen}: any) {

    const [ view, setView ] = useState<string>('public')
    const { creatorData, user } = useAuth();

    const onResubmitClick = async (url: string, recipe_id: string) => {
        setUrl(url)
        setRecipeId(recipe_id)
        setIsResubmitOpen(true)
    }

    const onPublicRecipeDelete = async (recipe_id: string) => {
        setRecipeId(recipe_id)
        setIsDeleteOpen(true)
    }

    const onDeleteFromErrorsClick = async (recipe_id: string) => {
        await deleteCreatorError(user?.uid, recipe_id)
        Notify("Removed recipe from errors")
    }

    const onViewSelect = async (currentView: string) => {
        if(currentView == 'errors') {
            errorData.length > 0 ? setView(currentView) : setView('public')
        } else if (currentView == 'public') {
            setView(currentView)
        }
    }

    return (
    <Container className="grid justify-center w-full max-w-6xl mx-auto mt-6 pb-24 animate-fadeIn">
        <div className="p-6 bg-white rounded-3xl border shadow mt-2 w-[300px] xs:w-[400px] sm:w-[500px] md:w-[750px]">
            <div className="flex justify-end">
            <Button buttonType="button" text="Add New Recipe" onClick={() => setIsOpen(true)}/>
            </div>
            <ManageRecipesSearch creatorData={creatorData}/>
            <div className="flex sm:justify-start gap-4 mt-4">
                <button onClick={() => onViewSelect('public')} className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-700 font-semibold px-4 rounded py-1 sm:py-2 sm:text-base">
                    {`Public (${publicData.length})`}
                </button>
                <button onClick={() => onViewSelect('errors')} className={errorData.length > 0 ? `bg-red-600 hover:bg-red-300 text-white font-semibold px-4 py-1 sm:py-2 rounded text-sm sm:text-base` : `bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold py-1 sm:py-2 sm:text-base px-4 rounded`}>
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
                                    <button onClick={() => onResubmitClick(item.url, item.id)}>
                                        <div className="text-white h-6 w-6 hover:text-gray-300 hover:bg-gray-400 bg-gray-500 rounded p-1 mr-2 flex items-center justify-center">
                                            <ArrowPathIcon className="h-5 w-5" />
                                        </div>
                                    </button>
                                    <button onClick={() => onDeleteFromErrorsClick(item.id)}>
                                        <div className="text-white h-6 w-6 hover:bg-red-500 bg-red-600 rounded p-1 flex items-center justify-center">
                                            <TrashIcon className="h-5 w-5" />
                                        </div>
                                    </button>
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
                                        <Link href={`/${creatorData?.display_url}/${item.id}`}>
                                            <div className="text-white h-6 w-6 hover:text-gray-300 hover:bg-gray-400 bg-gray-500 rounded p-1 mr-2 flex items-center justify-center">
                                                <PencilIcon className="h-5 w-5" />
                                            </div>
                                        </Link>
                                        <button onClick={() => onPublicRecipeDelete(item.id)}>
                                            <div className="text-white h-6 w-6 hover:bg-red-500 bg-red-600 rounded p-1 flex items-center justify-center">
                                                <TrashIcon className="h-5 w-5" />
                                            </div>
                                        </button>
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

export function ManageRecipesSearch({creatorData}: any) {

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
              <div className="absolute w-[250] xs:w-[350px] sm:w-[450px] md:w-[700px] z-20 mt-2  bg-white shadow-lg border border-gray-200 rounded-3xl">
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
        <div className="mt-4">
            <input type="text" placeholder="Search your public recipes" className="p-2 w-full border rounded-3xl" onChange={(e) => setUrl(e.target.value)}/>
        </div>
        {url && renderSearchResults()}
        </>
    )
}
