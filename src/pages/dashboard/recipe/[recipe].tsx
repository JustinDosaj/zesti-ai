import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { PlusIcon, VideoCameraIcon } from '@heroicons/react/20/solid'
import React, {useEffect, useState} from 'react'
import { useAuth } from "@/pages/api/auth/auth";
import { useRouter } from 'next/router';
import { Container } from "@/components/shared/container";
import { PageLoader } from "@/components/shared/loader";
import Head from "next/head";
import { RecipePopOutMenu, EditRecipeInput, InstructionPopOutMenu, EditInstructionInput } from "@/components/recipe/recipe";
import { Chatbox } from "@/components/chat/chatbox";
import { RecipePageAmazonProduct } from "@/components/google/ads";
import { db } from "@/pages/api/firebase/firebase";
import { AddToRecipeModal } from "@/components/shared/modals";
import GoogleTags from "@/components/google/conversion";
import AdSenseDisplay from "@/components/google/adsense";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.recipe as string

    const collectionSnapshot = await db.collection('amazonproducts').get();
    const totalProducts = collectionSnapshot.size
    const randIdx = Math.floor(Math.random() * totalProducts)
    const docSnapshot = await db.doc(`amazonproducts/${randIdx}`).get()
    const ad = docSnapshot.exists ? docSnapshot.data() : null

    return {props: {id, ad}}
}


