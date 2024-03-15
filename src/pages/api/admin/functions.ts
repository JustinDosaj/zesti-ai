import { Notify } from "@/components/shared/notify";
import { getFunctions, httpsCallable } from 'firebase/functions';

export async function AdminAddNewCreator(email: string, affiliateCode: string, name: string | null) {

    const functions = getFunctions();
    const adminAddCreator = httpsCallable(functions, 'adminAddCreator');

    const data = {
      email: email,
      affiliate_code: affiliateCode,
      name: name,
    }

    adminAddCreator(data).then(() => { 
      Notify("Creator Added") 
    }).catch(() => { 
      Notify("Failed to add creator")
    })
    
    return;
}