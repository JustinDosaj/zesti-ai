import { db } from "../firebase/firebase";
import { Scrape } from "../scrape/scraper";

export interface Props {
    url: any,
    user: any, 
}

export const handleSubmit = async ({url, user}: Props): Promise<void> => {

    const name = await cleanUrl(url)
    const response = await Scrape(url)
    const obj = {
        "url": `${url}`,
        "rawData": response,
    }
    
    if(user){
        try {
            await db.collection('users').doc(user.uid).collection('pages').doc(name).set(obj)
        } catch (err) {
            console.log(err)
        }
    }
}

export const cleanUrl = async (url: any) => {
    let name = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    name = name.split('/')[0];
    return name
}