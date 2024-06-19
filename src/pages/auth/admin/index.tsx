import Head from 'next/head';
import { PageLoader } from '@/components/shared/loader';
import { useState } from 'react';
import useRequireAdmin from '@/hooks/admin/useRequireAdmin';
import { AdminMassUpdateRecipes, AdminUpdateRecipe } from '@/pages/api/admin/functions';
import OpenAI from 'openai';

export default function Home() {
  
  const isAdmin = useRequireAdmin();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ userInput, setUserInput ] = useState<string>("");

  if(!isAdmin) return <PageLoader/>

  const combine = "not not not not not i lost my mind and i lost control i see your eyes look through my soul don't be surprised that's all i know i felt the highs i ain't feeling Baking therapy🫐🌷🍋                               Recipe                                                          Ingredients: (Blueberry Syrup) -1 cup blueberries (fresh or frozen) -1/4 cup sugar -1/2 cup water -1/2 Tbsp cornstarch + 1 Tbsp water (Crumble) -1/2 cup sugar -1/2 cup all-purpose flour (60g) -1/4 cup unsalted butter (56g) -pinch of salt  (Muffins) -1/2 cup softened butter (113g) -1 Tbsp lemon zest -1 1/4 cups sugar -2 eggs -1 tsp vanilla -2 cups all-purpose flour (240g) -1/2 tsp salt -2 tsp baking powder -1/2 cup milk  -2 cups blueberries  Instructions: For the syrup:  1. Combine 1 Tbsp of water and cornstarch in a small dish and set aside.  2. In a medium saucepan bring water, sugar, and blueberries to a boil. Stir occasionally. Reduce heat and simmer for about 10 minutes.  3. Add the water+cornstarch mixture and mix to combine. Turn off heat and set aside to cool.  For the crumble:  1. Stir together 1/2 cup flour, 1/2 cup sugar, and a pinch of salt.  2. Add 1/4 cup unsalted butter diced into cubes and work the butter into the flour mixture with your fingers until a crumbly mixture has formed. Set aside. For the muffins:  1. Preheat oven to 375°F. 2. Add the sugar and lemon zest to a large bowl. 3. Add the butter and mix until light in color.  4. Add the eggs, one at a time, beating well after each addition. Then add vanilla and mix.  5. In a small bowl sift together the flour, salt, and baking powder.  6. Add the dry ingredients to the creamed mixture alternately with the milk. 7. Fold in the blueberries. 8. Line a 12 cup muffin tin with cupcake liners, and fill with batter. (I did 6 jumbo muffins) 9. Add the blueberry syrup on top of the muffins and sprinkle the crumble before baking. 10. Bake at 375°F for about 30-35 minutes."

  const handleSubmit = async () => {
    setIsLoading(true)
    
    const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY, dangerouslyAllowBrowser: true})

    const completion = await openai.chat.completions.create({
      messages: [{ role:"user", content: combine }],
      model: "gpt-4-turbo",
      tool_choice: "auto",
      tools: [{
          type: "function",
          function: {
              name: "get_recipe_from_transcript",
              description: "Get recipe from transcript of TikTok Video",
              parameters: {
                  type: "object",
                  properties: {
                      name: {
                          type: "string",
                          description: "Generate a relavent name for the recipe"
                      },
                      description: {
                          type: "string",
                          description: "Create a one sentence description for the recipe"
                      },
                      ingredients: {
                          type: "array",
                          description: "List of ingredients for the recipe (include measurements if provided)",
                          items: {
                              type: "string"
                          }
                      },
                      instructions: {
                          type: "array",
                          description: "List of instructions from the recipe",
                          items: {
                              type: "string"
                          }
                      },
                      cuisine: {
                          type: "string",
                          description: "Name recipe cuisine type, ie. Italian, Mexican, American etc."
                      },
                      recipeCategory: {
                          type: "string",
                          description: "Name recipe category type, ie. dessert, main course, breakfast, etc."
                      },
                      prep_time: {
                          type: "string",
                          description: "Estimated prep time in ISO 8601 duration format, e.g. PT15M"
                      },
                      cook_time: {
                          type: "string",
                          description: "Estimated cook time in ISO 8601 duration format, e.g. PT20M"
                      },
                      recipeYield: {
                          type: "string",
                          description: "Estimated yield of the recipe eg. 4 servings"
                      },
                      keywords: {
                          type: "array",
                          description: "3 to 5 Keywords that describe the recipe",
                          items: {
                              type: "string",
                          }
                      }
                  },
                  required: ["name", "description", "ingredients", "instructions"],
              }
          }
      }],
    })

    console.log("completion", completion)

    const toolCalls = completion?.choices[0]?.message
    let nextToolStep = ""
    console.log("toolCalls: ", toolCalls)

    if (toolCalls && toolCalls.tool_calls && toolCalls.tool_calls.length > 0) {
      nextToolStep = toolCalls.tool_calls[0].function.arguments
    }

    const parsedTool = JSON.parse(nextToolStep)
    console.log("parsedTool", parsedTool)


    setIsLoading(false)
  }


  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Admin | Restricted Access</title>
     </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen pb-28`}>
        <div className="my-auto space-x-4">
          <input type="text" className="bg-primary text-black p-2 rounded-md border border-gray-300" placeholder="Search for a user" onChange={(e) => setUserInput(e.target.value)} value={userInput}/>
          <button 
            disabled={isLoading}
            type="button"
            onClick={handleSubmit} 
            className="border bg-primary-main text-white p-2 rounded-3xl hover:bg-primary-alt">
              {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </main>
    </>
  )
}
