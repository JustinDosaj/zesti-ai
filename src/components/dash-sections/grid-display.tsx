"use client;"
import { Container } from '../shared/container'
import { DeleteConfirmationModal } from '../shared/modals'
import { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, TrashIcon, EyeIcon } from '@heroicons/react/20/solid'
import { WhiteLoader } from '../shared/loader'
import Link from 'next/link'

interface Recipe {
  id: string;
  date: any;
  status: string,
  data: {
    name: string,
    ingredients: [],
    instructions: [],
    servings: string,
    time: string
  }
  // other fields
}

interface StackListProps {
  data: Recipe[];
}

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function DashboardRecipeStackList({data}:StackListProps) {

  
  const [ isDeleteOpen, setIsDeleteOpen ] = useState<boolean>(false)
  const [ selectedRecipeId, setSelectedRecipeId ] = useState<string | null>(null);

  return(
    <Container className={"flex flex-col lg:flex-wrap gap-10 lg:gap-4 pb-28"}>
      <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">Saved Recipes</h3>
      <ul role="list" className="divide-y divide-gray-100 text-gray-700">
        {data.map((recipe) => (
            <li key={recipe.id} className="flex items-center justify-between gap-x-6 py-5 border-b ">
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <Link 
                    href={{pathname: `/dashboard/recipe/[recipeId]`,
                    query: {recipeId: recipe.id}
                    }}
                    className="text-base sm:text-lg font-semibold leading-6 text-gray-700 hover:text-gray-500">{recipe.status == "Complete" ? recipe.data.name : recipe.status == "Failed" ? "Error getting recipe. Please try again later" : "Loading, please wait..."}</Link>
                    <p
                    className={
                      recipe.status == "Complete" ? 
                      `text-green-700 bg-green-50 ring-green-600/20 rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset`
                    : recipe.status == "Loading" ?
                      `text-yellow-600 bg-yellow-50 ring-yellow-500/10 rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset`
                    : recipe.status == "Failed" ?
                      `text-red-600 bg-red-50 ring-red-600/20 rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset`
                    : 
                      `hidden`
                    }
                  >
                    {recipe.status}
                    </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs sm:text-sm leading-5 text-gray-500">
                  <p className={recipe.data?.time ? `whitespace-nowrap` : `hidden`}>
                    <span>{recipe.data ? `${recipe.data?.time} Minutes` : ''}</span>
                  </p>
                  <svg viewBox="0 0 2 2" className={recipe.data?.time ? `h-0.5 w-0.5 fill-current` : `hidden`}>
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">
                    <span>{recipe.data ? recipe.data.ingredients.length : '0'} Ingredients</span>
                  </p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">
                    <span>{recipe.data ? recipe.data.instructions.length : '0'} Steps</span>
                  </p>
                  <svg viewBox="0 0 2 2" className="hidden sm:block h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="hidden sm:block truncate">Added {recipe.date}</p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                {recipe.status == "Loading" ? 
                <div className="hidden rounded-md bg-transparent px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-primary-alt sm:block">
                  <WhiteLoader/>
                </div>
                :
                <Link
                  href={{pathname: `/dashboard/recipe/[recipeId]`,
                    query: {recipeId: recipe.id}
                  }}
                  className="hidden rounded-md bg-primary-main text-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-primary-alt sm:block"
                >
                  <span>View Recipe</span>
                </Link>
                }
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={{pathname: `/dashboard/recipe/[recipeId]`,
                            query: {recipeId: recipe.id}
                            }}
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left'
                            )}
                          >
                            <span className="inline-flex text-base gap-x-1.5 items-center"><EyeIcon className="text-primary-main h-4 w-4"/>View</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setIsDeleteOpen(true)
                              setSelectedRecipeId(recipe.id)
                            }}
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left'
                            )}
                          >
                            <span className="inline-flex text-base gap-x-1.5 items-center"><TrashIcon className="text-color-alt-red h-4 w-4"/>Delete</span>
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
          <DeleteConfirmationModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} recipeId={selectedRecipeId}/>
        </ul>
    </Container>
  )
}