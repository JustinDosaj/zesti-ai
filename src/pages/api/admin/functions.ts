import { Notify } from "@/components/shared/notify";
import { getFunctions, httpsCallable } from 'firebase/functions';

interface AdminProps {
    recipeId?: string;
}

export async function AdminUpdateRecipe({recipeId}: AdminProps) {
    const functions = getFunctions();
    const adminUpdateRecipe = httpsCallable(functions, 'adminUpdateRecipe');

    const userInput = {
        "recipeId": recipeId,
    }

    await adminUpdateRecipe(userInput).then(() => Notify("Finished"))

    return { recipeId }
}