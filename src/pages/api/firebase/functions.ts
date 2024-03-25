import { Notify } from "@/components/shared/notify";
import { db, storage } from "./firebase"
import { collection, query, limit, getDocs, updateDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

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

export async function updateUserWithTikTokTokens(tokenData: TikTokTokenData, userId: string, tiktokUserData: any) {
  try {
    
    const userRef = db.collection('users').doc(userId);

    if (!tokenData.access_token || !tokenData.refresh_token || !tokenData.open_id) {
      throw new Error('Token data is incomplete or undefined');
    }

    // Prepare the data to be updated
    const updateData = {
      display_name: tiktokUserData.display_name,
      affiliate_code: tiktokUserData.username,
      socials: {
        tiktok_link: tiktokUserData.profile_deep_link
      },
      tiktok_is_verified: true,
    };

    // Update the user's document
    await userRef.set(updateData, { merge: true });

  } catch (error) {

    throw error; 
  }
}

export async function getCreatorByDisplayName(creatorName: string) {
  const querySnapshot = await db.collection('creators').where('affiliate_code', '==', creatorName).get()
  return querySnapshot
}

export async function saveBioDataToFireStore(bioObj: any, userId: string){

  try {
    const creatorRef = db.collection('creators').doc(userId)
    await creatorRef.set(bioObj, {merge: true});
  } catch (error) {
    console.log(error)
  }

}

export const saveRecipeReferenceToUser = async (userId: string, recipeId: string, creatorId: string, creatorName: string) => {
  const userRef = db.collection('users').doc(userId);
  const recipeRef = db.collection('creators').doc(creatorId).collection('recipes').doc(recipeId);

  await userRef.collection('recipes').doc(recipeId).set({
      owner: creatorName,
      owner_id: creatorId,
      recipeRef: recipeRef,
      date: new Date().toISOString(),
  });
};

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
/* END DELETE FUNCTIONS */

export async function uploadCreatorPageImage(file: File, user_id: string): Promise<void> {

  const fileRef = storageRef(storage, `creator-page-images/${user_id}/${file.name}`);
  const creatorRef = db.collection('creators').doc(user_id)

  try {
      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(fileRef, file);

      // Get the URL of the uploaded file
      const photoURL: string = await getDownloadURL(snapshot.ref);

      // Update creator page with image
      await updateDoc(creatorRef, {
        page_image: photoURL,
      })

      console.log("Profile picture uploaded successfully!");
  } catch (error) {
      console.error("Error uploading profile picture:", error);
      SendErrorToFirestore(user_id, error)
  }

}


export async function GetRandomCreatorsForHomepage(numberOfCreators: number): Promise<Creator[]> {
  
  const creatorsRef = collection(db, "creators");
  const q = query(creatorsRef, limit(10)); // Adjust based on your needs
  const querySnapshot = await getDocs(q);
  const fetchedCreators: Creator[] = querySnapshot.docs.map(doc => doc.data() as Creator);

  // Select random creators
  return fetchedCreators.sort(() => 0.5 - Math.random()).slice(0, numberOfCreators);

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

