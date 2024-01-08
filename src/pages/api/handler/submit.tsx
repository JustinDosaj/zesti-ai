`use client`

import { db } from "../firebase/firebase";
import { getUserData } from "../firebase/functions";
import axios from 'axios'
import { increment } from 'firebase/firestore';
import { getCurrentDate } from "./general";


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

export async function getVideoLength(url_id: any) {
    
    const apiKey = process.env.NEXT_PUBLIC_VIDEO_LENGTH_API_KEY;

    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${url_id}&key=${apiKey}`);
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
    const url_id = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/);

    const date = await getCurrentDate()
    

    const falseObj = {
        "url": `${url}`,
        "url_id": url_id ? url_id[1] : null,
        "source": "youtube",
        "date": date,
    }
    
    /* 
    * Get video length
    * Check user role
    * Check if video length is too large for role
    * Free Users - Max 5 Minutes | Premium Users - Max 15 Minutes
    */
    const result = await getVideoLength(url_id ? url_id[1] : null)

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
                totalRecipes: increment(+1),
                lifeTimeUsage: increment(+1)
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
    url: any,
    setUrl?: any,
    user: any,
    setMessage?: any,
    stripeRole?: any,
    setNotify?: any,
    url_id?: string, 
}

export const handleTikTokURLSubmit = async ({url, setUrl, user, setMessage, stripeRole, setNotify}: TikTokProps): Promise<boolean> => {

    // Check if URL is empty    
    if (url == '') {
        setNotify(true) 
        setMessage("Oops! You must input a valid video link!")
        return false;
    }

    var url_id;

    if(url.includes('tiktok.com/t/')) {
        url_id = url?.match(/^https:\/\/www\.tiktok\.com\/t\/([A-Za-z0-9_-]+)\/?$/);
    } else {
        url_id = url?.match(/tiktok\.com\/@[^\/]+\/video\/(\d+)/);
    }

    const date = await getCurrentDate()

    const falseObj = {
        "url": `${url}`,
        "url_id": url_id ? url_id[1] : null,
        "source": "tiktok",
        "date": date
    }
    
    let tokens = 0;
    await getUserData(user?.uid).then((res) => {tokens = res?.tokens})

    if (tokens >= 1) {
        try {
            await db.collection('users').doc(user.uid).collection('tiktokurl').doc().set(falseObj)
            setMessage("Your recipe will appear in your dashboard shortly")
            await db.collection('users').doc(user.uid).update({
                tokens: increment(-1),
                totalRecipes: increment(+1),
                lifeTimeUsage: increment(+1)  
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

export const handleCreatorTikTokURLSubmit = async ({url, user, setNotify, url_id}: TikTokProps): Promise<boolean> => {

    // Check if URL is empty   
    const date = await getCurrentDate()

    const falseObj = {
        "url": `${url}`,
        "url_id": url_id,
        "source": "tiktok",
        "date": date
    }

    try {
        await db.collection('creators').doc(user?.uid).collection('tiktokurl').doc().set(falseObj)
        return true
    } catch (err) {
        console.log(err)
        return false
    }

}