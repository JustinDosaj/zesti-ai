import { Container } from "@/components/shared/container"
import React, { useState, useEffect } from "react"
import { ArrowDownTrayIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid"
import { db } from "@/pages/api/firebase/firebase"
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from '@/components/shared/notify';
import { UserRemoveRecipeFromFirestore, saveRecipeReferenceToUser } from "@/pages/api/firebase/functions"
import { onSnapshot, doc } from "firebase/firestore";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import AdSenseDisplay from "@/components/tags/adsense"

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
    
    return(
        <div className="border rounded-xl p-4 alternate-orange-bg space-y-2">
            <div className="flex justify-between items-start">
                <div className="flex-grow">
                    <h1 className="text-xl font-semibold text-gray-900">{recipe.name}</h1>
                    <div className="flex items-center gap-1 text-gray-700 mt-1">
                        <span className="">by</span>
                        <button onClick={() => window.open(recipe.data.url)} className="underline flex justify-center gap-1 items-center font-semibold text-gray-700 hover:text-gray-500">
                            {recipe.data.owner.username}
                            <ArrowTopRightOnSquareIcon className="h-4 w-4"/>
                        </button>
                    </div>
                    <p className="text-gray-900 text-sm md:text-base mt-2">{recipe.description}</p>
                </div>
                <div className="flex flex-col items-end">
                    <button onClick={() => { isSaved ? onDeleteClick() : onSaveClick() }}>
                        {isSaved ? (
                            <BookmarkSlashIcon className="h-5 w-5 md:w-6 md:h-6 text-red-600 hover:text-red-500"/>
                        ) : (
                            <ArrowDownTrayIcon className="h-5 w-5 md:w-6 md:h-6 text-green-600 hover:text-green-500"/>
                        )}
                    </button>
                </div>
            </div>
    </div>
    )
}


function RecipeIngredientsComponent({ ingredients }: RecipeProps) {

    return (
        <div className="space-y-2 border rounded-xl p-4 alternate-orange-bg">
            <h2 className="section-desc-text-size font-semibold">Ingredients</h2>
            <ul className="space-y-2 list-disc pl-6 text-black">
                {ingredients?.map((ingredient: any, index: number) => (
                <li key={index} className="col-span-1 rounded-xl">
                    <div className="grid justify-start rounded-md overflow-visible w-full">
                        <div className="flex ml-1 mr-1.5 flex-shrink-0 items-center justify-center font-md text-gray-900 text-sm md:text-base">
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
        <div className="space-y-2 border rounded-xl p-4 alternate-orange-bg">
            <h2 className="section-desc-text-size font-semibold">Instructions</h2>
            <ul className="list-decimal pl-5 text-black">
                {instructions?.map((instruction: any, index: number) => (
                    <li key={index} className="col-span-1 rounded-xl">
                        <div className="grid justify-start rounded-md overflow-wrap w-full">
                            <div className="flex w-fit ml-1 mr-1.5 flex-shrink-0 items-center justify-center font-md text-gray-900 text-sm md:text-base">
                                {instruction}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

