import { db } from "@/pages/api/firebase/firebase";
import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react";
import { SendErrorToFirestore } from "@/pages/api/firebase/functions";


const useErrorRecipeList = (ownerId: string | undefined) => {
    
    const [ errorRecipeList, setErrorRecipeList ] = useState<any>([])
    const [ isLoadingErrorRecipe, setIsLoadingErrorRecipe ] = useState<boolean>(true)

    useEffect(() => {

        if (ownerId) {
            // Reference the specific owner's error recipes collection
            const errorsRef = db.collection(`creators/${ownerId}/errors`);
      
            // Listen for real-time updates with onSnapshot
            const unsubscribe = onSnapshot(errorsRef, (querySnapshot) => {
              const updatedErrors = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setErrorRecipeList(updatedErrors);
              setIsLoadingErrorRecipe(false);
            }, async (error) => {
              SendErrorToFirestore(ownerId, error, null, __filename)
              setIsLoadingErrorRecipe(false);
            });
      
            // Cleanup function to unsubscribe when the component unmounts or ownerId changes
            return () => {
              unsubscribe();
            };
          } else {
            // Optionally handle cases where ownerId is undefined, for example:
            setErrorRecipeList([]); // Reset the list
            setIsLoadingErrorRecipe(false); // Consider setting loading to false as there's no ownerId to load errors for
          }
    },[ownerId])

    return { errorRecipeList, isLoadingErrorRecipe }

}

export default useErrorRecipeList