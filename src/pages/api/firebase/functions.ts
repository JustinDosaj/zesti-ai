import { Notify } from "@/components/shared/notify";
import { db } from "./firebase"

export const saveRecipeReferenceToUser = async (userId: string, recipeId: string) => {
  const userRef = db.collection('users').doc(userId);
  const recipeRef = db.collection('recipes').doc(recipeId);

  await userRef.collection('recipes').doc(recipeId).set({
      recipe_id: recipeId,
      recipeRef: recipeRef,
      date: new Date().toISOString(),
  });
};

/* DELETE FUNCTIONS */
export const UserRemoveRecipeFromFirestore = async (userId: string, recipeId: string) => {
  try {
    const recipeRef = db.collection('users').doc(userId).collection('recipes').doc(recipeId);

    await recipeRef.delete();

    Notify("Recipe removed successfully");
  } catch (error) {
    throw new Error("Failed to remove recipe from saved recipes.");
  }
};

/* END DELETE FUNCTIONS */

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



// PROTOTYPE FUNCTIONS //
export async function getRecipeById(recipeId: string) {

  const recipeRef = db.collection('recipes').doc(recipeId);
  const doc = await recipeRef.get();

  if (!doc.exists) {
    throw new Error('Recipe not found');
  }

  return doc.data();
}