import { ArrowDownTrayIcon, BookmarkSlashIcon, ArrowTopRightOnSquareIcon, ShareIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import convertDurationToReadable from "@/utils/recipe-time-format";
import { useModal } from "@/context/modalcontext";
import { UpdateLikesInFirebase } from "@/pages/api/firebase/functions";
import Link from "next/link";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { classNames } from "@/components/shared/classNames";


interface RecipeProps {
  recipe?: any;
  setIsErrorOpen?: any;
  ingredients?: any;
  instructions?: any;
  role?: string | null;
  isSaved?: boolean;
  video_id?: string;
  isLoading?: boolean;
  user?: any;
  hasLiked?: boolean;
  likes?: number
  setHasLiked?: any;
  setLikes?: any;
}

export function RecipeTitleCard({ recipe, isSaved, user, isLoading, role, hasLiked, likes = 0, setHasLiked, setLikes }: RecipeProps) {

  const { openModal } = useModal()

  async function onSaveClick() {
    const saveRecipe = (await import('@/pages/api/firebase/functions')).saveRecipeReferenceToUser;

    if (user && !isLoading) {
      await saveRecipe(user?.uid, recipe.data.id).then(() => { openModal("Recipe Saved", "You can continue browsing or view all your saved recipes", "My Recipes", "success", true, role) });
    } else {
      const Notify = (await import('@/components/shared/notify')).Notify;
      Notify("Please login to save recipes");
    }
  }

  const onDeleteClick = async () => {
    const deleteRecipe = (await import('@/pages/api/firebase/functions')).userRemoveRecipeFromFirestore;

    if (user) {
      await deleteRecipe(user?.uid, recipe.data.id);
    }
  }

  const onShareClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    const Notify = (await import('@/components/shared/notify')).Notify;
    Notify("Recipe URL copied to clipboard.");
  }

  const onLikeClick = async () => {
    
    if(!user) {
      openModal("Login Required", "Please login to like recipes", "Login", "error", false, role);
      return;
    }

    if(hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
      await UpdateLikesInFirebase({recipeId: recipe.data.id, remove: true });
      return;
    }

    if(!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      await UpdateLikesInFirebase({recipeId: recipe.data.id, remove: false });
    }

  }

  return (
    <div className="bg-gray-50 border-gray-300 border shadow-md rounded-lg pt-6 mb-8">

      <div className="px-6">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">{recipe.name}</h1>

        <div className="flex items-center gap-1 text-gray-700">
          <span>by</span>
          <button onClick={() => window.open(recipe.data.url)} className="underline flex items-center font-semibold hover:text-gray-600">
            {recipe?.data?.owner?.username}
            <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
          </button>
        </div>

        <p className="text-gray-700 mt-4">{recipe.description}</p>

        <div className="text-xs text-gray-500 mt-4">
            <div className="">
              <span className="font-semibold">Disclaimer: </span>
              <span>Recipe is retrieved from {recipe.data.source}. </span>
              <span>Results may vary. </span> 
              <Link href="/about/faq" className="underline">Click here</Link>
              <span> to learn more.</span>
            </div>

        </div>
      </div>

      <div className="border-t w-full border-gray-300 mt-4 flex">
        <button onClick={onShareClick} className="recipe-title-button border-r text-blue-600">
          <ShareIcon className="h-5 w-5" />
        </button>
        <button onClick={isSaved ? onDeleteClick : onSaveClick} className={`recipe-title-button text-green-600 ${isSaved ? `text-red-600` : `text-green-600`}`}>
          {isSaved ? <BookmarkSlashIcon className="h-5 w-5" /> : <ArrowDownTrayIcon className="h-5 w-5" />}
        </button>
        <button onClick={onLikeClick} className="recipe-title-button border-l">
          <HandThumbUpIcon className={classNames( hasLiked ? `text-green-600` : `text-gray-500` , `h-5 w-5`)}/>
          <span>{likes}</span>
        </button>
      </div>

    </div>
  );
}

  export function RecipeIngredientsComponent({ ingredients }: RecipeProps) {
    return (
      <div className="recipe-component-container">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Ingredients</h2>
        <ul className="list-disc pl-6 text-gray-900">
          {ingredients?.map((ingredient: any, index: number) => (
            <li key={index} className="mb-2">{ingredient}</li>
          ))}
        </ul>
      </div>
    );
  }
  

  export function RecipeInstructionsComponent({ instructions }: RecipeProps) {
    return (
      <div className="recipe-component-container">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Instructions</h2>
        <ol className="list-decimal pl-6 text-gray-900 space-y-2">
          {instructions?.map((instruction: any, index: number) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    );
  }

  export function RecipeDataComponent({ recipe, setIsErrorOpen }: RecipeProps) {
    const { date_added, date_created, owner, source } = recipe?.data;
    const { cook_time, prep_time, category, cuisine } = recipe;
  
    return (
      <div className="recipe-component-container p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">More Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900">
          {cuisine && (
            <div className="recipe-information-item">
              <span className="font-semibold">Cuisine:</span>
              <span className="ml-2">{cuisine}</span>
            </div>
          )}
          <div className="recipe-information-item">
            <span className="font-semibold">Category:</span>
            <span className="ml-2">{category || 'N/A'}</span>
          </div>
          <div className="recipe-information-item">
            <span className="font-semibold">Prep Time:</span>
            <span className="ml-2">{prep_time ? convertDurationToReadable(prep_time) : 'N/A'}</span>
          </div>
          <div className="recipe-information-item">
            <span className="font-semibold">Cook Time:</span>
            <span className="ml-2">{cook_time ? convertDurationToReadable(cook_time) : 'N/A'}</span>
          </div>
          <div className="recipe-information-item">
            <span className="font-semibold">Owner:</span>
            <button onClick={() => window.open(owner.profile_link)} className="ml-2 underline hover:text-gray-500">
              {`@${owner.username}`}
            </button>
          </div>
          <div className="recipe-information-item">
            <span className="font-semibold">Source:</span>
            <span className="ml-2">{source}</span>
          </div>
          <div className="recipe-information-item">
            <span className="font-semibold">Created:</span>
            <span className="ml-2">{date_created ? new Date(date_created).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="recipe-information-item">
            <span className="font-semibold">Added:</span>
            <span className="ml-2">{new Date(date_added).toLocaleDateString()}</span>
          </div>
        </div>
        <button onClick={() => setIsErrorOpen(true)} className="mt-8 flex items-center justify-center w-full py-3 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition duration-200">
          <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
          <span>Report Problem or Give Feedback</span>
        </button>
      </div>
    );
  }
  


