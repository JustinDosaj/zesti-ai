import { db } from "@/pages/api/firebase/firebase"
import { getCreatorData } from "@/pages/api/firebase/functions"
import { getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"


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
                    console.log("Error checking for creator page: ", err)
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