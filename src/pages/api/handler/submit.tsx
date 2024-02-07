`use client`

import { db } from "../firebase/firebase";
import { getUserData } from "../firebase/functions";
import axios from 'axios'
import { increment } from 'firebase/firestore';
import { getCurrentDate } from "./general";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Notify } from "@/components/shared/notify";


async function convertISO8601ToMinutesAndSeconds(isoDuration: any) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = regex.exec(isoDuration);

    if (!matches) {
        return null; // Invalid format
    }

    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;
    const seconds = matches[3] ? parseInt(matches[3]) : 0;

    const totalMinutes = (hours * 60) + minutes + (seconds / 60);
    const roundedMinutes = Math.floor(totalMinutes);
    const totalSeconds = Math.round((totalMinutes - roundedMinutes) * 60);

    return {
        minutes: roundedMinutes,
        seconds: totalSeconds
    };
}

export interface Props {
    url: any,
    user: any,
    setMessage: any,
    stripeRole: any,
    setNotify: any, 
}

export async function getVideoLength(id: any) {
    
    const apiKey = process.env.NEXT_PUBLIC_VIDEO_LENGTH_API_KEY;

    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${apiKey}`);
        const duration = response.data.items[0].contentDetails.duration; // Duration in ISO 8601 format, like "PT1H15M32S"
        const result = await convertISO8601ToMinutesAndSeconds(duration);
        return result; 
    } catch (error) {
        console.error('Error fetching video details:', error);
    }
}

export const handleYouTubeURLSubmit = async ({url, user, setMessage, stripeRole, setNotify}: Props): Promise<boolean> => {

    // Check if URL is empty
    if (url == '') {
        setNotify(true) 
        setMessage("Oops! You must input a valid video link!")
        return false;
    }

    // Ensure video length is equal or below user sub usage rate
    const id = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/);

    const date = await getCurrentDate()
    

    const falseObj = {
        "url": `${url}`,
        "id": id ? id[1] : null,
        "source": "youtube",
        "date": date,
    }
    
    /* 
    * Get video length
    * Check user role
    * Check if video length is too large for role
    * Free Users - Max 5 Minutes | Premium Users - Max 15 Minutes
    */
    const result = await getVideoLength(id ? id[1] : null)

    if (stripeRole == 'premium') {
        if((result?.minutes || 0) > 15) {
            setMessage("Max video length is 15 minutes")
            setNotify(true)
            return false;
        }
    }

    if (stripeRole !== 'premium') {
        if((result?.minutes) || 0 > 5) {
            setMessage("Max video length for free users is 5 minutes")
            setNotify(true)
            return false;
        }
    }
    
    let tokens = 0;
    await getUserData(user?.uid).then((res) => {tokens = res?.tokens})

    if (tokens >= 1) {
        try {
            await db.collection('users').doc(user.uid).collection('youtubeurl').doc().set(falseObj)
            setMessage("Your recipe will appear in your dashboard shortly")
            await db.collection('users').doc(user.uid).update({
                tokens: increment(-1),
            })
            return true
        } catch (err) {
            setMessage("Something went wrong. Please try again later. If the problem persists, please contact us.")
            console.log(err)
            return false
        }
    } else {  
        setNotify(true)
        setMessage("Uh oh! You ran out of recipes for the month!") 
        return false; 
    }
}


export interface TikTokProps {
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

export const handleTikTokURLSubmit = async ({url, setUrl, user, setMessage, stripeRole, setNotify}: TikTokProps): Promise<boolean> => {

    // Check if URL is empty    
    if (url == '') {
        setNotify(true) 
        setMessage("Oops! You must input a valid video link!")
        return false;
    }

    var id;

    if(url.includes('tiktok.com/t/')) {
        id = url?.match(/^https:\/\/www\.tiktok\.com\/t\/([A-Za-z0-9_-]+)\/?$/);
    } else {
        id = url?.match(/tiktok\.com\/@[^\/]+\/video\/(\d+)/);
    }

    const date = await getCurrentDate()
    const functions = getFunctions();
    const userAddTikTokRecipe = httpsCallable(functions, 'userAddTikTokRecipe');

    const falseObj = {
        "url": `${url}`,
        "id": id ? id[1] : null,
        "source": "tiktok",
        "date": date
    }
    
    let tokens = 0;
    await getUserData(user?.uid).then((res) => {tokens = res?.tokens})

    if (tokens >= 1) {

        const response = await userAddTikTokRecipe(falseObj).then((val) => {
            console.log(val)
            setMessage("Processing Recipe...")
            return true;
        }).catch((err) => {
            console.log(err)
            setMessage("Error")
            return false;
        })

        if(response == true) {
            await db.collection('users').doc(user.uid).update({
                tokens: increment(-1),
            })
         }

        return response;
    } else {  
        setNotify(true)
        setMessage("Uh oh! You ran out of recipes for the month!") 
        return false; 
    }
}

export const handleCreatorTikTokURLSubmit = async ({url, rawText, creatorData}: TikTokProps): Promise<boolean> => {

    var id;

    if(url.includes('tiktok.com/t/')) {
        id = url?.match(/^https:\/\/www\.tiktok\.com\/t\/([A-Za-z0-9_-]+)\/?$/);
    } else {
        id = url?.match(/tiktok\.com\/@[^\/]+\/video\/(\d+)/);
    }

    // Check if URL is empty   
    const date = await getCurrentDate()
    const functions = getFunctions();
    const creatorAddTikTokRecipe = httpsCallable(functions, 'creatorAddTikTokRecipe');

    const falseObj = {
        "url": `${url}`,
        "id": id ? id[1] : null,
        "source": "tiktok",
        "date": date,
        "rawData": rawText,
        "display_name": creatorData?.display_name,
        "display_url": creatorData?.display_url,
        "owner_id": creatorData?.owner_id,
    }

    const response = await creatorAddTikTokRecipe(falseObj).then((val) => {
        console.log(val)
        return true;
    }).catch((err) => {
        console.log(err)
        return false;
    })
    return response;
}

export const callGenerateCreatorPage = async ({userData, creatorData}: TikTokProps) => {

    if (creatorData !== undefined) { Notify("Creator page already exists for this account"); return; }

    const functions = getFunctions();
    const generateCreatorPage = httpsCallable(functions, 'generateCreatorPage');

    const response = await generateCreatorPage().then((val) => {
        console.log("Successfully Generated Creator Page")
    }).catch((err) => {
        console.log("Failed to create creator page")
    })

    return;
}