`use client`

import { db } from "../firebase/firebase";
import { getUserData } from "../firebase/functions";
import axios from 'axios'
import { increment } from 'firebase/firestore';
import React, { useState } from "react";



async function isValidUrl(string: string) {
    try {
        new URL(string);
        return true;
    } catch (error) {
        return false;
    }
}

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
    const falseObj = {
        "url": `${url}`,
        "url_id": url_id ? url_id[1] : null,
        "source": "youtube",
        "date": new Date().toISOString()
    }


    // Checking video length compared to subscription model
    const result = await getVideoLength(url_id ? url_id[1] : null)
    if ((result?.minutes || 0) > 15) {
        setMessage("Max video length is 15 minutes");
        setNotify(true)
        return false;
    }
    
    let usage = 0;
    await getUserData(user?.uid).then((res) => {usage = res?.premiumUsage})

    if (usage >= 1 && stripeRole == 'premium') {
        try {
            await db.collection('users').doc(user.uid).collection('youtubeurl').doc().set(falseObj)
            setMessage("The recipe has begun progressing and will appear in your dashboard shortly.")
            await db.collection('users').doc(user.uid).update({
                premiumUsage: increment(-1)
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
    setUrl: any,
    user: any,
    setMessage: any,
    stripeRole: any,
    setNotify: any, 
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
        setNotify(true)
        setMessage("There is currently a problem with short links. Paste current link in any browser to get the format: https://www.tiktok.com/@user/video/123. ")
        return false;
    } else {
        url_id = url?.match(/tiktok\.com\/@[^\/]+\/video\/(\d+)/);
    }

    const falseObj = {
        "url": `${url}`,
        "url_id": url_id ? url_id[1] : null,
        "source": "tiktok",
        "date": new Date().toISOString()
    }
    
    let usage = 0;
    await getUserData(user?.uid).then((res) => {usage = res?.premiumUsage})

    if (usage >= 1 && stripeRole == 'premium') {
        try {
            await db.collection('users').doc(user.uid).collection('tiktokurl').doc().set(falseObj)
            setMessage("The recipe has begun processing and will appear in your dashboard shortly.")
            await db.collection('users').doc(user.uid).update({
                premiumUsage: increment(-1)
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

interface ChatProps {
    userInput: string,
    user: any,
    setMessage: any,
    stripeRole: any,
    setNotify: any,
    recipes: any,
}

export const handleCreativeChatSubmit = async({userInput, user, setMessage, stripeRole, setNotify, recipes}: ChatProps) => {

        // url check
        const urlCheck = await isValidUrl(userInput)

        if (userInput == '') {
            setNotify(true) 
            setMessage("Oops! The input cannot be blank!")
            return false;
        } else if (urlCheck == true) {
            setNotify(true)
            setMessage("Oops! That looks like a URL. You may be trying to access Video to Recipe or Ad-Free Recipe")
            return false;
        }

        const falseObj = {
            "userMessage": `${userInput}`,
            "source": "creative",
            "date": new Date().toISOString()
        }

    if (stripeRole == 'premium') {
        try {
            await db.collection('users').doc(user.uid).collection('creative').doc().set(falseObj)
            setMessage("The recipe began processing and will appear in your dashboard shortly.")
            return true
        } catch (err) {
            setNotify(true)
            setMessage("Something went wrong. Please try again later. If the problem persists, feel free to contact us.")
            return false
        }
    }

    let tokens = 0;
    await getUserData(user?.uid).then((res) => {tokens = res?.tokens})

    if (recipes.length >= 5) {
        setNotify(true)
        setMessage("Max saved recipes reached. Upgrade subscription for more space")
        return false
    }
            
    if (tokens >= 1) {
        try {
            await db.collection('users').doc(user.uid).collection('creative').doc().set(falseObj)
            setMessage("The recipe began processing and will appear in your dashboard shortly.")
            await db.collection('users').doc(user.uid).update({
                tokens: increment(-1)
            })
            return true
        } catch (err) {
            setNotify(true)
            setMessage("Something went wrong. Please try again later. If the problem persists, feel free to contact us.")
            return false
        }
    } else { 
        setNotify(true)
        setMessage("Uh oh! You ran out of recipes for the month!") 
        return false; 
    }

}

interface WebURLProps {
    url: string,
    user: any,
    setMessage: any,
    stripeRole: any,
    setNotify: any,
}

export const handleWebURLSubmit = async ({url, user, setMessage, stripeRole, setNotify}: WebURLProps): Promise<boolean> => {

    // URL CHecks
    const urlCheck = await isValidUrl(url)

    if (url == '') {
        setNotify(true) 
        setMessage("Oops! You must input a valid website URL!")
        return false;
    } else if (urlCheck == false) {
        setNotify(true)
        setMessage("Oops! That isn't a valid URL!")
        return false;
    }

    const falseObj = {
        "url": `${url}`,
        "source": "url",
        "date": new Date().toISOString()
    }

    let usage = 0;
    await getUserData(user?.uid).then((res) => {usage = res?.premiumUsage})
    
    if (usage >= 1 && stripeRole == 'premium') {
        try {
            await db.collection('users').doc(user.uid).collection('weburl').doc().set(falseObj)
            setMessage("The recipe has begun progressing and will appear in your dashboard shortly.")
            await db.collection('users').doc(user.uid).update({
                premiumUsage: increment(-1)
            })
            return true
        } catch (err) {
            setNotify(true)
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