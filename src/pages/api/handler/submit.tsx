`use client`
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Notify } from "@/components/shared/notify";
import { SendErrorToFirestore } from "../firebase/functions";


interface SubmissionProps {
    url?: string,
    setUrl?: any,
    user?: any,
}

export const handleUserSubmitRecipe = async({url, setUrl, user}: SubmissionProps) => {
    
    var id;

    if(url?.includes('tiktok.com/t/')) {
        id = url?.match(/^https:\/\/www\.tiktok\.com\/t\/([A-Za-z0-9_-]+)\/?$/);
    } else {
        id = url?.match(/tiktok\.com\/@[^\/]+\/video\/(\d+)/);
    }

    // Check if URL is empty   
    const date: Date = new Date();
    const functions = getFunctions();
    const creatorAddTikTokRecipe = httpsCallable(functions, 'creatorAddTikTokRecipe');

    const recipeObj = {
        "url": `${url}`,
        "id": id ? id[1] : null,
        "source": "tiktok",
        "date": date.toISOString(),
    }

    try {
        const response = await creatorAddTikTokRecipe(recipeObj)
        Notify("Successfully Added Recipe")
    } catch(err) {
        Notify(`Error: ${err}`)
        await SendErrorToFirestore(user?.uid, err)
    }
}
