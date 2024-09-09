import { TbDownload, TbBookmarkOff, TbExternalLink, TbThumbUp, TbLink } from "react-icons/tb";
import { useModal } from "@/context/modalcontext";
import { UpdateLikesInFirebase } from "@/pages/api/firebase/functions";
import Link from "next/link";
import { classNames } from "@/components/shared/classNames";
import { useState } from "react";


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

export function RecipeTitleCard({ recipe, isSaved, user, isLoading, role, hasLiked, likes = 0, setHasLiked, setLikes }: RecipeCardTitleProps) {

  const { openModal } = useModal()
  const [likesDisabled, setLikesDisabled] = useState<boolean>(false);
  const { data, description, name } = recipe;
  const { id, source, slug, url, owner } = data;
  const { username } = owner;

  async function onSaveClick() {
    const saveRecipe = (await import('@/pages/api/firebase/functions')).saveRecipeReferenceToUser;

    if (user && !isLoading) {
      await saveRecipe(user?.uid, id).then(() => { openModal("Recipe Saved", "You can continue browsing or view all your saved recipes", "success", true, role) });
    } else {
      openModal("Account Required", "Please create an account to save recipes", "auth", false, role, id, slug, user?.uid);
    }
  }

  const onDeleteClick = async () => {
    const deleteRecipe = (await import('@/pages/api/firebase/functions')).userRemoveRecipeFromFirestore;

    if (user) {
      await deleteRecipe(user?.uid, id);
    }
  }

  const onShareClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    const Notify = (await import('@/components/shared/notify')).Notify;
    Notify("Recipe URL copied to clipboard.");
  }

  const onLikeClick = async () => {
    
    if(!user) {
      openModal("Account Required", "Please create an account to like recipes", "auth", false, role, id, slug, user?.uid);
      return;
    }

    setLikesDisabled(true);

    if(hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
      await UpdateLikesInFirebase({recipeId: id, remove: true }).then(() => setLikesDisabled(false));
      return;
    }

    if(!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      await UpdateLikesInFirebase({recipeId: id, remove: false }).then(() => setLikesDisabled(false));
    }

  }

  return (
    <div className="bg-gray-50 border-gray-300 border shadow-md rounded-lg pt-6 mb-8">
      <div className="px-6">
        <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">{name}</h1>
        <div className="flex items-center gap-1 text-gray-700">
          <span>by</span>
          <button onClick={() => window.open(url)} className="underline flex items-center font-semibold hover:text-gray-600">
            {username}
            <TbExternalLink className="w-3.5 lg:w-4 ml-1" />
          </button>
        </div>

        <p className="text-gray-700 mt-4">{description}</p>

        <div className="text-xs text-gray-500 mt-4">
            <div className="">
              <span className="font-semibold">Disclaimer: </span>
              <span>Recipe is retrieved from {source}. </span>
              <span>Results may vary. </span> 
              <Link href="/about/faq" className="underline">Click here</Link>
              <span> to learn more.</span>
            </div>

        </div>
      </div>

      <div className="border-t w-full border-gray-300 mt-4 flex py-0.5">
        <button onClick={onShareClick} className="recipe-title-button border-r text-blue-600">
          <TbLink className="h-6 w-6" />
        </button>
        <button onClick={isSaved ? onDeleteClick : onSaveClick} className={`recipe-title-button text-green-600 ${isSaved ? `text-red-600` : `text-green-600`}`}>
          {isSaved ? <TbBookmarkOff className="h-6 w-6" /> : <TbDownload className="h-5 w-5" />}
        </button>
        <button disabled={likesDisabled} onClick={onLikeClick} className="recipe-title-button border-l">
          <TbThumbUp className={classNames( hasLiked ? `text-green-600` : `text-gray-500` , `h-6 w-6`)}/>
          <span className="text-gray-700">{likes}</span>
        </button>
      </div>

    </div>
  );
}