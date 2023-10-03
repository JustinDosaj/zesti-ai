import { db } from "../firebase/firebase";

export interface Props {
    url: any,
    user: any, 
}

export const handleSubmit = async ({url, user}: Props): Promise<void> => {

    const obj = {
        "url": `${url}`,
        "name": "placeholder",
    }
    
    if(user){
        try {
            await db.collection('users').doc(user.uid).collection('pages').doc(url).set(obj)
        } catch (err) {
            console.log(err)
        }
    }
}