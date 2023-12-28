"use client;"
import { Container } from '../shared/container'
import { DeleteConfirmationModal } from '../shared/modals'
import { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, TrashIcon, EyeIcon } from '@heroicons/react/20/solid'
import { WhiteLoader } from '../shared/loader'
import Link from 'next/link'
import { SharedListTitle } from '../shared/title'
import { useRouter } from 'next/router'

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
  title?: any,
}

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function VideoList({data, title, maxDisplayCount = 10, incrementCount = 10}:StackListProps & {maxDisplayCount?: number, incrementCount?: number}) {
  
  const [ isDeleteOpen, setIsDeleteOpen ] = useState<boolean>(false)
  const [ selectedRecipeId, setSelectedRecipeId ] = useState<string | null>(null);
  const [ displayCount, setDisplayCount ] = useState(maxDisplayCount);
  const router = useRouter()

  // Sort data to display most recent recipes first
  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + incrementCount);
  };

  return(
    <Container className={"flex flex-col lg:flex-wrap gap-10 lg:gap-4 mt-4 animate-fadeIn"}>
    <SharedListTitle title={title}/>
        <ul role="list" className="divide-y divide-primary-main divide-opacity-50 sm:divide-gray-300 text-gray-700">
            {sortedData.slice(0, displayCount).map((recipe) => (
                <li key={recipe.id} className="flex items-center justify-between gap-x-6 py-5">
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
                    : recipe.status == "Failed" ? 
                    <div
                    className="hidden rounded-md bg-color-alt-red text-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 sm:block"
                    >
                    <span className="pl-6 pr-6">Error</span>
                    </div>
                    :
                    <Link
                    href={{pathname: `/dashboard/recipe/[recipeId]`,
                        query: {recipeId: recipe.id}
                    }}
                    className="hidden rounded-3xl bg-primary-main duration-200 text-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-primary-alt sm:block"
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
                                `${recipe.status == "Failed" ? 'hidden' : ''} block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left`
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
                {displayCount < data.length && maxDisplayCount >= 10 && (
                    <div className="flex justify-center py-6">
                        <button onClick={handleLoadMore} className="bg-primary-main rounded-3xl hover:bg-primary-alt text-white font-semibold py-2 px-4">
                            Load More
                        </button>
                    </div>
                )}
            <DeleteConfirmationModal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} recipeId={selectedRecipeId}/>
        </ul>
    </Container>
  )
}

