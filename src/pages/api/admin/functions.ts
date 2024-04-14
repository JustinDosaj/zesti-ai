import { Notify } from "@/components/shared/notify";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from "../firebase/firebase";
import { SendErrorToFirestore } from "../firebase/functions";

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

interface ProtoTypeProps {
  url?: any,
  setUrl?: any,
  user?: any,
}

export async function AdminProtoTypeUserSubmit({url, setUrl, user}:ProtoTypeProps) {
  var id;

    if(url.includes('tiktok.com/t/')) {
        id = url?.match(/^https:\/\/www\.tiktok\.com\/t\/([A-Za-z0-9_-]+)\/?$/);
    } else {
        id = url?.match(/tiktok\.com\/@[^\/]+\/video\/(\d+)/);
    }

    // Check if URL is empty   
    const date: Date = new Date();
    const functions = getFunctions();
    const userAddRecipe = httpsCallable(functions, 'userAddRecipe');

    const recipeObj = {
        "url": `${url}`,
        "id": id ? id[1] : null,
        "source": "tiktok",
        "date_added": date.toISOString(),
    }

    try {
        const response = await userAddRecipe(recipeObj)
        Notify("Successfully Added Recipe")
    } catch(err) {
        Notify(`Error: ${err}`)
        await SendErrorToFirestore(user?.uid, err)
    }
}