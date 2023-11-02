import { db } from "../firebase/firebase";
import { getUserData } from "../firebase/functions";
import axios from 'axios'

export interface Props {
    url: any,
    user: any,
    setMessage: any,
    stripeRole: any, 
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


export const handleSubmit = async ({url, user, setMessage, stripeRole}: Props): Promise<boolean> => {

    // Check if URL is empty
    if (url == '') { 
        setMessage("Oops! You must input a valid video link!")
        return false;
    }

    // Ensure video length is equal or below user sub usage rate
    const url_id = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/);
    const falseObj = {
        "url": `${url}`,
        "url_id": url_id ? url_id[1] : null,
        "complete": false,
    }


    // Checking video length compared to subscription model
    const result = await getVideoLength(url_id ? url_id[1] : null)
    if (stripeRole == 'base') {
        if((result?.minutes || 0) > 5) { setMessage("Video too long for your subscription. You can upload videos that are up to 5 minutes long"); return false;}
    } else if (stripeRole == 'free') {
        if((result?.minutes || 0) > 10) { setMessage("Video too long for your subscription. You can upload videos that are up to 10 minutes long"); return false;}
    } else if (stripeRole == 'essential') {
        if((result?.minutes || 0) > 20) { setMessage("Video is too long. You can currently upload videos that are up to 20 minutes long"); return false;}
    } else if (stripeRole == 'premium') {
        if((result?.minutes || 0) > 20) { setMessage("Video too long for your subscription. You can upload videos that are up to 20 minutes long"); return false;}
    } else if (stripeRole !== 'base' || stripeRole !== 'essential' || stripeRole !== 'premium') {
        if((result?.minutes || 0) > 20) { setMessage("Video is too long. The free recipe transcription can be a maximum of 10 minutes long."); return false;}
    }


    let tokens = 0;
    await getUserData(user?.uid).then((res) => {tokens = res?.tokens})
    
    if (tokens >= 1) {
        try {
            // Reference to the specific document in the recipes collection
            const recipeRef = db.collection('recipes').doc(url_id[1]);
            const doc = await recipeRef.get();
            if (doc.exists) {

                const recipeData = doc.data();                
                
                const trueObj = {
                    "url": `${url}`,
                    "url_id": url_id ? url_id[1] : null,
                    "complete": true,
                    "data": recipeData?.data
                }
                
                if(user) {
                    try {
                        await db.collection('users').doc(user.uid).collection('recipes').doc().set(trueObj)
                        setMessage("The recipe has begun progressing and will appear in your dashboard shortly.")
                        await db.collection('users').doc(user.uid).update({
                            tokens: tokens - 1
                        });
                        return true
                    } catch (err) {
                        setMessage("Something went wrong. Please try again later or contact us if the problem persists")
                        console.log(err)
                    }
                }
       

                return false;
            } else {
            
                if(user){
                    try {
                        await db.collection('users').doc(user.uid).collection('recipes').doc().set(falseObj)
                        setMessage("The recipe has begun progressing and will appear in your dashboard shortly.")
                        return true
                    } catch (err) {
                        setMessage("Something went wrong. Please try again later. If the problem persists, feel free to contact us.")
                        console.log(err)
                    }
                } 
                return false;
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again later. If the problem persists, feel free to contact us.")
            return false;
        }
    } else { 
        setMessage("Not enough tokens to complete transaction") 
        return false; 
    }
}

