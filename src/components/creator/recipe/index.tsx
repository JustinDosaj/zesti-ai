import { Container } from "@/components/shared/container"
import { ArrowDownTrayIcon, CheckIcon, EyeIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { db } from "@/pages/api/firebase/firebase"
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from '@/components/shared/notify';
import React, { useState, useEffect } from "react"
import { Button, AltButton } from "@/components/shared/button"
import { saveFromCreatorToUser } from "@/pages/api/firebase/functions"


interface CreatorRecipeProps {
    recipe: any,
    url?: string,
    setLoginPrompt?: any
    owner_id: string,
    setEditMode?: any,
}

export function CreatorRecipe({recipe, url, setLoginPrompt, owner_id, setEditMode}: CreatorRecipeProps) {

    const {user, isCreator} = useAuth()

    return(
    <Container className={"flex flex-col gap-6 animate-fadeInFast alternate-orange-bg rounded-3xl md:w-[599px] p-8 mb-16"}>
        <div className="grid justify-center items-center">
            <span className="section-desc-title-size text-center">{recipe.name}</span>
            <p className="text-center text-gray-500 text-sm">{recipe.title}</p>
        </div>
        <CreatorRecipeLinks recipe={recipe} setLoginPrompt={setLoginPrompt} isEdit={false}/>
        <div className="space-y-2">
            <h2 className="section-desc-text-size font-semibold">Ingredients</h2>
            <ul className="space-y-2 list-disc pl-6 text-black">
                {recipe?.ingredients?.map((ingredient: any, index: number) => (
                <li key={index} className="col-span-1 rounded-xl">
                    <div className="flex rounded-md overflow-visible w-full">
                        <div className="flex ml-1 mr-1.5 flex-shrink-0 items-center justify-center font-md text-gray-900 text-sm md:text-base">
                            {ingredient}
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
        <div className="space-y-2">
            <h2 className="section-desc-text-size font-semibold">Instructions</h2>
            <ul className="list-decimal pl-5 text-black">
                {recipe?.instructions?.map((instruction: any, index: number) => (
                    <li key={index} className="col-span-1 rounded-xl">
                        <div className="flex rounded-md overflow-wrap w-full">
                            <div className="flex w-fit ml-1 mr-1.5 flex-shrink-0 items-center justify-center font-md text-gray-900 text-sm md:text-base">
                                {instruction}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className={user?.uid == owner_id ? `grid justify-center` : 'hidden'}>
            <Button buttonType="button" text="Edit Recipe" className="w-fit" onClick={() => {setEditMode(true)}}/>
        </div>
    </Container>
    )
}

export function EditCreatorRecipe({recipe, url, setLoginPrompt, owner_id, setEditMode}:CreatorRecipeProps) {

    const {user, isCreator} = useAuth()
    const [editedIngredients, setEditedIngredients] = useState<string[]>([]);
    const [editedInstructions, setEditedInstructions] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState<string>('');
    const [newInstruction, setNewInstruction] = useState<string>('');
    const [editedName, setEditedName] = useState<string>('')
    const [ startDelete, setStartDelete ] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        setEditedIngredients(recipe.ingredients || []);
        setEditedInstructions(recipe.instructions || [])
        setEditedName(recipe.name || '')
    }, [recipe.ingredients, recipe.instructions, recipe.name]);

    const handleIngredientChange = (index: number, newValue: string) => {
        const updatedIngredients = [...editedIngredients];
        updatedIngredients[index] = newValue;
        setEditedIngredients(updatedIngredients);
    };

    const handleInstructionChange = (index: number, newValue: string) => {
        const updatedInstructions = [...editedInstructions];
        updatedInstructions[index] = newValue;
        setEditedInstructions(updatedInstructions);
    };

    const handleAddIngredient = () => {
        if (newIngredient.trim() === '') {
            // Optionally handle empty input, such as showing an error message
            return;
        }

        setEditedIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        setNewIngredient(''); // Reset new ingredient input field
    }

    const handleDeleteIngredient = (indexToRemove: number) => {
        setEditedIngredients(prevIngredients =>
            prevIngredients.filter((_, index) => index !== indexToRemove)
        );
    }

    const handleAddInstruction = () => {
        if (newInstruction.trim() === '') {
            // Optionally handle empty input, such as showing an error message
            return;
        }

        setEditedInstructions(prevInstructions => [...prevInstructions, newInstruction]);
        setNewInstruction(''); // Reset new ingredient input field
    }

    const handleDeleteInstruction = (indexToRemove: number) => {
        setEditedInstructions(prevInstructions =>
            prevInstructions.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleSave = async () => {

        try{
            if(owner_id == user?.uid) {
                await db.doc(`creators/${owner_id}/recipes/${recipe.id}`).update({
                    ingredients: editedIngredients,
                    instructions: editedInstructions,
                    name: editedName,
                })
                await db.doc(`recipes-tiktok/${recipe.id}`).update({
                    ingredients: editedIngredients,
                    instructions: editedInstructions,
                    name: editedName,
                })
                setEditMode(false)
                Notify("Recipe changes saved")
            }
        } catch(err) {
            console.log(err)
        }
        // Logic to save updatedRecipe to the database
        // ...
    };

    const deleteRecipe = async (recipeId: string) => {
        try {
            if(owner_id == user?.uid) {
                await db.doc(`creators/${owner_id}/recipes/${recipeId}`).delete();
                await db.doc(`creators/${owner_id}/tiktokurl/${recipeId}`).delete();
                setEditMode(false)
                Notify("Recipe changes saved")
                router.push('/creator/home')
            }
        } catch(err) {
        
        }
    }

    return(
    <Container className={"flex flex-col gap-6 animate-fadeInFast alternate-orange-bg rounded-3xl md:w-[599px] p-8 mb-16"}>
        <div className="grid justify-center items-center">
            <input 
                type="text"
                className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm md:text-base text-center text-gray-600"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
            />
            
            <p className="text-center text-gray-500 text-sm">{recipe.title}</p>
        </div>
        <CreatorRecipeLinks recipe={recipe} setLoginPrompt={setLoginPrompt} isEdit={true}/>
        <div className="space-y-2">
            <h2 className="section-desc-text-size font-semibold">Ingredients</h2>
            <ul className="list-disc pl-6 text-black">
                {editedIngredients.map((ingredient, index) => (
                    <li key={index} className="mb-2 relative">
                        <input 
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm md:text-base text-gray-600"
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                        />
                        <button 
                            onClick={() => handleDeleteIngredient(index)}
                            className="absolute inset-y-0 right-0 flex items-center pr-2"
                        >
                            <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-300"/>
                        </button>
                    </li>
                ))}
                    <li className="relative mb-2">
                        <input 
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm md:text-base pr-10 text-gray-600"
                            value={newIngredient}
                            placeholder="Add new ingredient"
                            onChange={(e: any) => setNewIngredient(e.target.value)}
                        />
                        <button 
                            onClick={handleAddIngredient}
                            className="absolute inset-y-0 right-0 flex items-center pr-2 pl-2"
                        >
                            <PlusIcon className="h-5 w-5 text-green-500 hover:text-green-300 rounded-xl"/>
                        </button>
                    </li>
   
            </ul>
        </div>
        <div className="space-y-2">
            <h2 className="section-desc-text-size font-semibold">Ingredients</h2>
            <ul className="list-disc pl-6 text-black">
                {editedInstructions.map((instruction, index) => (
                    <li key={index} className="relative mb-2">
                        <input 
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm md:text-base pr-10 text-gray-600"
                            value={instruction}
                            onChange={(e) => handleInstructionChange(index, e.target.value)}
                        />
                        <button 
                            onClick={() => handleDeleteInstruction(index)}
                            className="absolute inset-y-0 right-0 flex items-center pr-2 pl-2"
                        >
                            <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-300 rounded-xl"/>
                        </button>
                    </li>  
                ))}
                    <li className="relative mb-2">
                        <input 
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm md:text-base pr-10 text-gray-600"
                            value={newInstruction}
                            placeholder="Add new instruction"
                            onChange={(e: any) => setNewInstruction(e.target.value)}
                        />
                        <button 
                            onClick={handleAddInstruction}
                            className="absolute inset-y-0 right-0 flex items-center pr-2 pl-2"
                        >
                            <PlusIcon className="h-5 w-5 text-green-500 hover:text-green-300 rounded-xl"/>
                        </button>
                    </li>
            </ul>
        </div>
        <div className="inline-flex gap-4 justify-center">
            <AltButton buttonType="button" text="Cancel" className="w-full" onClick={() => setEditMode(false)}/>
            <Button buttonType="button" text="Save" className="w-full" onClick={handleSave}/>
        </div>
        <div className="inline-flex justify-center items-center gap-1">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600"/>
            { startDelete == false ?
            <button onClick={() => setStartDelete(true)}>
                <span className="underline text-red-600 hover:text-red-400">Delete Recipe</span>
            </button>
            :
            <div className="inline-flex">
                <span className="text-gray-700  mr-1">Confirm Deletion:</span>
                <div className="inline-flex space-x-4">
                    <button onClick={() => setStartDelete(false)} className="inline-flex items-center gap-0.5">
                        <XMarkIcon className="h-6 w-6 text-red-600"/>
                        <span className="text-sm md:text-base underline">Cancel</span>
                    </button>
                    <button onClick={() => deleteRecipe(recipe.id)} className="inline-flex items-center gap-0.5">
                        <CheckIcon className="h-5 w-5 text-green-600  "/>
                        <span className="text-sm md:text-base underline">Delete</span>
                    </button>
                </div>
            </div>
            }
        </div>
    </Container>
    )
}

interface CreatorRecipeLinksProps {
    recipe: any,
    setLoginPrompt: any,
    isEdit: boolean,
}

export function CreatorRecipeLinks({recipe, setLoginPrompt, isEdit}: CreatorRecipeLinksProps) {

    const router = useRouter()
    const { isLoading, user } = useAuth()

    const navigation = [
        { 
            name: recipe.owner_display_name,
            onClick: () => router.push(`/${recipe.owner_display_url}`),
            icon: EyeIcon,
        },
        { 
            name: `See Video`,
            onClick: () => window.open(recipe.url),
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
    ]

        if(isEdit == false) {
            navigation.push({
                name: 'Save',
                onClick: async () => {
                    if (user && !isLoading) {
                        try {
                            await saveFromCreatorToUser(user?.uid, recipe.id, recipe);
                            Notify("Recipe saved to your dashboard");
                            return true; // Explicitly returning a boolean value
                        } catch (error) {
                            console.error("Error saving recipe:", error);
                            return false;
                        }
                    } else {
                        setLoginPrompt(true);
                        return false; // Or some appropriate boolean value based on your logic
                    }
                },
                icon: ArrowDownTrayIcon,
            });
        }



    return(
    <div className="flex justify-evenly">
        {navigation.map((nav: any) => (
            <button key={nav.name} onClick={nav.onClick} className="text-gray-700 hover:text-gray-500 inline-flex space-x-2 items-center justify-center">
                <nav.icon className="h-4 w-4 md:h-5 md:w-5"/>
                <p className="capitalize text-sm lg:text-base text-left">{nav.name}</p>
            </button>
        ))}
    </div>
    )
}