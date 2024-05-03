import React, { useState, useEffect, useRef } from "react"
import { ArrowDownTrayIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid"
import { db } from "@/pages/api/firebase/firebase"
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from '@/components/shared/notify';
import { UserRemoveRecipeFromFirestore, saveRecipeReferenceToUser } from "@/pages/api/firebase/functions"
import { onSnapshot, doc } from "firebase/firestore";
import { ArrowTopRightOnSquareIcon, ShareIcon } from "@heroicons/react/24/outline"
import { EyeIcon } from "@heroicons/react/20/solid";
import AdSenseDisplay from "@/components/tags/adsense"
import Image from "next/image";
import { HorizontalBorder } from "@/components/shared/border";

interface RecipeProps {
    recipe?: any,
    setIsOpen?: any,
    ingredients?: any,
    instructions?: any,
    role?: string | null,
}

export function PublicRecipe({recipe, setIsOpen, role}: RecipeProps) {

    return(
    <div className={"flex flex-col gap-8 animate-fadeInFast mb-16 mx-auto w-full lg:max-w-3xl px-3 sm:px-8 md:px-14 lg:px-5"}>
        <RecipeTitleCard recipe={recipe} setIsOpen={setIsOpen}/>
        <AdSenseDisplay adSlot="4329661976" adFormat="horizontal" widthRes="false" role={role}/>
        <RecipeIngredientsComponent ingredients={recipe?.ingredients}/>
        <AdSenseDisplay adSlot="1690723057" adFormat="horizontal" widthRes="false" role={role}/>
        <RecipeInstructionsComponent instructions={recipe?.instructions}/>
        <AdSenseDisplay adSlot="9326575118" adFormat="horizontal" widthRes="false" role={role}/>
        <RecipeVideoComponent recipe={recipe}/>
        <AdSenseDisplay adSlot="3730001953" adFormat="horizontal" widthRes="false" role={role}/>
        <RecipeDataComponent recipe={recipe}/>
        <AdSenseDisplay adSlot="9315400934" adFormat="horizontal" widthRes="false" role={role}/>
    </div>
    )
}

function RecipeTitleCard({recipe, setIsOpen}: RecipeProps) {

    const { isLoading, user } = useAuth()
    const [ isSaved, setIsSaved ] = useState(false);

    // Checking if user owns recipe already
    useEffect(() => {
        if(user) {
            const docRef = doc(db, `users/${user.uid}/recipes`, recipe.data.unique_id);
            const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
                setIsSaved(docSnapshot.exists());
            }, (error) => {
                console.error("Error checking recipe save status:", error);
            });

            return () => unsubscribe();
        }
    }, [user, recipe?.data?.id]);

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
                            {recipe.data.owner.username}
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

function RecipeDataComponent({ recipe }: RecipeProps) {
    
    const { date_added, date_created, owner, source, video_id, url, unique_id, music_info } = recipe?.data;

    return (
        <div className="recipe-page-container">
            <h2 className="recipe-page-section-title pb-1">Extra Information</h2>
                {/* Image container */}
                {/* Text section */}
                <div className="flex flex-col justify-between mt-6 md:mt-0 w-full space-y-4">
                    {/* Video title and description */}
                    <div className="space-y-6 h-full">
                        <div className="grid space-y-1 max-w-[250px]">
                            <div className="recipe-information-container">
                                <span className="text-gray-700 font-semibold">Owner:</span>
                                <button onClick={() => window.open(owner.profile_link)} className="underline text-sm md:text-base flex items-center font-semibold text-gray-700 hover:text-gray-500">
                                   {`@${owner.username}`}
                                </button>
                            </div>
                            <div className="recipe-information-container">
                                <span className="font-semibold">Video ID:</span>
                                <span className="pb-0.5">{video_id}</span>
                            </div>
                            <div className="recipe-information-container">
                                <span className="font-semibold">Zesti ID:</span>
                                <span className="pb-0.5">{unique_id}</span>
                            </div>
                            <div className="recipe-information-container">
                                <span className="font-semibold">Music ID:</span>
                                <span className="pb-0.5">{music_info?.id || "N/A"}</span>
                            </div>
                            <div className="recipe-information-container">
                                <span className="font-semibold">Source:</span>
                                <span>{source}</span>
                            </div>
                            <div className="recipe-information-container">
                                <p className="font-semibold">Created:</p>
                                <p>{new Date(date_created).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <HorizontalBorder/>
                    {/* Date info */}
                    <div className="flex justify-start text-xs space-x-1 text-gray-500 ">
                            <p className="font-semibold">Date Added:</p>
                            <p className="">{new Date(date_added).toLocaleDateString()}</p>
                    </div>
                </div>
        </div>
    );
}

function RecipeVideoComponent({ recipe }: RecipeProps) {
    
    const { date_added, date_created, owner, source, video_id, url, unique_id, music_info } = recipe?.data;
    const { video_title, cover_image_url } = recipe;
    const tikTokRef = useRef(null);
    
    useEffect(() => {
        const loadTikTokScript = () => {
            const script = document.createElement('script');
            script.src = "https://www.tiktok.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
        }

        if (tikTokRef.current) {
            (tikTokRef.current as HTMLDivElement).innerHTML = `
                <blockquote class="tiktok-embed" cite="${url}" data-video-id="${video_id}" style="max-width: 605px;min-width: 325px;">
                    <section>
                        <a target="_blank" title="@${owner.username}" href="https://www.tiktok.com/@${owner.username}?refer=embed">@${owner.username}</a>
                        <p>${video_title}</p>
                        <a target="_blank" title="${music_info?.title || ''}" href="https://www.tiktok.com/music/original-sound-${music_info?.id || ''}?refer=embed">${ music_info?.title || ''}</a>
                    </section>
                </blockquote>
            `;
            loadTikTokScript();
          }

    },[])

    return (
        <div className="rounded-xl  space-y-2">
            <div className="md:flex gap-6">
                <div className="flex w-full " ref={tikTokRef}/>
            </div>
        </div>
    )
}

