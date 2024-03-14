import { db } from "@/pages/api/firebase/firebase"
import { getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { SendErrorToFirestore } from "@/pages/api/firebase/functions"
import { useAuth } from "@/pages/api/auth/auth"


// Checking creator has already created a page

const useCreatorDoc = () => {

    const [ hasPage, setHasPage ] = useState<boolean>(false)
    const [ loadingCreatorDoc, setLoadingCreatorDoc ] = useState<boolean>(true)
    const { isLoading, user } = useAuth() 

    useEffect( () => {

        const checkForPage = async () => {
            if(user?.uid) {
                try{
                    const docRef = db.collection('creators').doc(user.uid)
                    const docSnap = await getDoc(docRef)
                    setHasPage(docSnap.exists())
                    setLoadingCreatorDoc(false)
                } catch (err) {
                    SendErrorToFirestore(user.uid, err, null, __filename)
                } 
            } else {
                setLoadingCreatorDoc(false)
                setHasPage(false)
            }
        }   

        checkForPage();

    },[user, isLoading])

    return {hasPage, loadingCreatorDoc}

}


export default useCreatorDoc