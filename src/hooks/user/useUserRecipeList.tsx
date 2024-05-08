import { db } from "@/pages/api/firebase/firebase"
import { onSnapshot, getDoc, collection } from "firebase/firestore"
import { useState, useEffect } from "react"

interface Recipe {
    id: string;
    date: string;
}

const useUserRecipeList = (user: any | null, isLoading: boolean) => {
    const [userRecipeList, setUserRecipeList] = useState<any[]>([]);
    const [loadingUserRecipes, setLoadingUserRecipes] = useState<boolean>(true);

    useEffect(() => {
        if (user && !isLoading) {
            const recipesRef = collection(db, 'users', user.uid, 'recipes');
            
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
                setLoadingUserRecipes(false);
            });

            return () => unsubscribe();
        }
    }, [user, isLoading]);

    return { userRecipeList, loadingUserRecipes };
};

export default useUserRecipeList;
