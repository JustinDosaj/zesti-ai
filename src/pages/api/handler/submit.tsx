import { db } from "../firebase/firebase";
import { getUserData } from "../firebase/functions";
import axios from 'axios'

export interface Props {
    url: any,
    user: any, 
}

export async function getVideoLength(url_id: any) {
    const apiKey = 'AIzaSyARw2ZZ4s06XGevQpMmrV06J6A8rOHtc8Q';

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


export const handleSubmit = async ({url, user}: Props): Promise<boolean> => {

    // Check if URL is empty
    if (url == '') { return false;}

    // Ensure video length is equal or below user sub usage rate
    const url_id = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/);
    const result = await getVideoLength(url_id ? url_id[1] : null)
    if ((result?.minutes || 0) > 1 || (result?.seconds || 0) > 60) { console.log("Video too long for base subscriber!"); return false; }

    // Get user tokens to check if they have enough to buy transcription
    let tokens = 0;
    await getUserData(user?.uid).then((res) => {tokens = res?.tokens})

    const falseObj = {
        "url": `${url}`,
        "url_id": url_id ? url_id[1] : null,
        "complete": false,
    }
    
    if (tokens >= 10) {
        try {
            // Reference to the specific document in the recipes collection
            const recipeRef = db.collection('recipes').doc(url_id[1]);
        
            // Fetch the document
            const doc = await recipeRef.get();
            if (doc.exists) {
                // Extract the data from the document
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
                    return true
                    } catch (err) {
                        console.log(err)
                    }
                }

                return false;
            } else {
            
                if(user){
                    try {
                    await db.collection('users').doc(user.uid).collection('recipes').doc().set(falseObj)
                    return true
                    } catch (err) {
                        console.log(err)
                    }
                } 
                return false;
            }
        } catch (error) {
            console.error("Error fetching recipe data: ", error);
            return false;
        }
    } else { 
        console.log("Not enough tokens to complete transaction") 
        return false; 
    }
}

