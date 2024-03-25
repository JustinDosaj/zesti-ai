// hooks/useFetchRecipes.ts
import { useState, useEffect } from 'react';
import { db } from '@/pages/api/firebase/firebase';
import { onSnapshot } from "firebase/firestore"
import { SendErrorToFirestore } from '@/pages/api/firebase/functions';
import { useAuth } from '@/pages/api/auth/auth';

const useCreatorRecipeList = (id: string | undefined) => {
  
  const [creatorRecipeList, setCreatorRecipeList] = useState<any[]>([]);
  const { user, isLoading } = useAuth();
  const [loadingCreatorRecipes, setLoadingCreatorRecipes] = useState<boolean>(true);

  useEffect(() => {

    if (id && !isLoading) {
      // Reference the specific creator's recipes collection
      const recipesRef = db.collection(`creators/${id}/recipes`);

      // Listen for real-time updates with onSnapshot
      const unsubscribe = onSnapshot(recipesRef, (querySnapshot) => {
        const updatedRecipes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCreatorRecipeList(updatedRecipes);
        setLoadingCreatorRecipes(false);
      }, (error) => {
        SendErrorToFirestore(user?.uid, error, null, __filename)
        setLoadingCreatorRecipes(false);
      });

      // Cleanup function to unsubscribe when the component unmounts or creatorId changes
      return () => {
        unsubscribe();
      };
    } else {
      // Handle cases where creatorId is undefined
      setLoadingCreatorRecipes(false);
    }

  }, [user, isLoading]);

  return { creatorRecipeList, loadingCreatorRecipes };
};

export default useCreatorRecipeList;
