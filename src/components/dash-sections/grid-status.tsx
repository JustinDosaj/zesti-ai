import { BookOpenIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Container } from '../shared/container'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/20/solid'
import { DeleteConfirmationModal } from '../shared/modals'
import { useState } from 'react'
import { OrangeBGLoader } from '../shared/loader'

function classNames(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}


interface GridRecipeProps {
    key: any,
    recipe: any,
    isDeleteOpen: boolean,
    setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedRecipeId: string | null,
    setSelectedRecipeId: React.Dispatch<React.SetStateAction<string | null>>,
}

export function SuccessRecipe({key, recipe, isDeleteOpen, setIsDeleteOpen, selectedRecipeId, setSelectedRecipeId}: GridRecipeProps) {
    console.log("PAGE REC: ", recipe.id)
    return(
        <div key={key} className="flex flex-col h-full p-2">
          <li className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <div className="flex flex-col justify-center h-12"> 
                <div className="text-base font-semibold leading-6 text-gray-900 line-clamp-2">{recipe?.data.name}</div>
              </div>
              <Menu as="div" className="relative ml-auto">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Open options</span>
                  <EllipsisHorizontalIcon className="h-7 w-7" aria-hidden="true" />
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
                  <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => { setIsDeleteOpen(true); setSelectedRecipeId(recipe.id);}}
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
                          <div className="inline-flex gap-x-2">
                            <TrashIcon className="text-color-alt-red h-5 w-5"/>
                            <span className="text-base">Delete</span>
                          </div>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <dl className="flex-grow -my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Total Ingrediants</dt>
                <dd className="text-gray-700">
                  <p>{`${recipe.data.ingredients.length}`}</p>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Total Steps</dt>
                <dd className="text-gray-700">
                  <p>{`${recipe.data.instructions.length}`}</p>
                </dd>
              </div>
            </dl>
              <div className="bg-primary-main p-3 text-center inline-flex w-full justify-center text-white hover:bg-primary-alt"> 
                <Link className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent text-sm font-semibold text-gray-900" 
                  href={{pathname: `/dashboard/recipe/[recipeId]`,
                    query: {recipeId: recipe.id}
                  }}>
                  <BookOpenIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  <p className="text-white">View Recipe</p>
                </Link>
              </div>      
          </li>
        </div>
    )
}

export function FailedRecipe({key, recipe, isDeleteOpen, setIsDeleteOpen, selectedRecipeId, setSelectedRecipeId}: GridRecipeProps) {

    return(
        <div key={key} className="flex flex-col h-full p-2">
            <li className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <div className="flex flex-col justify-center h-12"> 
                <div className="text-base font-semibold leading-6 text-gray-900 line-clamp-2">{"Failed to get recipe. Please try again later."}</div>
                </div>
                <Menu as="div" className="relative ml-auto">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon className="h-7 w-7" aria-hidden="true" />
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
                    <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            onClick={() => { setIsDeleteOpen(true); setSelectedRecipeId(recipe.id);}}
                            className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                        >
                            <div className="inline-flex gap-x-2">
                            <TrashIcon className="text-color-alt-red h-5 w-5"/>
                            <span className="text-base">Delete</span>
                            </div>
                        </button>
                        )}
                    </Menu.Item>
                    </Menu.Items>
                </Transition>
                </Menu>
            </div>
            <dl className="flex-grow -my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Total Ingrediants</dt>
                <dd className="text-gray-700">
                    <p>{`0`}</p>
                </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Total Steps</dt>
                <dd className="text-gray-700">
                    <p>{`0`}</p>
                </dd>
                </div>
            </dl>
                <div className="bg-color-alt-red p-3 text-center inline-flex w-full justify-center text-white hover:bg-red-700">
                <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent text-sm font-semibold text-gray-900" >
                    <BookOpenIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    <p className="text-white">Error</p>
                </div>
            </div>    
            </li>
        </div>
    )
}

export function LoadingRecipe({key, recipe}: any) {
    return(
        <div key={key} className="flex flex-col h-full p-2">
            <li className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <div className="flex flex-col justify-center h-12">
                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg> 
                    <div className="text-base font-semibold leading-6 text-gray-900 line-clamp-2">{"This may take a few minutes"}</div>
                </div>
            </div>
            <dl className="flex-grow -my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Total Ingrediants</dt>
                <dd className="text-gray-700">
                    <p>{"0"}</p>
                </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Total Steps</dt>
                <dd className="text-gray-700">
                    <p>{"0"}</p>
                </dd>
                </div>
            </dl>
                <div className="bg-amber-500 p-3 text-center inline-flex w-full justify-center text-white">
                <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent text-sm font-semibold text-gray-900" >
                    <OrangeBGLoader/>
                    <p className="text-white">Please Wait</p>
                </div>
            </div>    
            </li>
        </div>
    )
}