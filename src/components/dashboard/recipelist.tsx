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
            <div key={item.title} className="mt-5 group ">
                {/* Container for the image and the overlay icon */}
                <div className="relative p-4 border rounded-3xl">
                    {/* Image */}
                    <div className="inline-flex items-center">
                        <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} className="h-[136px] w-[96px] rounded-xl" alt={item.title}/>
                        <div className="flex-grow ml-2 sm:ml-4">
                            <span className="section-desc-text-size">{item.title}</span>
                        </div>
                    </div>
                    {/* Overlay Icon */}
                    <Link
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-3xl hover:animate-fadeInExtraFast"
                        href={{
                            pathname: `/dashboard/recipe/[recipeId]`,
                            query: {recipeId: item.url_id}
                        }}
                    >
                        <EyeIcon className="text-white h-10 w-10 hover:text-gray-300"/>
                    </Link>
                </div>
            </div>
        ))}
          {max == 0 && (
            <div className="flex justify-center py-6">
              <Button onClick={handleLoadMore} className="bg-primary-main rounded-3xl hover:bg-primary-alt text-white font-semibold py-2 px-4" buttonType="button" text="Load More"/>
            </div>
          )}
      </div>
  </div>
  )
}

