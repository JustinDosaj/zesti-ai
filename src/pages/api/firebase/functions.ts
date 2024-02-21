import { Notify } from "@/components/shared/notify";
import { db } from "./firebase"
import { collection, query, limit, getDocs } from "firebase/firestore";

interface Props {
  url: any,
  user: any, 
}

interface Creator {
  name: string;
  desc: string;
  imageSrc: string;
  href: string;
}

interface TikTokTokenData {
  access_token: string;
  refresh_token: string;
  open_id: string;
  expires_in: number;
  refresh_expires_in: number;
}

export async function updateUserWithTikTokTokens(tokenData: TikTokTokenData, userId: string, display_name: string) {
  try {
    const userRef = db.collection('users').doc(userId);
    const res = await getUserData(userId)

    if (!tokenData.access_token || !tokenData.refresh_token || !tokenData.open_id) {
      throw new Error('Token data is incomplete or undefined');
    }

    // Prepare the data to be updated
    const updateData = {
      tiktokAccessToken: tokenData.access_token,
      tiktokRefreshToken: tokenData.refresh_token,
      tiktokOpenId: tokenData.open_id,
      display_name: display_name,
      display_url: display_name.replace(/\s+/g, '').toLowerCase(),
      affiliate_code: display_name.replace(/\s+/g, '').toLowerCase(),
    };

    // Update the user's document
    await userRef.set(updateData, { merge: true });

  } catch (error) {
    console.error('Error updating user with TikTok tokens:', error);
    throw error; 
  }
}

// Used to get all user recipes on my-recipes page
export async function getAllRecipes(user: any) {
  const recipeSnapshot = await db.collection(`users/${user}/recipes`).get();
  const updatedRecipes = recipeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return updatedRecipes
}

export async function getAllCreatorRecipes(id: string) {
  
  const recipeSnapshot = await db.collection(`creators/${id}/recipes`).get();
  const updatedRecipes = recipeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return updatedRecipes

}

export async function getCreatorByDisplayName(creatorName: string) {
  const querySnapshot = await db.collection('creators').where('display_url', '==', creatorName).get()
  return querySnapshot
}

export async function getUserData(user: any) {
  try{
    const ref = db.collection('users').doc(user)
    const doc = await ref.get()
    const res = doc.data()
    return res
  } catch(error) { console.log(error) }
}

export async function getCreatorData(user: any) {
  try {
    const ref = db.collection('creators').doc(user)
    const doc = await ref.get()
    const res = doc.data()
    return res
  } catch (error) {
    console.log(error)
  }
}

export async function getRecipe(user: any, id: any) {
    try {
      const ref = await db.collection('users').doc(user).collection('recipes').doc(id)
      const doc = await ref.get();
      const res = doc.data()
      return res
    } catch (err) {
        console.log(err)
        return
    }
}

export async function deleteUserRecipe(user: any, id: any) {
  try {
    await db.doc(`users/${user}/recipes/${id}`).delete();
    await db.doc(`users/${user}/tiktokurl/${id}`).delete();
    return "Recipe Deleted Successfully"
  } catch (error) {
    return "Problem Deleting Recipe"
  }

}

export async function saveBioDataToFireStore(bioObj: any, userId: string){

  try {
    const creatorRef = db.collection('creators').doc(userId)
    await creatorRef.set(bioObj, {merge: true});
  } catch (error) {
    console.log(error)
  }

}

export async function saveFromCreatorToUser(user: any, id: any, recipe: any) {
  const userRef = db.collection('users').doc(user).collection('recipes').doc(id)
  await userRef.set(recipe)
}


/* DELETE FUNCTIONS */
export async function deleteCreatorError(creator_id: any, recipe_id: string) {
  const docRef = db.collection('creators').doc(creator_id).collection('errors').doc(recipe_id)
  await docRef.delete()
  console.log(`Removed ${recipe_id} from errors`)
}

export async function deleteCreatorPublicRecipe(creator_id: any, recipe_id: string) {
  const docRef = db.collection('creators').doc(creator_id).collection('recipes').doc(recipe_id)
  await docRef.delete()

  const tikTokRecipesRef = db.collection('recipes-tiktok').doc(recipe_id)
  await tikTokRecipesRef.delete()

  Notify("Recipe Deleted Successfully")
  console.log(`Removed ${recipe_id} from public recipes`)
}

export async function GetRandomCreatorsForHomepage(numberOfCreators: number): Promise<Creator[]> {
  
  const creatorsRef = collection(db, "creators");
  const q = query(creatorsRef, limit(10)); // Adjust based on your needs
  const querySnapshot = await getDocs(q);
  const fetchedCreators: Creator[] = querySnapshot.docs.map(doc => doc.data() as Creator);

  // Select random creators
  return fetchedCreators.sort(() => 0.5 - Math.random()).slice(0, numberOfCreators);

}