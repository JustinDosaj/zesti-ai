 import { db } from "./firebase";
 

 export async function getAllWebPages({user}: any) {
    try {
    const snapshot = await db.collection('users').doc(user.uid).collection('pages').get()
    const pages = snapshot.docs.map((doc: any) => doc.data())
    return pages
    } catch (err) {
        console.log(err)
        return
    }
 }

 export async function sendScrapedData() {
    
 }