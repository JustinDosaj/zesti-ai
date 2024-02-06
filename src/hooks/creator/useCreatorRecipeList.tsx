// hooks/useFetchRecipes.ts
import { useState, useEffect } from 'react';
import { db } from '@/pages/api/firebase/firebase';

const useCreatorRecipeList = (creatorId: string | undefined) => {
  
  const [creatorRecipeList, setCreatorRecipeList] = useState<any[]>([]);
  const [loadingCreatorRecipes, setLoadingCreatorRecipes] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (creatorId) {
        try {
          const recipeSnapshot = await db.collection(`creators/${creatorId}/recipes`).get();
          const updatedRecipes = recipeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setCreatorRecipeList(updatedRecipes);
          setLoadingCreatorRecipes(false);
        } catch (err) {
          console.error('Error fetching recipes:', err);
          setLoadingCreatorRecipes(false);
        }
      }
    };

    fetchRecipes();
  }, [creatorId]);

  return { creatorRecipeList, loadingCreatorRecipes };
};

export default useCreatorRecipeList;
