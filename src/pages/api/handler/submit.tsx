`use client`
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Notify } from "@/components/shared/notify";
import React from 'react';


interface SubmissionProps {
    url?: string,
    setUrl?: React.Dispatch<React.SetStateAction<string>>,
    user?: any,
}

export const handleUserSubmitRecipe = async({url, setUrl, user}: SubmissionProps) => {
        
    // Check if URL is empty   
    const date: Date = new Date();
    const functions = getFunctions();
    const userAddRecipe = httpsCallable(functions, 'userAddRecipe');

    const userInput = {
        "url": url,
        "source": "tiktok",
        "date_added": date.toISOString(),
    }

    try {
        const response = await userAddRecipe(userInput)
        Notify("Successfully Added Recipe")
    } catch(err) {
        Notify(`${err}`)
    }
}
