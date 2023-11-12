"use client;"
import { Container } from '../shared/container'
import { DeleteConfirmationModal } from '../shared/modals'
import { useState, useEffect } from 'react'
import { SuccessRecipe, FailedRecipe, LoadingRecipe } from './grid-status'
import { useAuth } from '@/pages/api/auth/auth'

function classNames(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

const loadingObj = {
  "name": "Loading New Recipe",
  "time": "0",
  "servings": "0",
  "instructions": [],
  "ingredients": [],
}

interface Recipe {
  id: string;
  complete: boolean;
  failed?: boolean;
  // other fields
}

interface GridDisplayProps {
  data: Recipe[];
  user: any;
}

export function GridDisplay({data, user}: GridDisplayProps) {

  console.log("DATA: ", data)
    const [ isDeleteOpen, setIsDeleteOpen ] = useState<boolean>(false)
    const [ selectedRecipeId, setSelectedRecipeId ] = useState<string | null>(null);
    //const { user } = useAuth

    return(
    <Container className={"flex flex-col lg:flex-wrap gap-10 lg:gap-12 mb-28 mt-12"}>
      <h2 className="text-black font-semibold text-center text-4xl">Your Recipes</h2>
      <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
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