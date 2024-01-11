import { db } from "./firebase"
import { doc, deleteDoc, DocumentReference, getDoc, updateDoc } from 'firebase/firestore';

export interface Props {
  url: any,
  user: any, 
}

export async function getAllRecipes(user: any) {
    try {
      const snapshot = await db.collection('users').doc(user).collection('recipes').get()
      const pages = snapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      return pages
    } catch (err) {
        console.log(err)
        return
    }
}

export async function getSubscription(user: any) {
  try{
    const snapshot = await db.collection('users').doc(user).collection('subscriptions').get()
    const pages = snapshot.docs.map((doc: any) => {
      return {
        role: doc.data().role,
        status: doc.data().status
      }
    })
    return pages
  } catch (error){ console.log(error) }
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

export async function deleteRecipe(user: any, id: any) {
  const recipeRef = doc(db, 'users', user, 'recipes', id);
  await deleteDoc(recipeRef);

  const userRef: DocumentReference = doc(db, 'users', user);

  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    let totalRecipes: number = userData.totalRecipes;

    // Decrement totalRecipes and update the user document
    if (totalRecipes && totalRecipes > 0) {
      await updateDoc(userRef, {
        totalRecipes: totalRecipes - 1
      });
    }
  } else {
    console.log("User document not found");
  }
}

interface TikTokTokenData {
  access_token: string;
  refresh_token: string;
  open_id: string;
  expires_in: number;
  refresh_expires_in: number;
}

export async function updateUserWithTikTokTokens(tokenData: TikTokTokenData, userId: string,) {
  try {
    const userRef = db.collection('users').doc(userId);


    if (!tokenData.access_token || !tokenData.refresh_token || !tokenData.open_id) {
      throw new Error('Token data is incomplete or undefined');
    }

    // Prepare the data to be updated
    const updateData = {
      tiktokAccessToken: tokenData.access_token,
      tiktokRefreshToken: tokenData.refresh_token,
      tiktokOpenId: tokenData.open_id,
      // You can also store expiration times if needed
    };

    const createPageData = {
      owner_id: userId,
    }

    await db.collection('creators').doc(userId).set(createPageData)

    // Update the user's document
    await userRef.set(updateData, { merge: true });

  } catch (error) {
    console.error('Error updating user with TikTok tokens:', error);
    throw error; // You can handle the error as per your application's needs
  }
}

export async function saveAffiliateLink(affiliateLink: string, userId: string) {
  
  const url = new URL(affiliateLink)
  const params = new URLSearchParams(url.search)
  const affiliateCode = params.get('via')

  try{
    const userRef = db.collection('users').doc(userId);
    const creatorRef = db.collection('creators').doc(userId);

    const updateAffiliateLink = {
      affiliate_link: affiliateLink,
      affiliate_code: affiliateCode,
    }

    await userRef.set(updateAffiliateLink, {merge: true});
    await creatorRef.set(updateAffiliateLink, {merge: true});

  } catch (err) {
    console.log(err)
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
