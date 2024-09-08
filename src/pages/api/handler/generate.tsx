`use client`
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Notify } from "@/components/shared/notify";
import { UserAddRecipeResponse } from './submit';

interface SubmissionProps {
    gptMessage?: string,
}

export const handleUserGenerateRecipe = async({ gptMessage }: SubmissionProps) => {
 
    var source = 'ai-generated'
    var success;
    var id;
    var albumIdList;
    var slug;

    const functions = getFunctions();
    const generateRecipe = httpsCallable(functions, 'recipeGenerator');

    const userInput = {
        "gptMessage": gptMessage,
        "source": source,
    }

    await generateRecipe(userInput)
    .then((response) => {
        if (response && response.data) {
            
            const responseData = response.data as UserAddRecipeResponse;
            const message = responseData.message || "Problem receiving message from server.";
            source = responseData.source || '';
            id = responseData.recipeId || '';
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

    return { id, source, albumIdList, success, slug }

}
