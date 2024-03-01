// hooks/useFetchRecipes.ts
import { useState, useEffect } from 'react';
import { db } from '@/pages/api/firebase/firebase';
import { onSnapshot } from "firebase/firestore"
import { SendErrorToFirestore } from '@/pages/api/firebase/functions';

const useCreatorRecipeList = (creatorId: string | undefined) => {
  
  const [creatorRecipeList, setCreatorRecipeList] = useState<any[]>([]);
  const [loadingCreatorRecipes, setLoadingCreatorRecipes] = useState<boolean>(true);

  useEffect(() => {

    if (creatorId) {
      // Reference the specific creator's recipes collection
      const recipesRef = db.collection(`creators/${creatorId}/recipes`);

      // Listen for real-time updates with onSnapshot
      const unsubscribe = onSnapshot(recipesRef, (querySnapshot) => {
        const updatedRecipes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCreatorRecipeList(updatedRecipes);
        setLoadingCreatorRecipes(false);
      }, (error) => {
        SendErrorToFirestore(creatorId, error, null, __filename)
        setLoadingCreatorRecipes(false);
      });

      // Cleanup function to unsubscribe when the component unmounts or creatorId changes
      return () => {
        unsubscribe();
      };
    } else {
      // Handle cases where creatorId is undefined
      setLoadingCreatorRecipes(false); // Consider setting loading to false as there's no creatorId to load recipes for
    }

  }, [creatorId]);

  return { creatorRecipeList, loadingCreatorRecipes };
};

export default useCreatorRecipeList;
