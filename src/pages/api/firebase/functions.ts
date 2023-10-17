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

export async function UploadMP3ToFirebase(blob: any, id: any) {
    const storageRef = storage.ref();
    const mp3Ref = storageRef.child('mp3/' + `${id}.mp3`);  // Create a reference with a unique filename
    const metadata = {
      contentType: 'audio/mp3',
    }
    try {
        const snapshot = await mp3Ref.put(blob, metadata);
        const downloadURL = await snapshot.ref.getDownloadURL();
        console.log('Uploaded MP3:', downloadURL);  // This is the URL you can use to access the MP3 in Firebase storage
    } catch (error) {
        console.error('Error uploading MP3:', error);
    }
}
