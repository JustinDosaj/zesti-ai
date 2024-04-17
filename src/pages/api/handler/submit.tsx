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
        
    const matches = url?.match(/https:\/\/www\.tiktok\.com\/@([^\/]+)\/video\/(\d+)/)

    // Check if URL is empty   
    const date: Date = new Date();
    const functions = getFunctions();
    const userAddRecipe = httpsCallable(functions, 'userAddRecipe');

    const username = matches ? matches[1] : null
    const videoId = matches ? matches[2] : null
    const cleanUrl = `https://www.tiktok.com/@${username}/video/${videoId}`

    const recipeObj = {
        "url": cleanUrl,
        "id": videoId,
        "source": "tiktok",
        "date_added": date.toISOString(),
    }

    try {
        const response = await userAddRecipe(recipeObj)
        Notify("Successfully Added Recipe")
    } catch(err) {
        Notify(`${err}`)
    }
}
