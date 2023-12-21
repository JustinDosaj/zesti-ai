import { Raleway } from 'next/font/google'
import { VideoCameraIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Container } from "@/components/shared/container";
import GoogleTags from '@/components/google/conversion';
import { Title } from '@/components/shared/title';
import { InlineBtnLink } from '@/components/shared/button';
import { useAuth } from '@/pages/api/auth/auth';

import Head from "next/head";
import { RewardfulTag } from '@/components/tags/headertags';

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
      <RewardfulTag/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background animate-fadeIn ${raleway.className}`}>
      <div className="text-center space-y-2">
        <Title className="text-gray-900 text-3xl mt-36">YouTube Recipe</Title>
        {user ? 
        <p className="text-gray-700 pl-5 pr-5">This is a demo output of Zesti. Visit <InlineBtnLink href='/dashboard' text="Your Dashboard"/> to start using Zesti</p>
        :
        <p className="text-gray-700 pl-5 pr-5">This is a demo output of Zesti. To start using Zesti please <InlineBtnLink href='/login' text="Login or Sign Up"/></p>
        }
      </div>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-20 animate-fadeInFast"}>
          <div className="bg-gradient-to-b border border-gray-400 from-orange-50 to-orange-100/50 py-5 w-full rounded-3xl p-4 md:p-12">
              <div className="md:flex md:space-x-4">
                  <div className="min-w-0 flex-1 space-y-4 xs:space-y-3">
                      <div className="grid grid-cols-1 xs:inline-flex items-center gap-x-2 flex-wrap xs:flex-nowrap text-center xs:text-left gap-y-1 xs:space-y-0">
                          <span className="text-2xl font-semibold text-gray-900">
                              {demoObj?.name}
                          </span>
                      </div>
                      <p className="text-gray-700 text-center xs:text-left">
                          {`${demoObj?.description}`}
                      </p>
                  </div>
                  <div className="grid w-fit mx-auto xs:block xs:mx-0">
                      <button onClick={() => window.open("https://www.tiktok.com/@britscookin/video/7290713603299331374?q=Cheesey%20Bread&t=1701804610249")}
                      className="mt-4 md:mt-0 text-white h-fit border-primary-main border rounded-lg p-2 transition bg-primary-main hover:bg-primary-alt"
                      >
                          <div className="flex gap-x-2">
                              <VideoCameraIcon className="h-6 w-6"/>
                              <p>Original Recipe</p>
                          </div>
                      </button>
                  </div>
              </div>
          </div>
      </Container>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 animate-fadeInFast"}>
          <div className="my-auto w-full bg-white py-5 rounded-3xl">
            <div className="flex pt-4 pb-4 justify-between items-center">
              <h2 className="text-xl font-medium text-gray-700">Ingredients {`(${demoObj?.ingredients?.length})`}</h2>
            </div>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 capitalize">
              {demoObj?.ingredients?.map((ingred: any, index: any) => (
                <li key={index} className="col-span-1 flex rounded-xl shadow-sm border border-gray-400 bg-gradient-to-b from-orange-50 to-orange-100/50">
                  <div className="flex rounded-md overflow-visible w-full">
                    <div className="flex ml-5 mr-1.5 flex-shrink-0 items-center justify-center font-md text-gray-900" >
                      <input
                          type="checkbox"
                          checked={ingred.hasIngredient}
                          onChange={() => console.log("Click")}
                          className="rounded-xl text-green-600 focus:ring-green-500 h-4 w-4 accent-green-600"
                          />
                    </div>
                    <div className="flex flex-1 items-center justify-between min-h-[4rem]">
                        <span className="text-gray-700 ml-2">{ingred}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="xs:hidden flex pt-4 pb-4 justify-end">

            </div>
          </div>
      </Container>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 mb-24 animate-fadeInFast"}>
          <div className="my-auto bg-gradient-to-b py-5  w-full rounded-3xl">
            <div className="flex pt-4 pb-4 justify-between items-center">
              <h2 className="text-xl font-medium text-gray-700">Instructions {`(${demoObj?.instructions?.length})`}</h2>
            </div>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
              {demoObj?.instructions?.map((instruct: any, index: any) => (
                <li key={index} className="col-span-1 flex shadow-sm border border-gray-400 rounded-xl bg-gradient-to-b from-orange-50 to-orange-100/50">
                  <div className="flex rounded-md overflow-visible w-full">
                    <div className="flex ml-5 mr-1.5 flex-shrink-0 items-center justify-center font-medium text-white" >
                      <input
                          type="checkbox"
                          checked={instruct.hasInstruction}
                          onChange={() => console.log("Click")}
                          className="rounded-xl h-4 w-4 accent-green-600"
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-between min-h-[4rem]">
                      <span className="text-gray-700 ml-2">{instruct}</span>
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