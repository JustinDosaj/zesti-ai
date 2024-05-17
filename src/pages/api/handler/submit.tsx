`use client`
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Notify } from "@/components/shared/notify";


interface SubmissionProps {
    url?: string,
}

export const handleUserSubmitRecipe = async({url}: SubmissionProps) => {

    var source = ''
    
    if(url?.includes('tiktok')) {
        Notify("Processing TikTok recipe, please wait...")
        source = "tiktok"
    } else if(url?.includes('instagram')) {
        Notify("Processing Instagram recipe, please wait. Albums may take longer to process")
        source = "instagram"
    }
    var uniqueId;
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
        source?: string;
    }

    await userAddRecipe(userInput)
    .then((response) => {
        if (response && response.data) {
            const responseData = response.data as UserAddRecipeResponse;
            const message = responseData.message || "Problem receiving message from server.";
            source = responseData.source || '';
            uniqueId = responseData.recipeId || '';
            Notify(message);
        } else {
            Notify("Failed to get valid response from the server.");
        }
    })
    .catch((err) => {
        Notify("Error processing request");
    });

    return { uniqueId, source }

}
