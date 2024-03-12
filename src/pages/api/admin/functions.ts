import { Notify } from "@/components/shared/notify";
import { db, storage } from "../firebase/firebase";
import { collection, query, getDocs, updateDoc, where, doc } from "firebase/firestore";

export async function AdminAddNewCreator(email: string, username: string) {
    
    const userRef = collection(db, 'users')
    const q = query(userRef, where('email', '==', email))

    try {
        const querySnapshot = await getDocs(q)
        
        if(querySnapshot.empty) {
            Notify("Empty Snapshot Error")
            return;
        }

        querySnapshot.forEach((docSnapshot) => {
            // Assuming 'id' is the document ID
            const userDocRef = doc(db, 'users', docSnapshot.id);
            updateDoc(userDocRef, {
              account_status: 'creator',
              affiliate_code: username,
            }).then(() => {
              console.log('New Creator Added');
            }).catch((error) => {
              console.error('Error updating user:', error);
            });
          });
    } catch (error) {
        Notify("Problem adding new creator")
    }

    return;
}