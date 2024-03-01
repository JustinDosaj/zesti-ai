import { db } from "@/pages/api/firebase/firebase"
import { getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { SendErrorToFirestore } from "@/pages/api/firebase/functions"


const useCreatorDoc = (userId: string | undefined) => {

    const [ hasPage, setHasPage ] = useState<boolean>(false)
    const [ loadingCreatorDoc, setLoadingCreatorDoc ] = useState<boolean>(true)

    useEffect( () => {

        const checkForPage = async () => {
            if(userId) {
                try{
                    const docRef = db.collection('creators').doc(userId)
                    const docSnap = await getDoc(docRef)
                    setHasPage(docSnap.exists())
                    setLoadingCreatorDoc(false)
                } catch (err) {
                    SendErrorToFirestore(userId, err, null, __filename)
                } 
            } else {
                setLoadingCreatorDoc(false)
                setHasPage(false)
            }
        }   

        checkForPage();

    },[userId])

    return {hasPage, loadingCreatorDoc}

}


export default useCreatorDoc