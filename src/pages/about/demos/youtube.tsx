import { Raleway } from 'next/font/google'
import { VideoCameraIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Container } from "@/components/shared/container";
import GoogleTags from '@/components/google/conversion';
import { Title } from '@/components/shared/title';
import { InlineBtnLink } from '@/components/shared/button';
import { useAuth } from '@/pages/api/auth/auth';

import Head from "next/head";

const raleway = Raleway({subsets: ['latin']})


const demoObj = {
    "name": "Fluffy and Moist Blueberry Muffins",
    "time": 75, // As the time was not provided, I've set it to null.
    "servings": null, // Since the number of servings was not provided, I've set it to null.
    "description": "Fluffy and moist blueberry muffins loaded with a ton of blueberries, topped with a simple and delicious brown sugar streusel.",
    "ingredients": [
        "2 cups of all-purpose flour",
        "1 teaspoon of baking powder",
        "1/2 teaspoon of baking soda",
        "1/4 teaspoon of salt",
        "1 1/2 cups of fresh blueberries",
        "3 eggs",
        "1 cup of granulated sugar",
        "1 teaspoon of vanilla extract",
        "1 tablespoon of fresh lemon juice",
        "3/4 cups of heavy cream",
        "4 tablespoons of melted unsalted butter",
        "1 tablespoon of unsalted cold cube butter",
        "2 tablespoons of all-purpose flour",
        "A pinch of salt",
        "1 teaspoon of cinnamon",
        "3 tablespoons of brown sugar"
    ],
    "instructions": [
        "Combine all-purpose flour, baking powder, baking soda, and salt in a large bowl and whisk together. Reserve 1 tablespoon of the flour mixture.",
        "Mix the reserved flour mixture with the fresh blueberries.",
        "In a separate large bowl, whisk the eggs on high speed with an electric mixer for about 3 minutes until fluffy and pale.",
        "Slowly add the granulated sugar to the beaten eggs and continue beating for about 3 more minutes.",
        "Add the vanilla extract and fresh lemon juice to the egg mixture and continue beating.",
        "Slowly add the heavy cream to the egg mixture while still beating.",
        "Gradually add about a third of the flour mixture to the batter, mixing in between.",
        "Slowly add the melted unsalted butter to the batter while still beating.",
        "Fold in the blueberries with a spatula.",
        "Line a muffin tin with cupcake liners and scoop the batter into them using a large cookie scoop.",
        "Optional: Top the muffins with a few extra blueberries.",
        "Preheat the oven to 350 degrees Fahrenheit.",
        "In a small bowl, combine the unsalted cold cube butter, all-purpose flour, salt, cinnamon, and brown sugar. Mash them together with a fork until crumbly.",
        "Top the blueberry muffins with the streusel topping.",
        "Bake the muffins in the preheated oven for about 35 minutes at 350 degrees Fahrenheit."
    ]
}

const Demo: React.FC = () => {

    const { user } = useAuth()

    return(
    <>
    <Head>
      <title>Zesti YouTube Demo | Instantly Save YouTube Cooking Videos</title>
      <meta name="title" content="Zesti YouTube Demo | Instantly Save YouTube Cooking Videos"/>
      <meta name="description" content="Check out our demo recipe so you can see the results of transforming a Youtube cooking video into a readible recipe!"/>
      <GoogleTags/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background mt-12${raleway.className}`}>
      <div className="text-center space-y-2">
        <Title className="text-gray-900 text-3xl mt-36">YouTube Recipe</Title>
        {user ? 
        <p className="text-gray-700 pl-5 pr-5">This is a demo output of Zesti. Visit <InlineBtnLink href='/dashboard' text="Your Dashboard"/> to start using Zesti</p>
        :
        <p className="text-gray-700 pl-5 pr-5">This is a demo output of Zesti. To start using Zesti please <InlineBtnLink href='/login' text="Login or Sign Up"/></p>
        }
      </div>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 sm:mt-12"}>
       <div className="bg-white py-5 border w-full rounded-lg p-4 md:p-12">
        <div className="md:flex">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="gap-x-3 text-xl font-semibold text-gray-900 grid space-y-2 sm:inline-flex">
                {`${demoObj?.name}`}
                <div className="mt-2 inline-flex sm:mt-0 sm:space-y-0 gap-x-2 text-center">
                  { demoObj?.time == null ? 
                  <div></div>
                  :
                  <p className="bg-color-alt-green rounded-xl text-white text-sm p-1">{`${demoObj?.time} Minutes`}</p> 
                  }
                  { demoObj?.servings == null ? 
                  <div></div>
                  :
                  <p className="bg-color-alt-green rounded-xl text-white text-sm p-1">{`${demoObj?.servings} Servings`}</p>
                  }
                </div>
            </div>

            <p className="text-gray-500 w-full lg:w-1/2">
              {`${demoObj?.description}`}
            </p>
          </div>
            <button onClick={() => window.open("https://www.youtube.com/watch?v=gN-orgrgvU8")}
              className="mt-4 md:mt-0 inline-flex text-primary-main h-fit border-primary-main border rounded-lg p-2 transition bg-white hover:text-white hover:bg-primary-main"
            >
              <div className="flex gap-x-2">
                <VideoCameraIcon className="h-6 w-6"/>
                <p>Original Video</p>
                </div>
            </button>
        </div>
      </div>
      </Container>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12"}>
        <div className="my-auto overflow-hidden w-full bg-white py-5 border rounded-lg p-4 md:p-12">
          <h2 className="text-lg font-medium text-gray-500">Ingredients {`(${demoObj?.ingredients?.length})`}</h2>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {demoObj?.ingredients?.map((ingred: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-hidden w-full">
                  <div className="bg-amber-400 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-md text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <p className="text-gray-500 overflow-ellipsis whitespace-normal">{ingred}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 mb-36"}>
        <div className="my-auto overflow-hidden bg-white py-5 border w-full rounded-lg p-4 md:p-12 ">
          <h2 className="text-lg font-medium text-gray-500">Instructions {`(${demoObj?.instructions?.length})`}</h2>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
            {demoObj?.instructions?.map((instruct: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-hidden w-full">
                  <div className="bg-green-600 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-medium text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <p className="text-gray-500 overflow-ellipsis whitespace-normal">{instruct}</p>
                    </div>
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

export default Demo