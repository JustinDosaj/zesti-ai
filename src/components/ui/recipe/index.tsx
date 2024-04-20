import { Container } from "@/components/shared/container"
import React, { useState, useEffect } from "react"
import { ArrowDownTrayIcon, EyeIcon, TrashIcon } from "@heroicons/react/20/solid"
import { db } from "@/pages/api/firebase/firebase"
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from '@/components/shared/notify';
import { UserRemoveRecipeFromFirestore, saveRecipeReferenceToUser } from "@/pages/api/firebase/functions"
import { onSnapshot, doc } from "firebase/firestore";

interface RecipeProps {
    recipe?: any,
    setIsOpen?: any,
    ingredients?: any,
    instructions?: any,
}

export function PublicRecipe({recipe, setIsOpen}: RecipeProps) {

    return(
    <Container className={"flex flex-col gap-6 animate-fadeInFast alternate-orange-bg rounded-3xl md:w-[599px] p-8 mb-16"}>
        <RecipeTitleDescriptionComponent recipe={recipe}/>
        <RecipeLinks recipe={recipe} setIsOpen={setIsOpen}/>
        <RecipeIngredientsComponent ingredients={recipe?.ingredients}/>
        <RecipeInstructionsComponent instructions={recipe?.instructions}/>
        <RecipeMainButtonComponent/>
    </Container>
    )
}

function RecipeTitleDescriptionComponent({recipe}: RecipeProps) {
    
    return (
        <div className="grid justify-center items-center text-center gap-y-2">
            <span className="text-xl font-semibold">{recipe.name}</span>
            <button onClick={() => window.open(recipe.data.owner.profile_link)} className="flex justify-center gap-1 items-center text-gray-700 font-semibold hover:text-gray-500 underline"> 
                <EyeIcon className="h-4 w-4"/>
                <span className="">{recipe.data.owner.username}</span>
            </button>
            <p className="text-gray-500 text-sm">{recipe.description}</p>
        </div>
    )
}

function RecipeIngredientsComponent({ ingredients }: RecipeProps) {

    return (
        <div className="space-y-2">
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
        <div className="space-y-2">
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

function RecipeMainButtonComponent() {

    return(
        <div className="grid justify-center">Upgrade to premium button?</div>
    )
}

function RecipeLinks({recipe, setIsOpen}: RecipeProps) {

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

    const navigation = [
        { 
            name: `See Video`,
            onClick: () => window.open(recipe.data.url),
            icon: (props: any) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    {...props}
                    className="h-3 w-3 md:h-4 md:w-4">
                    <path
                        fill="currentColor"
                        d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
            ),
        },
        {
            name: isSaved ? 'Delete' : 'Save',
            onClick: isSaved ? () => onDeleteClick() : () => onSaveClick(),
            icon: isSaved ? TrashIcon : ArrowDownTrayIcon,
        }
    ]

    return(
    <div className="flex justify-evenly">
        {navigation.map((nav: any) => (
            <button key={nav.name} onClick={nav.onClick} className="text-gray-700 hover:text-gray-500 inline-flex space-x-1 items-center justify-center w-1/3">
                <nav.icon className="h-4 w-4 md:h-5 md:w-5"/>
                <p className="capitalize text-sm lg:text-base text-left">{nav.name}</p>
            </button>
        ))}
    </div>
    )
}
