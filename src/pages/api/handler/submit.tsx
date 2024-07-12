`use client`
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Notify } from "@/components/shared/notify";


interface SubmissionProps {
    url?: string,
}

export const handleUserSubmitRecipe = async({ url }: SubmissionProps) => {

    
    var source = ''
    var success;
    var uniqueId;
    var albumIdList;
    var slug;
    
    if(url?.includes('tiktok')) {
        source = "tiktok"
    }

    const date: Date = new Date();
    const functions = getFunctions();
    const userAddRecipe = httpsCallable(functions, 'userAddRecipe');

    const userInput = {
        "url": url,
        "source": source,
        "date_added": date.toISOString(),
    }

    interface UserAddRecipeResponse {
        message?: string;  // Use optional if message may not always be present
        success?: boolean;
        recipeId?: string;
        albumIdList?: string[] | null;
        source?: string;
        slug?: string;
    }

    await userAddRecipe(userInput)
    .then((response) => {
        if (response && response.data) {
            
            const responseData = response.data as UserAddRecipeResponse;
            const message = responseData.message || "Problem receiving message from server.";
            source = responseData.source || '';
            uniqueId = responseData.recipeId || '';
            albumIdList = responseData.albumIdList || null;
            success = responseData.success || false;
            slug = responseData.slug
            
            Notify(message);

        } else {
            Notify("Failed to get valid response from the server.");
        }
    })
    .catch((err) => {
        Notify("Error processing request. Please try again later.");
    })

    return { uniqueId, source, albumIdList, success, slug }

}
