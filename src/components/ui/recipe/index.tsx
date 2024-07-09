import { ArrowDownTrayIcon, BookmarkSlashIcon, ArrowTopRightOnSquareIcon, ShareIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import convertDurationToReadable from "@/utils/recipe-time-format";

interface RecipeProps {
  recipe?: any;
  setIsOpen?: any;
  setIsErrorOpen?: any;
  ingredients?: any;
  instructions?: any;
  role?: string | null;
  isSaved?: boolean;
  video_id?: string;
  isLoading?: boolean;
  user?: any;
}

export function RecipeTitleCard({ recipe, setIsOpen, isSaved, user, isLoading }: RecipeProps) {
  async function onSaveClick() {
    const saveRecipe = (await import('@/pages/api/firebase/functions')).saveRecipeReferenceToUser;

    if (user && !isLoading) {
      await saveRecipe(user?.uid, recipe.data.unique_id).then(() => { setIsOpen(true) });
    } else {
      const Notify = (await import('@/components/shared/notify')).Notify;
      Notify("Please login to save recipes");
    }
  }

  const onDeleteClick = async () => {
    const deleteRecipe = (await import('@/pages/api/firebase/functions')).userRemoveRecipeFromFirestore;

    if (user) {
      await deleteRecipe(user?.uid, recipe.data.unique_id);
    }
  }

  const onShareClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    const Notify = (await import('@/components/shared/notify')).Notify;
    Notify("Recipe URL copied to clipboard.");
  }

  return (
    <div className="bg-gray-50 border-gray-300 border shadow-md rounded-lg pt-6 mb-8">
      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 px-6">{recipe.name}</h1>
      <div className="flex items-center gap-1 text-gray-700 mt-2 px-6">
        <span>by</span>
        <button onClick={() => window.open(recipe.data.url)} className="underline flex items-center font-semibold hover:text-gray-600">
          {recipe?.data?.owner?.username}
          <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
        </button>
      </div>
      <p className="text-gray-700 mt-4 px-6">{recipe.description}</p>
      <div className="border-t w-full border-gray-300 mt-6 flex">
        <button onClick={onShareClick} className="recipe-title-button border-r text-blue-600">
          <ShareIcon className="h-5 w-5" />
          <span>Share</span>
        </button>
        <button onClick={isSaved ? onDeleteClick : onSaveClick} className={`recipe-title-button text-green-600 ${isSaved ? `text-red-600` : `text-green-600`}`}>
          {isSaved ? <BookmarkSlashIcon className="h-5 w-5" /> : <ArrowDownTrayIcon className="h-5 w-5" />}
          <span>{isSaved ? 'Remove' : 'Save'}</span>
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
      <div className="recipe-component-container">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">More Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-900">
          {cuisine && (
            <div className="recipe-information-spacer">
              <span className="font-semibold">Cuisine:</span>
              <span className="ml-2">{cuisine}</span>
            </div>
          )}
          <div className="recipe-information-spacer">
            <span className="font-semibold">Category:</span>
            <span className="ml-2">{category || 'N/A'}</span>
          </div>
          <div className="recipe-information-spacer">
            <span className="font-semibold">Prep Time:</span>
            <span className="ml-2">{prep_time ? convertDurationToReadable(prep_time) : 'N/A'}</span>
          </div>
          <div className="recipe-information-spacer">
            <span className="font-semibold">Cook Time:</span>
            <span className="ml-2">{cook_time ? convertDurationToReadable(cook_time) : 'N/A'}</span>
          </div>
          <div className="recipe-information-spacer">
            <span className="font-semibold">Owner:</span>
            <button onClick={() => window.open(owner.profile_link)} className="ml-2 underline hover:text-gray-500">
              {`@${owner.username}`}
            </button>
          </div>
          <div className="recipe-information-spacer">
            <span className="font-semibold">Source:</span>
            <span className="ml-2">{source}</span>
          </div>
          <div className="recipe-information-spacer">
            <span className="font-semibold">Created:</span>
            <span className="ml-2">{date_created !== null ? new Date(date_created).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="recipe-information-spacer">
            <span className="font-semibold">Added:</span>
            <span className="ml-2">{new Date(date_added).toLocaleDateString()}</span>
          </div>
        </div>
        <button onClick={() => setIsErrorOpen(true)} className="mt-6 flex items-center justify-center w-full py-2 text-red-600">
          <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
          <span>Report Problem or Give Feedback</span>
        </button>
      </div>
    );
  }
  


