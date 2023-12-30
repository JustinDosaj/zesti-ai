"use client;"
import { Container } from '../shared/container'
import { useState } from 'react'
import { WhiteLoader } from '../shared/loader'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { SharedListTitle } from '../shared/title'

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

export function CreatorRecipeList({data, title, maxDisplayCount = 10, incrementCount = 10}:StackListProps & {maxDisplayCount?: number, incrementCount?: number}) {
  
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
        </ul>
    </Container>
  )
}

