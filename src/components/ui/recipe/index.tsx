import React from "react"
import { ArrowDownTrayIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid"
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from '@/components/shared/notify';
import { UserRemoveRecipeFromFirestore, saveRecipeReferenceToUser } from "@/pages/api/firebase/functions"
import { ArrowTopRightOnSquareIcon, ShareIcon } from "@heroicons/react/24/outline"
import AdSenseDisplay from "@/components/tags/adsense"

interface RecipeProps {
    recipe?: any,
    setIsOpen?: any,
    ingredients?: any,
    instructions?: any,
    role?: string | null,
    isSaved?: boolean,
    video_id?: string
}

export function PublicRecipe({recipe, setIsOpen, role, isSaved}: RecipeProps) {

    const { video_id } = recipe?.data
    const { ingredients, instructions } = recipe

    return(
    <div className={"flex flex-col gap-8 animate-fadeInFast mb-16 mx-auto w-full lg:max-w-3xl px-4 sm:px-8 md:px-14 lg:px-5"}>
        <RecipeTitleCard recipe={recipe} setIsOpen={setIsOpen} isSaved={isSaved}/>
        <AdSenseDisplay adSlot="4329661976" adFormat="horizontal" widthRes="false" role={role}/>
        <RecipeIngredientsComponent ingredients={ingredients}/>
        <AdSenseDisplay adSlot="1690723057" adFormat="horizontal" widthRes="false" role={role}/>
        <RecipeInstructionsComponent instructions={instructions}/>
        <AdSenseDisplay adSlot="9326575118" adFormat="horizontal" widthRes="false" role={role}/>
        <RecipeVideoComponent video_id={video_id}/>
        <AdSenseDisplay adSlot="9315400934" adFormat="horizontal" widthRes="false" role={role}/>
    </div>
    )
}

function RecipeTitleCard({recipe, setIsOpen, isSaved}: RecipeProps) {

    const { isLoading, user } = useAuth()

    async function onSaveClick() {
        if (user && !isLoading) {
            try {
                await saveRecipeReferenceToUser(user?.uid, recipe.data.unique_id);
                setIsOpen(true)
                return true; // Explicitly returning a boolean value
            } catch (error) {
                console.error("Error saving recipe:", error);
                return false;
            }
        } else {
            Notify("Please login to save recipes")
            return false; // Or some appropriate boolean value based on your logic
        }
    }

    const onDeleteClick = async () => {
        if(user) {
            await UserRemoveRecipeFromFirestore(user?.uid, recipe.data.unique_id);
            return true; 
        }
        return false;
    }

    const onShareClick = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            Notify("Recipe URL copied to clipboard.")
        } catch (error) {
            console.error('Failed to copy:', error);
        }

    }
    
    return(
        <div className="recipe-page-container pb-0 pl-0 pr-0 ">
            <div className="flex flex-col space-y-4">
                <div className="pl-6 pr-6">
                    <h1 className="text-xl font-semibold text-gray-900">{recipe.name}</h1>
                    <div className="flex items-center gap-1 text-gray-700">
                        <span className="recipe-page-description">by</span>
                        <button onClick={() => window.open(recipe.data.url)} className="recipe-page-description underline flex items-center font-semibold hover:text-gray-700">
                            {recipe?.data?.owner?.username}
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1"/>
                        </button>
                    </div>
                    <p className="recipe-page-description mt-2">{recipe.description}</p>
                </div>
                {/* Remove padding here if it's set, and ensure full width for border */}
                <div className="border-t w-full border-gray-400 border-opacity-75 flex justify-between ">
                    <button onClick={onShareClick} className="recipe-page-button border-r border-gray-400 border-opacity-75 rounded-bl-xl">
                        <ShareIcon className="recipe-page-link-icon text-blue-600 hover:text-blue-500"/>
                        <span className="text-sm md:text-base text-gray-900">Share</span>
                    </button>
                    <button onClick={isSaved ? onDeleteClick : onSaveClick} className="recipe-page-button rounded-br-xl">
                        {isSaved ? (
                            <BookmarkSlashIcon className="recipe-page-link-icon text-red-600 hover:text-red-500"/>
                        ) : (
                            <ArrowDownTrayIcon className="recipe-page-link-icon text-green-600 hover:text-green-500"/>
                        )}
                        <span className="text-sm md:text-base text-gray-900">{isSaved ? 'Remove' : 'Save'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

function RecipeIngredientsComponent({ ingredients }: RecipeProps) {

    return (
        <div className="recipe-page-container">
            <h2 className="recipe-page-section-title">Ingredients</h2>
            <ul className="space-y-2 list-disc pl-6 text-black">
                {ingredients?.map((ingredient: any, index: number) => (
                <li key={index} className="col-span-1 rounded-xl">
                    <div className="grid justify-start rounded-md overflow-visible w-full">
                        <div className="flex ml-1 mr-1.5 flex-shrink-0 items-center recipe-page-description">
                            {ingredient}
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}

function RecipeInstructionsComponent({ instructions }: RecipeProps) {
    
    return(
        <div className="recipe-page-container">
            <h2 className="recipe-page-section-title">Instructions</h2>
            <ul className="list-decimal text-sm md:text-base pl-5 text-black space-y-2">
                {instructions?.map((instruction: any, index: number) => (
                    <li key={index} className="col-span-1 rounded-xl">
                        <div className="grid justify-start rounded-md overflow-wrap w-full">
                            <div className="flex w-fit ml-1 mr-1.5 flex-shrink-0 items-center recipe-page-description">
                                {instruction}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function RecipeVideoComponent({ video_id }: RecipeProps) {

    return (
        <div className="rounded-xl overflow-hidden alternate-orange-bg w-fit mx-auto h-full">

            <iframe
                className="w-full max-w-[325px] min-w-[325px] min-h-[800px]"
                src={`https://www.tiktok.com/embed/${video_id}`}
                allow="fullscreen"
                loading="lazy"
            />
    
        </div>
    )
}

