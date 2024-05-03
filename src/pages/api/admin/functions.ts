import { Notify } from "@/components/shared/notify";
import { getFunctions, httpsCallable } from 'firebase/functions';

interface AdminProps {
    userInput: string
}

export async function AdminUpdateRecipe({userInput}: AdminProps) {
    const functions = getFunctions();
    const adminUpdateRecipe = httpsCallable(functions, 'adminUpdateRecipe');

    const input = {
        recipeId: userInput
    }

    await adminUpdateRecipe(input).then(() => Notify("Finished"))

    return;
}