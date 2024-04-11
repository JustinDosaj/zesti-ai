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
      settings: {
        tiktok: {
          is_verified: true,
          profile_link: tiktokUserData.profile_deep_link,
          display_name: tiktokUserData.display_name,
          username: tiktokUserData.username,
          most_recent_video_id: null,
        }
      },
    };

    // Update the user's document
    await userRef.set(updateData, { merge: true });

  } catch (error) {

    throw error; 
  }
}

export async function getCreatorByDisplayName(creatorName: string) {
  const querySnapshot = await db.collection('creators').where('owner.affiliate_code', '==', creatorName).get()
  return querySnapshot
}

/* Update Creator Profile */
export async function saveBioDataToFireStore(bioObj: any, userId: string){

  try {
    const creatorRef = db.collection('creators').doc(userId)
    await creatorRef.set(bioObj, {merge: true});
  } catch (error) {
    console.log(error)
  }

}

export async function updateNotificationSettings(userId?: string, isOn?: boolean) {
  try {

    const msg = !isOn ? "Notifications turned on" : "Notifications turned off"
    const creatorRef = db.collection('users').doc(userId)
    await creatorRef.set(
      {
        settings: {
          notifications: {
            active: !isOn
          }
        }
      }, {merge: true});

      Notify(msg)
  } catch (error) {
    console.log(error)
  }
}

/* Update Creator Profile END */

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
export const UserRemoveRecipeFromFirestore = async (userId: string, recipeId: string) => {
  try {
    const recipeRef = db.collection('users').doc(userId).collection('recipes').doc(recipeId);

    await recipeRef.delete();

    Notify("Recipe removed successfully");
  } catch (error) {
    throw new Error("Failed to remove recipe from saved recipes.");
  }
};

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

