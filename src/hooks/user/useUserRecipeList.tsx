import { db } from "@/pages/api/firebase/firebase"
import { onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"
import { SendErrorToFirestore } from '@/pages/api/firebase/functions';

const useUserRecipeList = (user: any | null, isLoading: boolean) => {

    const [ userRecipeList, setUserRecipeList ] = useState<any[]>([])
    const [ loadingUserRecipes, setLoadingUserRecipes ] = useState<boolean>(true)

    useEffect(() => {
        if(user) {
            const recipesRef = db.collection('users').doc(user.uid).collection('recipes')
            const unsubscribe = onSnapshot(recipesRef, (querySnapshot) => {
                const updatedRecipes = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
                setUserRecipeList(updatedRecipes)
                setLoadingUserRecipes(false)
            }, (error) => {
                SendErrorToFirestore(user?.uid, error, null, __filename)
                setLoadingUserRecipes(false)
            })
        }
    },[user, isLoading])

    return { userRecipeList, loadingUserRecipes }
}

export default useUserRecipeList