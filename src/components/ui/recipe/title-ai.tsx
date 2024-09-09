import { TbDownload, TbBookmarkOff } from "react-icons/tb";
import { useModal } from "@/context/modalcontext";


interface RecipeCardTitleProps {
  recipe?: any;
  role?: string | null;
  isSaved?: boolean;
  isLoading?: boolean;
  user?: any;
  hasLiked?: boolean;
  likes?: number
  setHasLiked?: any;
  setLikes?: any;
}

export function AIRecipeTitleCard({ recipe, isSaved, user, isLoading, role }: RecipeCardTitleProps) {

    const { openModal } = useModal()
    const { data, description, name } = recipe;
    const { id, source, slug, url, owner } = data;
    const { username } = owner;


    async function onSaveClick() {
      const saveRecipe = (await import('@/pages/api/firebase/functions')).saveRecipeReferenceToUser;
  
      if (user && !isLoading) {
        await saveRecipe(user?.uid, id, 'ai-recipes').then(() => { openModal("Recipe Saved", "You can continue browsing or view all your saved recipes", "success", true, role) });
      } else {
        openModal("Account Required", "Please create an account to save recipes", "auth", false, role, id, slug, user?.uid, 'ai');
      }
    }
  
    const onDeleteClick = async () => {
      const deleteRecipe = (await import('@/pages/api/firebase/functions')).userRemoveRecipeFromFirestore;
  
      if (user) {
        await deleteRecipe(user?.uid, id, 'ai-recipes');
      }
    }
  
    return (
      <div className="bg-gray-50 border-gray-300 border shadow-md rounded-lg pt-6 mb-8">
        <div className="px-6">
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">{name}</h1>
          <div className="flex items-center gap-1 text-gray-700">
            <span>by</span>
            <div className="underline flex items-center font-semibold">
              {username}
            </div>
          </div>
  
          <p className="text-gray-700 mt-4">{description}</p>
  
          <div className="text-xs text-gray-500 mt-4">
              <div className="">
                <span className="font-semibold">Disclaimer: </span>
                <span>Recipe is AI Generated. </span>
                <span>Results not guaranteed. </span> 
              </div>
  
          </div>
        </div>
  
        <div className="border-t w-full border-gray-300 mt-4 flex">
          <button onClick={isSaved ? onDeleteClick : onSaveClick} className={`flex items-center gap-2 py-2 px-4 hover:bg-gray-100 w-full justify-center border-gray-300`}>
            {isSaved ?
                <span className="inline-flex space-x-2 items-center">
                    <TbBookmarkOff className=" text-red-600 h-5 w-5" /> 
                    <span className="text-gray-800">Delete Recipe</span> 
                </span>
            : 
                <span className="inline-flex space-x-2 items-center">
                    <TbDownload className=" text-green-600 h-5 w-5" />
                    <span className="text-gray-800">Save Recipe</span>  
                </span>
            }
          </button>
        </div>
  
      </div>
    );
}