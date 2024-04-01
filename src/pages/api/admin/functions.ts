import { Notify } from "@/components/shared/notify";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from "../firebase/firebase";

export async function AdminAddNewCreator(email: string, affiliateCode: string, name: string | null) {

    const functions = getFunctions();
    const adminAddCreator = httpsCallable(functions, 'adminAddCreator');

    const data = {
      email: email,
      affiliate_code: affiliateCode,
      name: name,
    }

    await adminAddCreator(data).then(() => { 
      Notify("Creator Added") 
    }).catch(() => { 
      Notify("Failed to add creator")
    })
    
    return;
}

export async function AdminGetApplicantList() {
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef
      .where('account_status', '==', 'user')
      .where('tiktok_is_verified', '==', true)
      .get();

    if (querySnapshot.empty) {
      console.log('No verified users found.');
      return [];
    }

    const users = querySnapshot.docs.map(doc => ({
      ...doc.data() as any
    }));

    return users;
}