
import { useEffect, useState } from "react"
import { db } from "@/pages/api/firebase/firebase"

const useCreatorRecipe = (ownerId: string | undefined, recipeId: string) => {
    
    const [ creatorRecipe, setCreatorRecipe ] = useState<any>([])
    const [ isLoadingCreatorRecipe, setIsLoadingCreatorRecipe ] = useState<boolean>(true)
    const [ error, setError ] = useState<string>('')

    useEffect(() => {

        const unsubscribe = db.doc(`creators/${ownerId}/recipes/${recipeId}`)
            .onSnapshot((docSnapshot) => {
                if(docSnapshot.exists) {
                    setCreatorRecipe(docSnapshot.data())
                } else {
                    setError('Recipe not found or missing permissions')
                }
                setIsLoadingCreatorRecipe(false)
            }, (err) => {
                setError(err.message)
                setIsLoadingCreatorRecipe(false)
            })
            
    },[ownerId, recipeId])

    return { creatorRecipe, isLoadingCreatorRecipe, error}

}   

export default useCreatorRecipe