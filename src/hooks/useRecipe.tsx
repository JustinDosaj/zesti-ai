
import { useEffect, useState } from "react"
import { db } from "@/pages/api/firebase/firebase"
import { SendErrorToFirestore } from "@/pages/api/firebase/functions"

const useRecipe = (recipeId: string) => {
    
    const [ recipe, setRecipe ] = useState<any>([])
    const [ isLoadingRecipe, setIsLoadingRecipe ] = useState<boolean>(true)
    const [ error, setError ] = useState<string>('')

    useEffect(() => {

        const unsubscribe = db.doc(`recipes/${recipeId}`)
            .onSnapshot((docSnapshot) => {
                if(docSnapshot.exists) {
                    setRecipe(docSnapshot.data())
                } else {
                    setError('Recipe not found or missing permissions')
                }
                setIsLoadingRecipe(false)
            }, (err) => {
                setError(err.message)
                setIsLoadingRecipe(false)
                SendErrorToFirestore(null, err, recipeId, __filename)
            })
            
    },[recipeId])

    return { recipe, setIsLoadingRecipe, isLoadingRecipe, error}

}   

export default useRecipe