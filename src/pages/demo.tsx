import { Raleway } from 'next/font/google'
import { VideoCameraIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Container } from "@/components/shared/container";

import Head from "next/head";

const raleway = Raleway({subsets: ['latin']})


const demoObj = {"name": "Perfect French Toast", "ingredients": ["1 cup of milk", "2 eggs", "cinnamon", "nutmeg", "cloves", "1 tablespoon of sugar", "dash of vanilla", "clarified butter", "bread slices"], "instructions": ["In a bowl, mix together the milk and eggs.", "Add in the spices (cinnamon, nutmeg, and cloves) and mix well.", "Stir in the sugar and vanilla.", "Warm up a skillet with clarified butter.", "Dip bread slices into the custard mixture for about 10 seconds per side.", "Place the bread slices in the skillet and cook for 7 and a half minutes per side, without touching.", "Serve the French toast with desired toppings like strawberries, blueberries, syrup, and powdered sugar."], "description": "Learn how to make the perfect French toast by combining a custard mixture with spices and cooking it until golden and crispy on the outside, with a soft and fluffy interior. It can be customized with your favorite toppings.", "time": null, "servings": null}

const Demo: React.FC = () => {

    return(
    <>
    <Head>
      <title>Zesti | Example Recipe</title>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background mt-12${raleway.className}`}>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-36"}>
       <div className="bg-white py-5 border w-full rounded-lg p-4 md:p-12">
        <div className="md:flex">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="gap-x-3 text-xl font-semibold text-gray-900 grid space-y-2 sm:inline-flex">
                {`${demoObj?.name} (Example Output)`}
                <div className="mt-1 space-y-2 sm:inline-flex sm:mt-0 sm:space-y-0 gap-x-2 text-center">
                  { demoObj?.time == null ? 
                  <div></div>
                  :
                  <p className="bg-green-500 rounded-xl text-white text-sm p-1">{`${demoObj?.time} Minutes`}</p> 
                  }
                  { demoObj?.servings == null ? 
                  <div></div>
                  :
                  <p className="bg-green-500 rounded-xl text-white text-sm p-1">{`${demoObj?.servings} Servings`}</p>
                  }
                </div>
            </div>

            <p className="text-gray-500">
              {`${demoObj?.description}`}
            </p>
          </div>
            <button onClick={() => window.open("https://www.youtube.com/shorts/7O0pKKlw2fA")}
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
                  <div className="bg-yellow-500 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-md text-white" >
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