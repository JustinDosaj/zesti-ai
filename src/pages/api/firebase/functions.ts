import { db } from "./firebase"
import { storage } from "./firebase"

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
