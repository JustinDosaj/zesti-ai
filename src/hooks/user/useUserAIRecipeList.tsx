import { db } from "@/lib/firebase";
import { onSnapshot, getDoc, collection, query, orderBy, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

interface Recipe {
    id: string;
    date: string;
}

const useUserAIRecipeList = (user: any | null, isLoading: boolean) => {

    const [userAIRecipeList, setUserAIRecipeList] = useState<any[]>([]);
    const [loadingUserAIRecipes, setLoadingUserAIRecipes] = useState<boolean>(true);

    useEffect(() => {
        if (user && !isLoading) {
            
            const recipesRef = collection(db, 'users', user.uid, 'ai-recipes');
            const recipeQuery = query(recipesRef, orderBy('date', 'desc'));

            const unsubscribe = onSnapshot(recipeQuery, async (querySnapshot) => {
                setLoadingUserAIRecipes(true);

                const recipeFetchPromises = querySnapshot.docs.map(async (snapshot) => {
                    const recipeRefData = snapshot.data();
                    let recipeRef = recipeRefData.recipeRef;

                    // Check if recipeRef is a string (old ID path)
                    if (typeof recipeRef === 'string') {
                        // Convert string to a DocumentReference
                        recipeRef = doc(db, recipeRef);
                    }

                    let recipeSnapshot = await getDoc(recipeRef);

                    if (recipeSnapshot.exists()) {
                        const recipeData = recipeSnapshot.data() as Recipe;
                        return {
                            ...recipeData,
                            id: recipeRef.id, // Use the actual recipe ID
                            savedDate: recipeRefData.date,
                        };
                    }

                    return null;
                });

                const recipes = (await Promise.all(recipeFetchPromises)).filter(recipe => recipe !== null);
                setUserAIRecipeList(recipes);
                setLoadingUserAIRecipes(false);
            }, (error) => {
                setLoadingUserAIRecipes(false);
                console.error("Error fetching user recipes:", error);
            });

            return () => unsubscribe();
        }
    }, [user, isLoading]);

    return { userAIRecipeList, loadingUserAIRecipes };
};

export default useUserAIRecipeList;
