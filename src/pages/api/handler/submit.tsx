`use client`
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Notify } from "@/components/shared/notify";
import React from 'react';


interface SubmissionProps {
    url?: string,
    setUrl?: React.Dispatch<React.SetStateAction<string>>,
}

export const handleUserSubmitRecipe = async({url, setUrl}: SubmissionProps) => {
    
    Notify("Processing recipe video, please wait...")
    
    var uniqueId;
    var source;
    const date: Date = new Date();
    const functions = getFunctions();
    const userAddRecipe = httpsCallable(functions, 'userAddRecipe');

    const userInput = {
        "url": url,
        "source": url?.includes('tiktok.com') ? "tiktok" : url?.includes('instagram.com') ? "instagram" : "unknown",
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
            console.log(response.data)
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
        Notify(err.message || "Error processing request");
    });

    return { uniqueId, source }

}
