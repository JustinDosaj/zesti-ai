import { ArrowDownTrayIcon, BookmarkSlashIcon, ArrowTopRightOnSquareIcon, ShareIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { useAuth } from "@/pages/api/auth/auth";
import convertDurationToReadable from "@/utils/recipe-time-format";
import dynamic from "next/dynamic";

interface RecipeProps {
    recipe?: any,
    setIsOpen?: any,
    setIsErrorOpen?: any,
    ingredients?: any,
    instructions?: any,
    role?: string | null,
    isSaved?: boolean,
    video_id?: string,
    isLoading?: boolean,
    user?: any,
}

export function PublicRecipe({recipe, setIsOpen, role, isSaved, setIsErrorOpen}: RecipeProps) {

    const { video_id } = recipe?.data
    const { ingredients, instructions, data } = recipe
    const { user } = useAuth();

    const AdSenseDisplay = dynamic(() => import('@/components/tags/adsense'), {
        ssr: false,
        loading: () => <div style={{ height: '90px' }}/>  // Placeholder while loading
    });

    const TikTokVideo = dynamic(() => import('./tiktok'), {
        ssr: false, 
        loading: () => <div style={{ height: '90px' }}/> // Placeholder while loading
    });

    const InstagramVideo = dynamic(() => import('./instagram'), {
        ssr: false,
        loading: () => <div style={{ height: '90px' }}/> // Placeholder while loading
    });

    return(
        <div className={"flex flex-col gap-8 mb-16 mx-auto w-full lg:max-w-3xl px-4 sm:px-8 md:px-14 lg:px-5 mt-2 lg:mt-8  animate-fadeIn"}>
            <RecipeTitleCard recipe={recipe} setIsOpen={setIsOpen} isSaved={isSaved} user={user}/>
            <AdSenseDisplay adSlot="4329661976" adFormat="horizontal" widthRes="false" role={role}/>
            <RecipeIngredientsComponent ingredients={ingredients}/>
            <AdSenseDisplay adSlot="1690723057" adFormat="horizontal" widthRes="false" role={role}/>
            <RecipeInstructionsComponent instructions={instructions}/>
            <AdSenseDisplay adSlot="9326575118" adFormat="horizontal" widthRes="false" role={role}/>

            {/* Check recipe source to determine which embedded post needs to be shown */}
            {data.source == 'tiktok' ?
            <TikTokVideo video_id={video_id}/>
            :
            <InstagramVideo video_id={video_id}/>
            }
            <AdSenseDisplay adSlot="9315400934" adFormat="horizontal" widthRes="false" role={role}/>
            <RecipeDataComponent recipe={recipe} setIsErrorOpen={setIsErrorOpen}/>
        </div>
    )
}

function RecipeTitleCard({recipe, setIsOpen, isSaved, isLoading, user}: RecipeProps) {

    async function onSaveClick() {

        const saveRecipe = (await (import ('@/pages/api/firebase/functions'))).saveRecipeReferenceToUser

        if (user && !isLoading) {

            await saveRecipe(user?.uid, recipe.data.unique_id).then(() => { setIsOpen(true) });

        } else {

            const Notify = (await (import ('@/components/shared/notify'))).Notify 
            Notify("Please login to save recipes")
             
        }
    }

    const onDeleteClick = async () => {

        const deleteRecipe = (await (import ('@/pages/api/firebase/functions'))).userRemoveRecipeFromFirestore

        if(user) {
            await deleteRecipe(user?.uid, recipe.data.unique_id);
        }
    }

    const onShareClick = async () => {
        await navigator.clipboard.writeText(window.location.href);

        const Notify = (await (import ('@/components/shared/notify'))).Notify
        Notify("Recipe URL copied to clipboard.")
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
                                <span>{ingredient}</span>
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

function RecipeDataComponent({ recipe, setIsErrorOpen }: RecipeProps) {

    const { date_added, date_created, owner, source } = recipe?.data;
    const { cook_time, prep_time, category, cuisine } = recipe

    return (
        <div className="recipe-page-container">
            <h2 className="recipe-page-section-title pb-1">More Information</h2>
            <div className="md:flex gap-6">
                <div className="flex flex-col justify-between space-y-4">
                    {/* Video title and description */}
                    <div className="space-y-6 h-full">
                        <div className="grid space-y-1 max-w-[250px]">
                            { cuisine && (<div className="recipe-information-container">
                                <span className="font-semibold">Cuisine:</span>
                                <span className="pb-0.5">{cuisine || 'N/A'}</span>
                            </div>)}

                            <div className="recipe-information-container">
                                <span className="font-semibold">Category</span>
                                <span className="pb-0.5">{category || 'N/A'}</span>
                            </div>
                            <div className="recipe-information-container">
                                <span className="font-semibold">Prep Time:</span>
                                <span className="pb-0.5">{prep_time || 'N/A'}</span>
                            </div>
                            <div className="recipe-information-container">
                                <span className="font-semibold">Cook Time:</span>
                                <span className="pb-0.5">{cook_time || 'N/A'}</span>
                            </div>
                            <div className="recipe-information-container">
                                <span className="text-gray-700 font-semibold">Owner:</span>
                                <button onClick={() => window.open(owner.profile_link)} className="underline text-sm md:text-base flex items-center font-semibold text-gray-700 hover:text-gray-500">
                                   {`@${owner.username}`}
                                </button>
                            </div>
                            <div className="recipe-information-container">
                                <span className="font-semibold">Source:</span>
                                <span>{source}</span>
                            </div>
                            <div className="recipe-information-container">
                                <p className="font-semibold">Created:</p>
                                <p>{date_created !== null ? new Date(date_created).toLocaleDateString() : `N/A`}</p>
                            </div>
                            <div className="recipe-information-container">
                                <p className="font-semibold">Added:</p>
                                <p>{new Date(date_added).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <button onClick={() => setIsErrorOpen(true)}className="inline-flex justify-center mx-auto w-full items-center space-x-1 py-4 text-red-600">
                <ExclamationTriangleIcon className="h-4 w-4 text-red-600 mt-1"/>
                <p className="underline text-gray-700 hover:text-gray-500">Report Problem or Give Feedback</p>
            </button>
        </div>
    );
}


