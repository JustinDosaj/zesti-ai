import { Notify } from "@/components/shared/notify";
import { db } from "./firebase"
import { onSnapshot, doc } from "firebase/firestore";

export const saveRecipeReferenceToUser = async (userId: string, recipeId: string) => {
  
  const userRef = db.collection('users').doc(userId);
  const recipeRef = db.collection('recipes').doc(recipeId);

  await userRef.collection('recipes').doc(recipeId).set({
      recipe_id: recipeId,
      recipeRef: recipeRef,
      date: new Date().toISOString(),
  }).catch(() => { Notify("Failed to save recipe, please try again later.") });
};

/* DELETE FUNCTIONS */
export const userRemoveRecipeFromFirestore = async (userId: string, recipeId: string) => {
  try {
    const recipeRef = db.collection('users').doc(userId).collection('recipes').doc(recipeId);

    await recipeRef.delete();

    Notify("Recipe removed successfully");
  } catch (error) {
    throw new Error("Failed to remove recipe from saved recipes.");
  }
};

/* END DELETE FUNCTIONS */

interface Recipe {
  id: string;
  name: string;
  cover_image_url: string;
  [key: string]: any; // Extend this interface based on the other fields you expect in your documents
}

export async function GetAllRecipes(): Promise<Recipe[]> {
  const recipesRef = db.collection('recipes');
  const snapshot = await recipesRef.get();
  const recipes: Recipe[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Recipe);
  return recipes
}

export async function GetRandomRecipes(numberOfRecipes: number): Promise<Recipe[]> {
  const recipesRef = db.collection('recipes');
  const snapshot = await recipesRef.get();
  const recipes: Recipe[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Recipe);

  // Shuffle array to simulate randomness
  for (let i = recipes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [recipes[i], recipes[j]] = [recipes[j], recipes[i]];
  }

  // Return the specified number of random recipes
  return recipes.slice(0, numberOfRecipes);
}

/* Store Error inside Firebase Error Collection */
export async function SendErrorToFirestore(user_id: string | undefined | null, error: any, recipeId?: string | null, file?: string) {

  const errorRef = db.collection('errors').doc()

  const errorObj = {
    timestamp: new Date(),
    user_id: user_id || null,
    error: error,
    recipe_id: recipeId || null,
    file: file || null
  }

  await errorRef.set(errorObj, {merge: true})
}

export async function CheckForExistingRecipe(recipe: any, user_id: string, setIsSaved: any) {
  
  const docRef = doc(db, `users/${user_id}/recipes`, recipe?.data.unique_id);
  const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
    setIsSaved(docSnapshot.exists())
  })

  return () => unsubscribe()

}

// Optimization Functions
export async function GetRecipeSnapshot(id: string) {
  return await db.doc(`recipes/${id}`).get()
}
