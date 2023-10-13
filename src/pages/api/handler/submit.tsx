import { db } from "../firebase/firebase";
import { Scrape } from "../tools/scraper";

export interface Props {
    url: any,
    user: any, 
}

export const handleSubmit = async ({url, user}: Props): Promise<void> => {

    const response = await Scrape(url)
    const obj = {
        "url": `${url}`,
        "rawData": response,
        "complete": false,
    }
    
    if(user){
        try {
           await db.collection('users').doc(user.uid).collection('recipes').doc().set(obj)
        } catch (err) {
            console.log(err)
        }
    }
}

