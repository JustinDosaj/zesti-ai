import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import React, {useEffect, useState} from 'react'
import { useAuth } from "@/pages/api/auth/auth";
import { useRouter } from 'next/router';
import { PageLoader } from "@/components/shared/loader";
import Head from "next/head";
import { RecipeTitle, IngredientList, InstructionList } from "@/components/recipe/recipe";
import { Chatbox } from "@/components/chat/chatbox";
import { db } from "@/pages/api/firebase/firebase";
import { AddToRecipeModal } from "@/components/shared/modals";
import GoogleTags from "@/components/tags/conversion";
import AdSenseDisplay from "@/components/tags/adsense";
import { PromoteKitTag } from "@/components/tags/headertags";
import { CreatorRecipeTitle } from "@/components/recipe/creator_recipe";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.recipe_id as string
    return {props: {id}}
}

const Recipe: React.FC = ({id}: any) => {

    const { user, isLoading, stripeRole } = useAuth();

    const [recipe, setRecipe] = useState<any>([])
    const [url, setUrl] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>('')
    const [editingIngredientIndex, setEditingIngredientIndex] = useState<number | null>(null);
    const [editingInstructionIndex, setEditingInstructionIndex] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [addType, setAddType] = useState<string>('')
    const router = useRouter();


    useEffect(() => {
      if (user == null && isLoading == false) {
        router.replace('/');
      } else if (user !== null && isLoading == false) {
        const unsubscribe = db.doc(`creators/${user.uid}/recipes/${id}`)
          .onSnapshot((docSnapshot) => {
            if (docSnapshot.exists) {
              setRecipe(docSnapshot.data());
              setUrl(docSnapshot.data()?.url ? docSnapshot.data()?.url : '')
            } else {
              console.log("Doc doesnt exist")
            }
          });
    
        return () => unsubscribe();
      }
    }, [user, isLoading, id, router, edit]);

    const handleSaveIngredient = async (index: number, newValue: string) => {
      // Update the local state to reflect the changes immediately
      const updatedIngredients = [...recipe.ingredients];
      updatedIngredients[index] = newValue;

      const recipeRef = db.collection(`users/${user?.uid}/recipes`).doc(id);
      try {
        await recipeRef.update({
          'ingredients': updatedIngredients // Directly updating the nested field
        });
        console.log('Ingredient updated successfully in Firestore!');
    
        // Optimistically update the local state right after sending the Firestore update
        setRecipe((prevRecipe: any) => ({
          ...prevRecipe,
          ingredients: updatedIngredients,
        }));
      } catch (error) {
        console.error('Error updating ingredient in Firestore:', error);
        // Optionally handle the error here
      }
    };

    const handleSaveInstruction = async (index: number, newValue: string) => {
      // Update the local state to reflect the changes immediately
      const updatedInstructions = [...recipe.instructions];
      updatedInstructions[index] = newValue;

      const recipeRef = db.collection(`users/${user?.uid}/recipes`).doc(id);
      try {
        await recipeRef.update({
          'instructions': updatedInstructions // Directly updating the nested field
        });
        console.log('Instruction updated successfully in Firestore!');
    
        // Optimistically update the local state right after sending the Firestore update
        setRecipe((prevRecipe: any) => ({
          ...prevRecipe,
          instructions: updatedInstructions
        }));
      } catch (error) {
        console.error('Error updating instructions in Firestore:', error);
        // Optionally handle the error here
      }
    };

    const handleDeleteIngredient = async (index: number) => {
      // Copy the current ingredients array
      const updatedIngredients = [...recipe.ingredients];
  
      // Remove the ingredient at the specified index
      updatedIngredients.splice(index, 1);
  
      // Update the local state
      setRecipe((prevRecipe: any) => ({
          ...prevRecipe,
          ingredients: updatedIngredients,
      }));
  
      // Update Firestore
      const recipeRef = db.collection(`users/${user?.uid}/recipes`).doc(id);
      try {
          await recipeRef.update({
              'ingredients': updatedIngredients,
          });
          console.log('Ingredient deleted successfully from Firestore');
      } catch (error) {
          console.error('Error deleting ingredient from Firestore:', error);
      }
    };

    const handleDeleteInstruction = async (index: number) => {
      // Copy the current ingredients array
      const updatedInstructions = [...recipe.instructions];
  
      // Remove the ingredient at the specified index
      updatedInstructions.splice(index, 1);
  
      // Update the local state
      setRecipe((prevRecipe: any) => ({
          ...prevRecipe,
          instructions: updatedInstructions,
      }));
  
      // Update Firestore
      const recipeRef = db.collection(`users/${user?.uid}/recipes`).doc(id);
      try {
          await recipeRef.update({
              'instructions': updatedInstructions,
          });
          console.log('Instruction deleted successfully from Firestore');
      } catch (error) {
          console.error('Error deleting Instruction from Firestore:', error);
      }
    };

    const handleAddToRecipeSubmit = async (userInput: string) => {
      if (!userInput) {
          console.error('No ingredient provided');
          return;
      }

      // Add the new ingredient to the existing list
      if (addType == 'ingredient') {
        const updatedIngredients = [...recipe.ingredients, userInput];

        // Update the local state
        setRecipe((prevRecipe: any) => ({
            ...prevRecipe,
            ingredients: updatedIngredients,
        }));
        

        // Update Firestore
        const recipeRef = db.collection(`users/${user?.uid}/recipes`).doc(id);
        try {
            await recipeRef.update({
                'ingredients': updatedIngredients,
            });
            console.log('Ingredient added successfully to Firestore');
        } catch (error) {
            console.error('Error adding ingredient to Firestore:', error);
        }
      } else if (addType == 'instruction') {
        const updatedInstructions = [...recipe.instructions, userInput];

        // Update the local state
        setRecipe((prevRecipe: any) => ({
            ...prevRecipe,
            data: {
                ...prevRecipe.data,
                instructions: updatedInstructions,
            },
        }));
        

        // Update Firestore
        const recipeRef = db.collection(`users/${user?.uid}/recipes`).doc(id);
        try {
            await recipeRef.update({
                'data.instructions': updatedInstructions,
            });
            console.log('Ingredient added successfully to Firestore');
        } catch (error) {
            console.error('Error adding ingredient to Firestore:', error);
        }
      }
    }
    
    const handleSaveTitle = async (newValue: string) => {

      const recipeRef = db.collection(`users/${user?.uid}/recipes`).doc(id);
      try {
        await recipeRef.update({
          'data.name': newValue // Directly updating the nested field
        });
        console.log('Ingredient updated successfully in Firestore!');
    
        // Optimistically update the local state right after sending the Firestore update
        setRecipe((prevRecipe: any) => ({
          ...prevRecipe,
          data: {
            ...prevRecipe.data,
            name: newValue
          }
        }));
      } catch (error) {
        console.error('Error updating ingredient in Firestore:', error);
        // Optionally handle the error here
      }

    }

    if(!recipe.name) return <PageLoader/>

    return(
    <>
    <Head>
      <title>{recipe.name}</title>
      <meta name="robots" content="noindex" />
      <link rel="preload" href="/images/zesti-logos/Zesti-Premium-2.png" as="image"></link>
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-6 bg-background ${raleway.className}`}>
          <CreatorRecipeTitle recipe={recipe} url={url}/>
    </main>
    </>
    )
}

export default Recipe