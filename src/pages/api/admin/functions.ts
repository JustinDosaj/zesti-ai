import { Notify } from "@/components/shared/notify";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { SendErrorToFirestore } from "../firebase/functions";

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