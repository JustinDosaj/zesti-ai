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