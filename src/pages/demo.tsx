import { Raleway } from 'next/font/google'
import { VideoCameraIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Container } from "@/components/shared/container";
import GoogleTags from '@/components/google/conversion';
import { Title } from '@/components/shared/title';

import Head from "next/head";

const raleway = Raleway({subsets: ['latin']})


const demoObj = {"name": "Bakery Style Blueberry Muffins", "ingredients": ["2 and a half cups of all purpose flour", "Three quarters of a teaspoon of salt", "2 teaspoons of baking powder", "1 cup or 240 milliliters of whole milk", "3 quarters of a cup of regular granulated sugar", "1 teaspoon of vanilla", "One quarter cup of melted butter", "A quarter cup of sour cream", "A quarter cup of vegetable oil", "Two eggs", "About 7.75 ounces of fresh blueberries", "About a tablespoon of flour for coating the blueberries", "Half a cup of sugar for streusel topping", "Half a cup of flour for streusel topping", "1 quarter cup of butter for streusel topping"], "instructions": ["Preheat the oven to 400 degrees Fahrenheit.", "In a big bowl, combine the all purpose flour, salt, and baking powder.", "In a separate bowl, mix together the whole milk, granulated sugar, vanilla, melted butter, sour cream, vegetable oil, eggs, and lemon zest if desired.", "Whisk the wet ingredients until well combined.", "Toss the fresh blueberries in about a tablespoon of flour to prevent them from sinking.", "Combine the wet and dry ingredients, mixing gently.", "Fold in the blueberries.", "Optional: Prepare a streusel topping by mixing together the sugar, flour, and butter with your hands until crumbly.", "Scoop the batter into muffin cups, filling them almost all the way up.", "Optional: Sprinkle some streusel topping on half of the muffins.", "Bake at 400 degrees Fahrenheit for about 20 minutes, or until the muffins are puffed up and golden.", "Check for doneness by testing with a skewer or your finger to see if the top bounces back or if it comes out clean.", "Enjoy the moist and delicious blueberry muffins!"], "time": 20, "description": "These bakery style blueberry muffins are moist, delicious, and packed with blueberries. They are the perfect treat for breakfast or any time of the day.", "servings": 12}

const Demo: React.FC = () => {

    return(
    <>
    <Head>
      <title>Zesti | Example Recipe</title>
      <meta name="description" content="Check out our demo recipe so you can see the results of transforming a Youtube cooking video into a readible recipe!"/>
      <GoogleTags/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background mt-12${raleway.className}`}>
      <div className="text-center">
        <Title className="text-gray-900 text-3xl mt-36">Example</Title>
      </div>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 sm:mt-24"}>
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