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
    "name": "French Toast",
    "time": 20,
    "servings": 4,
    "description": "Keep it simple with a 20-minute classic golden brown French toast recipe made with bread, eggs, milk, and a hint of cinnamon.",
    "ingredients": [
        "8 slices of bread",
        "4 eggs",
        "1 cup of milk",
        "1/2 teaspoon of cinnamon",
        "1 tablespoon of butter",
        "Maple syrup (for serving)"
    ],
    "instructions": [
        "In a shallow bowl, whisk together eggs, milk, and cinnamon until well combined.",
        "Heat a large skillet or griddle over medium heat and melt the butter.",
        "Dip each slice of bread into the egg mixture, making sure to coat both sides evenly.",
        "Place the coated bread slices onto the preheated skillet or griddle, and cook until golden brown, about 2-3 minutes per side.",
        "Repeat with the remaining slices of bread.",
        "Serve the French toast warm with maple syrup."
    ]
}



const Demo: React.FC = () => {

    const { user } = useAuth()

    return(
    <>
    <Head>
      <title>Zesti AI Demo | Create AI Generated Recipe</title>
      <meta name="title" content="Zesti AI Demo | Create AI Generated Recipe"/>
      <meta name="description" content="Check out our demo recipe so you can see the results of transforming a Youtube cooking video into a readible recipe!"/>
      <GoogleTags/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background mt-12${raleway.className}`}>
      <div className="text-center space-y-2">
        <Title className="text-gray-900 text-3xl mt-36">AI Generated Recipe</Title>
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
            <div className="gap-x-3 text-2xl font-semibold text-gray-900 grid space-y-2 sm:inline-flex items-center">
                {`${demoObj?.name}`}
                <div className="mt-2 inline-flex sm:mt-0 sm:space-y-0 gap-x-2 text-center items-center">
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