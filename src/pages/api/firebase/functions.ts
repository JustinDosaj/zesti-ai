import { Notify } from "@/components/shared/notify";
import { httpsCallable, getFunctions } from 'firebase/functions';
import { db } from "@/lib/firebase";
import { onSnapshot, doc, setDoc, deleteDoc, getDocs, collection, getDoc, orderBy, query, limit } from "firebase/firestore";


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

export async function SendContactRequest(message: string, user_id: string | null, email: string) {
  
  const errorReportRef = doc(collection(db, 'contact-requests'));

  try{
    
    await setDoc(errorReportRef, {
      email: email,
      message: message,
      user_id: user_id,
      date: new Date().toISOString()
    })

    Notify("Contact request sent successfully. We will get back to you soon!")

  } catch(error) {
    Notify("Failed to send contact request, please try again later.")
  }
}

interface Recipe {
  id: string;
  name: string;
  cover_image_url: string;
  [key: string]: any; // Extend this interface based on the other fields you expect in your documents
}

export async function GetRecentRecipes(numberOfRecipes: number = 9): Promise<Recipe[]> {

  const recipesRef = collection(db, 'recipes');
  const q = query(recipesRef, orderBy('data.date_added', 'desc'), limit(numberOfRecipes));
  const snapshot = await getDocs(q);

  const recipes: Recipe[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as Recipe);

  return recipes;
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
  
  const docRef = doc(db, `users/${user_id}/recipes`, recipe?.data.id);
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

export async function GetRecipeMap(id: string) {
  const recipeMapRef = doc(db, `recipesMap/${id}`);
  const recipeMapSnapshot = await getDoc(recipeMapRef);
  return recipeMapSnapshot
}

interface LikeProps {
  recipeId: string;
  remove: boolean
}

export async function UpdateLikesInFirebase({recipeId, remove}: LikeProps) {
    const data = {
      "recipeId": recipeId,
      "remove": remove,
    }

    const functions = getFunctions();
    const likeRecipe = httpsCallable(functions, 'likeRecipe');

    let id = ""
    let success = false;

    await likeRecipe(data).then((res) => {

        if(res && res.data) {

            const responseData = res.data as any;
            id = responseData.id;
            
        }

    }).catch(() => {
        Notify("Error updating build order. Please try again later.")
    })

    return { success }

}

