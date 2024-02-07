import { db } from "@/pages/api/firebase/firebase";
import { useEffect, useState } from "react";


const useErrorRecipeList = (ownerId: string | undefined) => {
    
    const [ errorRecipeList, setErrorRecipeList ] = useState<any>([])
    const [ isLoadingErrorRecipe, setIsLoadingErrorRecipe ] = useState<boolean>(true)

    useEffect(() => {

        const fetchErrorRecipes = async () => {
            try {
            const recipeSnapshot = await db.collection(`creators/${ownerId}/errors`).get();
            const updatedErrors = recipeSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            setErrorRecipeList(updatedErrors)
            setIsLoadingErrorRecipe(false)
            } catch (err) {
                console.error('Error fetching error recipes:', err)
            }
        }

        fetchErrorRecipes();
    },[ownerId])

    return { errorRecipeList, isLoadingErrorRecipe }

}

export default useErrorRecipeList