import { Raleway } from 'next/font/google'
import { VideoCameraIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Container } from "@/components/shared/container";
import GoogleTags from '@/components/google/conversion';
import { Title } from '@/components/shared/title';
import { InlineBtnLink } from '@/components/shared/button';
import { useAuth } from '../api/auth/auth';

import Head from "next/head";
import { RewardfulTag } from '@/components/tags/headertags';

const raleway = Raleway({subsets: ['latin']})


const demoObj = {"name": "Mom's Easy Chocolate Chip Muffins","time": 25,"servings": 12,"description": "Delicious and simple chocolate chip muffins with a beautiful domed top.","ingredients": [  "1/2 cup salted softened butter",  "1 cup granulated sugar",  "2 eggs",  "1 teaspoon vanilla extract",  "2 teaspoons baking powder",  "1/2 teaspoon salt",  "2 cups all-purpose flour",  "1/2 cup milk",  "1 cup semi-sweet chocolate chips"],"instructions": [  "In a mixing bowl, cream the softened butter and granulated sugar using a hand mixer for 2 minutes until creamy.",  "Add in the eggs, vanilla extract, baking powder, and salt, and mix for about 30 seconds until smooth.",  "Switch to stirring by hand and gradually add in half of the all-purpose flour, mixing until mostly combined.",  "Pour in the milk and continue gently mixing.",  "Add in the remaining flour, stirring until the flour just barely disappears. Avoid overmixing.",  "Fold in the semi-sweet chocolate chips.",  "Preheat the oven to 425 degrees Fahrenheit.",  "Allow the batter to rest to let the gluten relax.",  "Fill cupcake liners almost all the way full with the batter.",  "Bake in the preheated oven for 20 to 25 minutes.",  "Let the muffins cool in the tin for 5 minutes before transferring them to a wire rack to cool completely.",  "Enjoy!"  ],  "recommended": [    "Muffin liners"  ]}

const Demo: React.FC = () => {

    const { user } = useAuth()

    return(
    <>
    <Head>
      <title>Zesti Demo | Save & Edit Recipes | Cooking Chat Assistant</title>
      <meta name="title" content="Zesti | Example Result of Zesti AI"/>
      <meta name="description" content="Check out our demo recipe so you can see the results of transforming a Youtube cooking video into a readible recipe!"/>
      <GoogleTags/>
      <RewardfulTag/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background mt-12${raleway.className}`}>
      <div className="text-center space-y-2">
        <Title className="text-gray-900 text-3xl mt-36">Example</Title>
        {user ? 
        <p className="text-gray-700">This is a demo output of Zesti. Visit <InlineBtnLink href='/dashboard' text="Your Dashboard"/> to start using Zesti</p>
        :
        <p className="text-gray-700">This is a demo output of Zesti. To start using Zesti please <InlineBtnLink href='/login' text="Login or Sign Up"/></p>
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
            <button onClick={() => window.open("https://www.youtube.com/watch?v=Bwr5mb8ZZVs")}
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