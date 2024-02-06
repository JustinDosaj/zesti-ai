import { useEffect, useState } from "react";
import { db } from "@/pages/api/firebase/firebase";


const getUserRecipe = (userId: string | undefined, recipeId: string) => {
    
    const [ userRecipe, setUserRecipe ] = useState<any>(null)
    const [ loadingUserRecipe, setLoadingUserRecipe ] = useState<boolean>(true)
    const [ error, setError ] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = db.doc(`users/${userId}/recipes/${recipeId}`)
            .onSnapshot((docSnapshot) => {
                if(docSnapshot.exists) {
                    setUserRecipe(docSnapshot.data())
                } else {
                    setError('Recipe not found or missiing permissions');
                }
                setLoadingUserRecipe(false)
            }, (err) => {
                setError(err.message)
                setLoadingUserRecipe(false)
            })

    },[userId, recipeId])


    return { userRecipe, loadingUserRecipe, error }

}

export default getUserRecipe