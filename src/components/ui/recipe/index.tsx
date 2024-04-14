import Link from "next/link"
import { SharedSectionHeadingTitle } from "@/components/shared/title"
import { Button } from "@/components/shared/button"
import { Container } from "@/components/shared/container"
import React, { useState, useRef, useEffect } from "react"
import { RecipeListLoader } from "@/components/shared/loader"
import { ArrowDownTrayIcon, EyeIcon, TrashIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/router"
import { db } from "@/pages/api/firebase/firebase"
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from '@/components/shared/notify';
import { UserRemoveRecipeFromFirestore, saveRecipeReferenceToUser } from "@/pages/api/firebase/functions"
import { onSnapshot, doc } from "firebase/firestore";

interface RecipeProps {
    recipe?: any,
    setIsOpen?: any,
    owner_id?: string,
    isEditMode?: boolean,
    setEditMode?: any,
    setIsSupportOpen?: any,
    ingredients?: any,
    instructions?: any,
    role?: string | null,
    user_id?: string,
    owner_name?: string,
    recipe_name?: string,
    recipe_title?: string,
}

export function PublicRecipe({recipe, isEditMode, setEditMode, setIsOpen, setIsSupportOpen}: RecipeProps) {

    return(
    <Container className={"flex flex-col gap-6 animate-fadeInFast alternate-orange-bg rounded-3xl md:w-[599px] p-8 mb-16"}>
        <RecipeTitleDescriptionComponent recipe_name={recipe.name} recipe_title={recipe.video_title}/>
        <RecipeLinks recipe={recipe} setIsOpen={setIsOpen} isEditMode={isEditMode}/>
        <RecipeIngredientsComponent ingredients={recipe?.ingredients}/>
        <RecipeInstructionsComponent instructions={recipe?.instructions}/>
        <RecipeMainButtonComponent/>
    </Container>
    )
}

function RecipeTitleDescriptionComponent({recipe_name, recipe_title}: RecipeProps) {
    
    return (
        <div className="grid justify-center items-center">
            <span className="section-desc-title-size text-center">{recipe_name}</span>
            <p className="text-center text-gray-500 text-sm">{recipe_title}</p>
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

    const router = useRouter()
    const { isLoading, user } = useAuth()
    const [isSaved, setIsSaved] = useState(false);


    // Checking if user owns recipe already
    useEffect(() => {
        if(user) {
            const docRef = doc(db, `users/${user.uid}/recipes`, recipe.data.id);
            const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
                setIsSaved(docSnapshot.exists());
            }, (error) => {
                console.error("Error checking recipe save status:", error);
            });

            return () => unsubscribe();
        }
    }, [user, recipe.data.id]);

    async function onSaveClick() {
        if (user && !isLoading) {
            try {
                await saveRecipeReferenceToUser(user?.uid, recipe.data.id);
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
            await UserRemoveRecipeFromFirestore(user?.uid, recipe.data.id);
            return true; 
        }
        return false;
    }

    const navigation = [
        { 
            name: recipe.data.owner.username,
            onClick: () => window.open(recipe.data.owner.profile_link),
            icon: EyeIcon,
        },
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

interface RecipeCardListProps {
    recipes: any,
    maxDisplayCount?: number,
    incrementCount?: number
    owner_id?: string,
    max?: number,
    loading?: boolean,
  }

export function RecipeCardList({recipes, maxDisplayCount = 9, incrementCount = 9, max = 0, loading}: RecipeCardListProps) {
    const [ displayCount, setDisplayCount ] = useState(maxDisplayCount)
    const containerRef = useRef<HTMLDivElement>(null);
  
    const sortedData = recipes?.sort((a: any, b: any) => {
      // Convert dates to timestamps, treating invalid or absent dates as 0
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
  
      // If both dates are invalid or missing, maintain their order
      if (dateA === 0 && dateB === 0) return 0;
  
      // A valid date is always considered "greater" than an invalid or missing one
      if (dateA === 0) return 1;
      if (dateB === 0) return -1;
  
      // If both dates are valid, sort them in descending order
      return dateB - dateA;
    });
  
    const shouldShowLoadMore = max > 0
    ? (displayCount < recipes.length && displayCount <= max)
    : (displayCount < recipes.length);
  
    const handleLoadMore = () => {
      setDisplayCount((prevCount) => {
          const newCount = prevCount + incrementCount;
          // If there's a max limit and adding incrementCount exceeds it, only go up to max
          if (max && newCount > max) {
            return max;
          }
          return newCount;
        });
    }
    
    if(loading) return(<RecipeListLoader/>)

    return(
      <Container className={"grid justify-center lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
            <div className="space-y-2 animate-fadeIn">
                <SharedSectionHeadingTitle title={"Recipes"} className="py-3"/>
                <div ref={containerRef} className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-4`} >
                    {sortedData.slice(0,displayCount).map((item: any) => (
                        <RecipeCard item={item} key={item.name}/>
                    ))}
                    {shouldShowLoadMore && (
                        <div className="grid justify-center py-6">
                            <Button onClick={handleLoadMore} isLink={false} className="bg-primary-main rounded-3xl hover:bg-primary-alt text-white font-semibold py-2 px-4" text="Load More" buttonType="button"/>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    )
}

interface RecipeCardProps {
    item: any,
    key?: any,
}

export function RecipeCard({item, key}: RecipeCardProps) {
    return(
        <div key={key} className="group relative w-[335px] lg:w-[400px]">
            {/* Image and Details */}
            <div className="flex items-center space-x-4 border p-4 rounded-3xl max-w-2xl">
                <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} className="h-[136px] w-[96px] rounded-xl object-cover" alt={item.title}/>
                <div className="flex-grow space-y-1 lg:space-y-2">
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-700">{item?.name}</h3>
                    {/* Additional Details */}
                    <div className="flex gap-4 text-xs lg:text-sm text-gray-600">
                        <span className="inline-flex gap-1 items-center">
                        <p className="font-bold">Ingredients:</p>
                        <p>{item.ingredients?.length}</p>
                        </span>
                        <span className="inline-flex gap-1 items-center">
                        <p className="font-bold">Steps:</p>
                        <p>{item.instructions?.length}</p>
                        </span>
                    </div>
                    <div className="flex gap-1 text-xs lg:text-sm text-gray-600 items-center">
                    <p className="text-sm text-gray-600">{item?.video_title}</p> {/* Recipe Name */}
                    </div>
                </div>
            </div>
            {/* Overlay Icon */}
            <Link href={`/recipe/${item?.data?.id}`} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-3xl hover:animate-fadeInExtraFast">
                <EyeIcon className="text-white h-10 w-10 hover:text-gray-300 hover:bg-gray-500 bg-gray-700 rounded-xl p-1"/>
            </Link>
        </div>
    )
}