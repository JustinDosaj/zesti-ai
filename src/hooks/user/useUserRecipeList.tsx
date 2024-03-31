import { db } from "@/pages/api/firebase/firebase"
import { onSnapshot, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { SendErrorToFirestore } from '@/pages/api/firebase/functions';

interface Recipe {
    id: string;
    date: string;
}

const useUserRecipeList = (user: any | null, isLoading: boolean) => {
    const [userRecipeList, setUserRecipeList] = useState<any[]>([]);
    const [loadingUserRecipes, setLoadingUserRecipes] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            const recipesRef = db.collection('users').doc(user.uid).collection('recipes');
            const unsubscribe = onSnapshot(recipesRef, async (querySnapshot) => {
                setLoadingUserRecipes(true);

                const recipeFetchPromises = querySnapshot.docs.map(async (doc) => {
                    const recipeRefData = doc.data();
                    const recipeRef = recipeRefData.recipeRef; // Assuming this is a DocumentReference
                    const recipeSnapshot = await getDoc(recipeRef);

                    if (recipeSnapshot.exists()) {
                        const recipeData = recipeSnapshot.data() as Recipe;
                        return { ...recipeData, id: doc.id, savedDate: recipeRefData.date };
                    }
                    
                    return null;

                });

                const recipes = (await Promise.all(recipeFetchPromises)).filter(recipe => recipe !== null);
                setUserRecipeList(recipes);
                setLoadingUserRecipes(false);
            }, (error) => {
                SendErrorToFirestore(user?.uid, error, null, __filename);
                setLoadingUserRecipes(false);
            });

            return () => unsubscribe();
        }
    }, [user, isLoading]);

    return { userRecipeList, loadingUserRecipes };
};

export default useUserRecipeList;
