import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { VideoCameraIcon } from '@heroicons/react/20/solid'
import React, {useEffect, useState} from 'react'
import { useAuth } from "@/pages/api/auth/auth";
import { useRouter } from 'next/router';
import { Container } from "@/components/shared/container";
import { PageLoader } from "@/components/shared/loader";
import Head from "next/head";
import { RecipePopOutMenu, EditRecipeInput, InstructionPopOutMenu, EditInstructionInput } from "@/components/recipe/recipe";
import { db } from "@/pages/api/firebase/firebase";
import { Chatbox } from "@/components/chat/chatbox";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.recipe as string
    return {props: {id: id}}
}


const Recipe: React.FC = ({id}: any) => {

    const { user, isLoading, stripeRole } = useAuth();
    const [recipe, setRecipe] = useState<any>([])
    const [url, setUrl] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)
    const [editingIngredientIndex, setEditingIngredientIndex] = useState<number | null>(null);
    const [editingInstructionIndex, setEditingInstructionIndex] = useState<number | null>(null);
    const router = useRouter();


    useEffect(() => {
      if (user == null && isLoading == false) {
        router.replace('/');
      } else if (user !== null && isLoading == false) {
        const unsubscribe = db.doc(`users/${user.uid}/recipes/${id}`)
          .onSnapshot((docSnapshot) => {
            if (docSnapshot.exists) {
              setRecipe(docSnapshot.data()?.data);
              setUrl(docSnapshot.data()?.url)
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
          'data.ingredients': updatedIngredients // Directly updating the nested field
        });
        console.log('Ingredient updated successfully in Firestore!');
    
        // Optimistically update the local state right after sending the Firestore update
        setRecipe((prevRecipe: any) => ({
          ...prevRecipe,
          data: {
            ...prevRecipe.data,
            ingredients: updatedIngredients
          }
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
          'data.instructions': updatedInstructions // Directly updating the nested field
        });
        console.log('Instruction updated successfully in Firestore!');
    
        // Optimistically update the local state right after sending the Firestore update
        setRecipe((prevRecipe: any) => ({
          ...prevRecipe,
          data: {
            ...prevRecipe.data,
            instructions: updatedInstructions
          }
        }));
      } catch (error) {
        console.error('Error updating instructions in Firestore:', error);
        // Optionally handle the error here
      }
    };

    if(!recipe.name) return <PageLoader/>

    return(
    <>
    <Head>
      <title>{recipe.name}</title>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background mt-12${raleway.className}`}>
      <Chatbox/>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-36"}>
       <div className="bg-white py-5 border w-full rounded-lg p-4 md:p-12">
        <div className="md:flex">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="gap-x-3 text-xl font-semibold text-gray-900 grid space-y-2 sm:inline-flex">
                {recipe?.name}
                <div className="mt-2 inline-flex sm:mt-0 sm:space-y-0 gap-x-2 text-center">
                  { recipe.time == null ? 
                  <div></div>
                  :
                  <p className="bg-green-500 rounded-xl text-white text-sm p-1">{`${recipe?.time} Minutes`}</p> 
                  }
                  { recipe.servings == null ? 
                  <div></div>
                  :
                  <p className="bg-green-500 rounded-xl text-white text-sm p-1">{`${recipe?.servings} Servings`}</p>
                  }
                </div>
            </div>

            <p className="text-gray-500">
              {`${recipe?.description}`}
            </p>
          </div>
            <button onClick={() => window.open(url)}
              className="mt-4 md:mt-0 inline-flex text-primary-main h-fit border-primary-main border rounded-lg p-2 transition bg-white hover:text-white hover:bg-primary-main"
            >
              <div className="flex gap-x-2">
                <VideoCameraIcon className="h-6 w-6"/>
                <p>Original Recipe</p>
                </div>
            </button>
        </div>
      </div>
      </Container>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12"}>
        <div className="my-auto overflow-hidden w-full bg-white py-5 border rounded-lg p-4 md:p-12">
          <h2 className="text-lg font-medium text-gray-500">Ingredients {`(${recipe?.ingredients?.length})`}</h2>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {recipe?.ingredients?.map((ingred: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-visible w-full">
                  <div className="bg-amber-400 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-md text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                    <EditRecipeInput edit={edit} setEdit={setEdit} ingredient={ingred} isEditing={editingIngredientIndex === index} setEditingIngredientIndex={setEditingIngredientIndex} index={index} onSave={handleSaveIngredient}/>
                    <RecipePopOutMenu edit={edit} setEdit={setEdit} setEditingIngredientIndex={setEditingIngredientIndex} index={index} role={stripeRole}/>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 mb-36"}>
        <div className="my-auto overflow-hidden bg-white py-5 border w-full rounded-lg p-4 md:p-12 ">
          <h2 className="text-lg font-medium text-gray-500">Instructions {`(${recipe?.instructions?.length})`}</h2>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
            {recipe?.instructions?.map((instruct: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-visible w-full">
                  <div className="bg-green-600 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-medium text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                      <EditInstructionInput edit={edit} setEdit={setEdit} instruction={instruct} isEditing={editingInstructionIndex === index} setEditingIngredientIndex={setEditingInstructionIndex} index={index} onSave={handleSaveInstruction}/>
                      <InstructionPopOutMenu edit={edit} setEdit={setEdit} setEditingInstructionIndex={setEditingInstructionIndex} index={index} role={stripeRole}/>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
    </>
    )
}

export default Recipe