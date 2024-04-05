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

export async function AdminRejectCreator(applicantId: any) {

    const functions = getFunctions();
    const adminRejectCreator = httpsCallable(functions, 'adminRejectCreator');

    const data = {
      id: applicantId,
    }

    await adminRejectCreator(data).then(() => { 
      Notify("Creator Rejected Successfully") 
    }).catch(() => { 
      Notify("Failed to reject creator. Try again")
    })
    
    return;
}

export async function AdminGetApplicantList() {
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef
      .where('account_status', '==', 'user')
      .where('settings.tiktok.is_verified', '==', true)
      .get();

    if (querySnapshot.empty) {
      console.log('No verified users found.');
      return [];
    }

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as any
    }));

    return users;
}