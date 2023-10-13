import { db } from "./firebase"

export async function getAllRecipes(user: string) {
    try {
      const snapshot = await db.collection('users').doc(user).collection('recipes').get()
      const pages = snapshot.docs.map((doc: any) => doc.data())
      console.log("USER: " , user)
      return pages
    } catch (err) {
        console.log(err)
        return
    }
  }