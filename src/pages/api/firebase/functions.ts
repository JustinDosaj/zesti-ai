import { Notify } from "@/components/shared/notify";
import { db } from "./firebase"
import { onSnapshot, doc, setDoc, deleteDoc, getDocs, collection, getDoc } from "firebase/firestore";


// Save & Delete Functions
export const saveRecipeReferenceToUser = async (userId: string, recipeId: string) => {
  
  const useRecipeRef = doc(db, `users/${userId}/recipes`, recipeId);
  const directRef = doc(db, 'recipes', recipeId);

  await setDoc(useRecipeRef, {
    recipe_id: recipeId,
    recipeRef: directRef,
    date: new Date().toISOString(),
  }).catch(() => { Notify("Failed to save recipe, please try again later.") });

}

export const userRemoveRecipeFromFirestore = async (userId: string, recipeId: string) => {

  const recipeRef = doc(db, `users/${userId}/recipes`, recipeId);
  await deleteDoc(recipeRef).then(() => { Notify("Recipe removed successfully")}).catch(() => { Notify("Failed to remove recipe, please try again later.") })

};

// Error Reporting Functon
export async function SendRecipeErrorReport(message: string, user_id: string | null, recipe_id: string) {
  
  const errorReportRef = doc(collection(db, 'reports'));

  try{
    
    await setDoc(errorReportRef, {
      message: message,
      user_id: user_id,
      recipe_id: recipe_id,
      date: new Date().toISOString()
    })

    Notify("Error report sent successfully. Thank you for your feedback!")

  } catch(error) {
    Notify("Failed to send report, please try again later.")
  }
}

interface Recipe {
  id: string;
  name: string;
  cover_image_url: string;
  [key: string]: any; // Extend this interface based on the other fields you expect in your documents
}


// Get Recipes
export async function GetAllRecipes(): Promise<Recipe[]> {

      // Reference to the 'recipes' collection
      const recipesRef = collection(db, 'recipes');

      // Retrieve the document snapshots
      const snapshot = await getDocs(recipesRef);
  
      // Map over the document snapshots to extract data
      const recipes: Recipe[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as Recipe);
  
      return recipes;

}

export async function GetRandomRecipes(numberOfRecipes: number): Promise<Recipe[]> {
  const recipesRef = collection(db, 'recipes')
  const snapshot = await getDocs(recipesRef)

  const recipes: Recipe[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as Recipe);

  // Shuffle array to simulate randomness
  for (let i = recipes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [recipes[i], recipes[j]] = [recipes[j], recipes[i]];
  }

  // Return the specified number of random recipes
  return recipes.slice(0, numberOfRecipes);
}

export async function GetRecipeByIds(ids: string[]): Promise<Recipe[]>{

  const recipes: Recipe[] = [];

  for (const id of ids) {
    const recipeRef = doc(db, `recipes/${id}`);
    const recipeDoc = await getDoc(recipeRef);

    if (recipeDoc.exists()) {
      recipes.push({
        id: recipeDoc.id,
        ...recipeDoc.data()
      } as Recipe);
    } else {
      console.log(`Recipe with ID ${id} does not exist.`);
    }
  }

  return recipes
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
  const recipeRef = doc(db, `recipes/${id}`)
  const recipeSnapshot = await getDoc(recipeRef)
  return recipeSnapshot
}
