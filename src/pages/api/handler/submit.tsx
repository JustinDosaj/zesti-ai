`use client`
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Notify } from "@/components/shared/notify";
import { SendErrorToFirestore } from "../firebase/functions";


interface TikTokProps {
    url?: any,
    setUrl?: any,
    user?: any,
    setMessage?: any,
    stripeRole?: any,
    setNotify?: any,
    urlId?: string, 
    rawText?: string,
    videoObject?: any,
    creatorData?: any,
    userData?: any,
}

export const handleCreatorTikTokURLSubmit = async ({url, rawText, creatorData}: TikTokProps) => {

    var id;

    if(url.includes('tiktok.com/t/')) {
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
        "rawData": rawText || '',
        "display_name": creatorData?.display_name,
        "affiliate_code": creatorData?.affiliate_code,
        "owner_id": creatorData?.owner_id,
    }

    try {
        const response = await creatorAddTikTokRecipe(recipeObj)
        Notify("Successfully Added Recipe")
    } catch(err) {
        Notify(`Error: ${err}`)
        await SendErrorToFirestore(creatorData?.owner_id, err)
    }
}
