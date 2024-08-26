import { db } from "@/lib/firebase";
import { onSnapshot, getDoc, collection, query, orderBy, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

interface Recipe {
    id: string;
    date: string;
}

interface RecipeMapData {
    redirect: string; // The new ID of the recipe
    slug: string;
}

const useUserRecipeList = (user: any | null, isLoading: boolean) => {
    const [userRecipeList, setUserRecipeList] = useState<any[]>([]);
    const [loadingUserRecipes, setLoadingUserRecipes] = useState<boolean>(true);

    useEffect(() => {
        if (user && !isLoading) {

            const recipesRef = collection(db, 'users', user.uid, 'recipes');
            const recipeQuery = query(recipesRef, orderBy('date', 'desc'));

            const unsubscribe = onSnapshot(recipeQuery, async (querySnapshot) => {
                setLoadingUserRecipes(true);

                const recipeFetchPromises = querySnapshot.docs.map(async (snapshot) => {
                    const recipeRefData = snapshot.data();
                    let recipeRef = recipeRefData.recipeRef;

                    // Check if recipeRef is a string (old ID path)
                    if (typeof recipeRef === 'string') {
                        // Convert string to a DocumentReference
                        recipeRef = doc(db, recipeRef);
                    }

                    let recipeSnapshot = await getDoc(recipeRef);

                    if (!recipeSnapshot.exists()) {
                        // Handle old IDs: Check the recipeMap for a redirect
                        const oldId = recipeRefData.recipe_id; // Old ID from user collection
                        const recipeMapRef = doc(db, 'recipesMap', oldId);
                        const recipeMapSnapshot = await getDoc(recipeMapRef);

                        if (recipeMapSnapshot.exists()) {
                            const recipeMapData = recipeMapSnapshot.data() as RecipeMapData;

                            if (typeof recipeMapData.redirect === 'string') {
                                recipeRef = doc(db, 'recipes', recipeMapData.redirect);
                                recipeSnapshot = await getDoc(recipeRef);
                            }
                        }
                    }

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
                setUserRecipeList(recipes);
                setLoadingUserRecipes(false);
            }, (error) => {
                setLoadingUserRecipes(false);
                console.error("Error fetching user recipes:", error);
            });

            return () => unsubscribe();
        }
    }, [user, isLoading]);

    return { userRecipeList, loadingUserRecipes };
};

export default useUserRecipeList;
