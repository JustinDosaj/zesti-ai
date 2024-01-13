"use client;"
import { EyeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React, { useState, useEffect, useRef  } from "react"
import { Button } from "../shared/button"

interface UserSavedRecipeListProps {
  recipes: any,
  creatorName?: string,
  maxDisplayCount?: number,
  incrementCount?: number,
  max?: number,
}

export function UserSavedRecipeList({recipes, maxDisplayCount = 5, incrementCount = 10, max = 0}: UserSavedRecipeListProps) {
  
  const [ displayCount, setDisplayCount ] = useState(maxDisplayCount)
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedData = recipes?.sort((a: any, b: any) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const handleLoadMore = () => {
      if(max == 0) {
        setDisplayCount((prevCount: number) => prevCount + incrementCount)
      }
      else if ((displayCount + incrementCount) <= max) {
        setDisplayCount((prevCount: number) => prevCount + incrementCount)
      }
  }
  
  const handleScroll = () => {
    if (!containerRef.current) {
        return;
    }
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5) { // 5px threshold
        handleLoadMore();
    }
  };

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
        currentContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
        if (currentContainer) {
            currentContainer.removeEventListener('scroll', handleScroll);
        }
    };
  }, [displayCount, recipes]);


  return(
  <div className="space-y-2 animate-fadeIn p-4 sm:p-0">
      <div ref={containerRef} className={max == 0 ? `p-4` : 'p-4'} >
        {sortedData.slice(0,displayCount).map((item: any) => (
          <UserRecipeListCard item={item} key={item.name}/>
        ))}
          {max == 0 && (recipes.length > maxDisplayCount) && (
            <div className="flex justify-center py-6">
              <Button onClick={handleLoadMore} className="bg-primary-main rounded-3xl hover:bg-primary-alt text-white font-semibold py-2 px-4" buttonType="button" text="Load More"/>
            </div>
          )}
      </div>
  </div>
  )
}

interface UserRecipeCardProps {
  item: any,
  key?: any,
}

export function UserRecipeListCard({item, key}: UserRecipeCardProps) {
  return(
  <div key={key} className="group relative">
        {/* Image and Details */}
        <div className="flex items-center space-x-4 border p-4 rounded-3xl max-w-2xl">
            <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} className="h-[136px] w-[96px] rounded-xl object-cover" alt={item.title}/>
            <div className="flex-grow space-y-1 lg:space-y-2">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-700">{item.name}</h3> {/* Video Title */}
                
                {/* Additional Details */}
                <div className="flex gap-4 text-xs lg:text-sm text-gray-600">
                    <span className="inline-flex gap-1 items-center">
                      <p className="font-bold">Ingredients:</p>
                      <p>{item.ingredients.length}</p>
                    </span>
                    <span className="inline-flex gap-1 items-center">
                      <p className="font-bold">Steps:</p>
                      <p>{item.instructions.length}</p>
                    </span>
                </div>
                <div className="flex gap-1 text-xs lg:text-sm text-gray-600 items-center">
                  <span className="font-bold hidden sm:block">Title:</span>
                  <p className="text-sm text-gray-600">{item.title}</p> {/* Recipe Name */}
                </div>
            </div>
        </div>
        {/* Overlay Icon */}
        <Link className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-3xl hover:animate-fadeInExtraFast" 
              href={{
                pathname: `/dashboard/recipe/[recipeId]`,
                query: {recipeId: item.url_id}
                }} >
            <EyeIcon className="text-white h-10 w-10 hover:text-gray-300 hover:bg-gray-500 bg-gray-700 rounded-xl p-1"/>
        </Link>
    </div>
  )
}
