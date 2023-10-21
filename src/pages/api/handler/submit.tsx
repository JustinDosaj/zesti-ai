import { db } from "../firebase/firebase";
import { getUserData } from "../firebase/functions";

export interface Props {
    url: any,
    user: any, 
}

export const handleSubmit = async ({url, user}: Props): Promise<void> => {

    const url_id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/);
    let tokens = 0;
    const response = await getUserData(user?.uid).then((res) => {
        tokens = res?.tokens
    })
    
    if (tokens >= 10) {
        try {
            // Reference to the specific document in the recipes collection
            const recipeRef = db.collection('recipes').doc(url_id[1]);
        
            // Fetch the document
            const doc = await recipeRef.get();
            if (doc.exists) {
                // Extract the data from the document
                const recipeData = doc.data();
                
                const obj = {
                    "url": `${url}`,
                    "url_id": url_id ? url_id[1] : null,
                    "complete": true,
                    "data": recipeData?.data
                }
                
                if(user){
                    try {
                    await db.collection('users').doc(user.uid).collection('recipes').doc().set(obj)
                    } catch (err) {
                        console.log(err)
                    }
                }

                return;
            } else {

                const obj = {
                    "url": `${url}`,
                    "url_id": url_id ? url_id[1] : null,
                    "complete": false,
                }
            
                if(user){
                    try {
                    await db.collection('users').doc(user.uid).collection('recipes').doc().set(obj)
                    } catch (err) {
                        console.log(err)
                    }
                } 

                return;
            }
        } catch (error) {
            console.error("Error fetching recipe data: ", error);
            return;
        }
    } else { 
        console.log("Not enough tokens to complete transaction") 
        return; 
    }
}

