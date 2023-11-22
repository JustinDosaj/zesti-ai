"use client;"
import { Container } from '../shared/container'
import { DeleteConfirmationModal } from '../shared/modals'
import { useState } from 'react'
import { SuccessRecipe, FailedRecipe, LoadingRecipe } from './grid-status'

interface Recipe {
  id: string;
  complete: boolean;
  failed?: boolean;
  // other fields
}

interface GridDisplayProps {
  data: Recipe[];
}

export function GridDisplay({data}: GridDisplayProps) {

    const [ isDeleteOpen, setIsDeleteOpen ] = useState<boolean>(false)
    const [ selectedRecipeId, setSelectedRecipeId ] = useState<string | null>(null);
    //const { user } = useAuth

    return(
    <Container className={"flex flex-col lg:flex-wrap gap-10 lg:gap-4 pb-28"}>
      <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">Saved Recipes</h3>
      <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
      {data.map((recipe: any) => {
        if (recipe.complete == false) {
          return(
            <LoadingRecipe key={recipe.id} recipe={recipe}/>
          )
        }
        else if (recipe.failed && recipe.failed == true) {
          return (
            <FailedRecipe key={recipe.id} recipe={recipe} isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} selectedRecipeId={selectedRecipeId} setSelectedRecipeId={setSelectedRecipeId}/>
          )
        }
        else {
          return (
            <SuccessRecipe key={recipe.id} recipe={recipe} isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} selectedRecipeId={selectedRecipeId} setSelectedRecipeId={setSelectedRecipeId}/>
          )
        }
      })}
    </ul>
      <DeleteConfirmationModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} recipeId={selectedRecipeId}/>
    </Container>
    )
}