const Recipe: React.FC = ({id, ad}: any) => {

    const { user, isLoading, stripeRole } = useAuth();

    const [recipe, setRecipe] = useState<any>([])
    const [url, setUrl] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)
    const [editingIngredientIndex, setEditingIngredientIndex] = useState<number | null>(null);
    const [editingInstructionIndex, setEditingInstructionIndex] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [addType, setAddType] = useState<string>('')
    const router = useRouter();


    useEffect(() => {
      if (user == null && isLoading == false) {
        router.replace('/');
      } else if (user !== null && isLoading == false) {
        const unsubscribe = db.doc(`users/${user.uid}/recipes/${id}`)
          .onSnapshot((docSnapshot) => {
            if (docSnapshot.exists) {
              setRecipe(docSnapshot.data()?.data);
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

    const handleDeleteIngredient = async (index: number) => {
      // Copy the current ingredients array
      const updatedIngredients = [...recipe.ingredients];
  
      // Remove the ingredient at the specified index
      updatedIngredients.splice(index, 1);
  
      // Update the local state
      setRecipe((prevRecipe: any) => ({
          ...prevRecipe,
          data: {
              ...prevRecipe.data,
              ingredients: updatedIngredients,
          },
      }));
  
      // Update Firestore
      const recipeRef = db.collection(`users/${user?.uid}/recipes`).doc(id);
      try {
          await recipeRef.update({
              'data.ingredients': updatedIngredients,
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
            data: {
                ...prevRecipe.data,
                ingredients: updatedIngredients,
            },
        }));
        

        // Update Firestore
        const recipeRef = db.collection(`users/${user?.uid}/recipes`).doc(id);
        try {
            await recipeRef.update({
                'data.ingredients': updatedIngredients,
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

    if(!recipe.name) return <PageLoader/>

    return(
    <>
    <Head>
      <title>{recipe.name}</title>
      <meta name="robots" content="noindex" />
      <GoogleTags/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
      {stripeRole == 'premium' ? <Chatbox/> : <></>}
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-36 animate-fadeInFast"}>
       <div className="bg-white py-5 border w-full rounded-lg p-4 md:p-12">
        <div className="md:flex md:space-x-4">
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
          { url !== '' ?
            <button onClick={() => window.open(url)}
              className="mt-4 md:mt-0 inline-flex text-primary-main h-fit border-primary-main border rounded-lg p-2 transition bg-white hover:text-white hover:bg-primary-main"
            >
              <div className="flex gap-x-2">
                <VideoCameraIcon className="h-6 w-6"/>
                <p>Original Recipe</p>
                </div>
            </button>
            :
            <div></div>
          }
        </div>
      </div>
      </Container>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 animate-fadeInFast"}>
        <div className="my-auto w-full bg-white py-5 border rounded-lg p-4 md:p-12">
          <div className="flex pt-4 pb-4 justify-between items-center">
            <h2 className="text-lg font-medium text-gray-500">Ingredients {`(${recipe?.ingredients?.length})`}</h2>
            <button className="hidden xs:inline-flex bg-gray-300 hover:bg-gray-400 space-x-1 p-2 rounded items-center" onClick={() => {
              setIsOpen(true)
              setAddType('ingredient')
            }}>
              <PlusIcon className="h-4 w-4 text-gray-700"/>
              <span className="text-gray-700">Add Ingredient</span>
            </button>
          </div>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 capitalize">
            {recipe?.ingredients?.map((ingred: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-visible w-full">
                  <div className="bg-amber-400 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-md text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                    <EditRecipeInput edit={edit} setEdit={setEdit} ingredient={ingred} isEditing={editingIngredientIndex === index} setEditingIngredientIndex={setEditingIngredientIndex} index={index} onSave={handleSaveIngredient}/>
                    <RecipePopOutMenu edit={edit} setEdit={setEdit} setEditingIngredientIndex={setEditingIngredientIndex} index={index} role={stripeRole} onSave={handleDeleteIngredient}/>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="xs:hidden flex pt-4 pb-4 justify-end">
            <button className="bg-gray-300 p-2 rounded inline-flex items-center hover:bg-gray-400 space-x-1" onClick={() => {
                setIsOpen(true)
                setAddType('ingredient')
            }}>
              <PlusIcon className="text-gray-700 h-4 w-4"/>
              <span className="text-gray-700">Add Ingredient</span>
            </button>
          </div>
        </div>
      </Container>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 animate-fadeInFast"}>
        <div className="my-auto bg-white py-5 border w-full rounded-lg p-4 md:p-12 ">
          <div className="flex pt-4 pb-4 justify-between items-center">
            <h2 className="text-lg font-medium text-gray-500">Instructions {`(${recipe?.instructions?.length})`}</h2>
            <button className="hidden xs:inline-flex bg-gray-300 hover:bg-gray-400 space-x-1 p-2 rounded items-center" onClick={() => {
              setIsOpen(true)
              setAddType('instruction')
            }}>
              <PlusIcon className="text-gray-700 h-4 w-4"/>
              <span className="text-gray-700">Add Instruction</span>
            </button>
          </div>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
            {recipe?.instructions?.map((instruct: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-visible w-full">
                  <div className="bg-green-600 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-medium text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                      <EditInstructionInput edit={edit} setEdit={setEdit} instruction={instruct} isEditing={editingInstructionIndex === index} setEditingIngredientIndex={setEditingInstructionIndex} index={index} onSave={handleSaveInstruction}/>
                      <InstructionPopOutMenu edit={edit} setEdit={setEdit} setEditingInstructionIndex={setEditingInstructionIndex} index={index} role={stripeRole} onSave={handleDeleteInstruction}/>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="xs:hidden flex pt-4 pb-4 justify-end">
            <button className="bg-gray-300 hover:bg-gray-400 space-x-1 p-2 rounded inline-flex items-center" onClick={() => {
              setIsOpen(true)
              setAddType('instruction')
            }}>
              <PlusIcon className="text-gray-700 h-4 w-4"/>
              <span className="text-gray-700">Add Instruction</span>
            </button>
          </div>
        </div>
      </Container>
      {stripeRole !== 'premium' ? 
        <div className="flex justify-center mx-auto w-screen py-12">
          <AdSenseDisplay adSlot="9326575118" adFormat="auto"/>
        </div>
      :
      <div className="mb-36"/>
      }
    </main>
    <AddToRecipeModal isOpen={isOpen} setIsOpen={setIsOpen} addType={addType} onSubmit={handleAddToRecipeSubmit}/>
    </>
    )
}

export default Recipe