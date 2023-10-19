import { db } from "./firebase"

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
        role: doc.data().role
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
