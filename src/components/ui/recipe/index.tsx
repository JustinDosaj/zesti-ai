import Link from "next/link"
import { EyeIcon } from "@heroicons/react/20/solid"
import { SharedSectionHeadingTitle } from "@/components/shared/title"
import { Button } from "@/components/shared/button"
import { Container } from "@/components/shared/container"
import React, { useState, useRef } from "react"
import { RecipeListLoader } from "@/components/shared/loader"


interface RecipeCardListProps {
    recipes: any,
    maxDisplayCount?: number,
    incrementCount?: number
    owner_id?: string,
    max?: number,
    loading?: boolean,
  }

export function RecipeCardList({recipes, maxDisplayCount = 9, incrementCount = 9, max = 0, loading}: RecipeCardListProps) {
    const [ displayCount, setDisplayCount ] = useState(maxDisplayCount)
    const containerRef = useRef<HTMLDivElement>(null);
  
    const sortedData = recipes?.sort((a: any, b: any) => {
      // Convert dates to timestamps, treating invalid or absent dates as 0
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
  
      // If both dates are invalid or missing, maintain their order
      if (dateA === 0 && dateB === 0) return 0;
  
      // A valid date is always considered "greater" than an invalid or missing one
      if (dateA === 0) return 1;
      if (dateB === 0) return -1;
  
      // If both dates are valid, sort them in descending order
      return dateB - dateA;
    });
  
    const shouldShowLoadMore = max > 0
    ? (displayCount < recipes.length && displayCount <= max)
    : (displayCount < recipes.length);
  
    const handleLoadMore = () => {
      setDisplayCount((prevCount) => {
          const newCount = prevCount + incrementCount;
          // If there's a max limit and adding incrementCount exceeds it, only go up to max
          if (max && newCount > max) {
            return max;
          }
          return newCount;
        });
    }
    
    if(loading) return(<RecipeListLoader/>)

    return(
      <Container className={"grid justify-center lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
            <div className="space-y-2 animate-fadeIn">
                <SharedSectionHeadingTitle title={"Recipes"} className="py-3"/>
                <div ref={containerRef} className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-4`} >
                    {sortedData.slice(0,displayCount).map((item: any) => (
                        <RecipeCard item={item} key={item.name}/>
                    ))}
                    {shouldShowLoadMore && (
                        <div className="grid justify-center py-6">
                            <Button onClick={handleLoadMore} isLink={false} className="bg-primary-main rounded-3xl hover:bg-primary-alt text-white font-semibold py-2 px-4" text="Load More" buttonType="button"/>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    )
}

interface RecipeCardProps {
    item: any,
    key?: any,
}
  
export function RecipeCard({item, key}: RecipeCardProps) {
    return(
        <div key={key} className="group relative w-[335px] lg:w-[400px]">
            {/* Image and Details */}
            <div className="flex items-center space-x-4 border p-4 rounded-3xl max-w-2xl">
                <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} className="h-[136px] w-[96px] rounded-xl object-cover" alt={item.title}/>
                <div className="flex-grow space-y-1 lg:space-y-2">
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-700">{item?.name}</h3>
                    {/* Additional Details */}
                    <div className="flex gap-4 text-xs lg:text-sm text-gray-600">
                        <span className="inline-flex gap-1 items-center">
                        <p className="font-bold">Ingredients:</p>
                        <p>{item.ingredients?.length}</p>
                        </span>
                        <span className="inline-flex gap-1 items-center">
                        <p className="font-bold">Steps:</p>
                        <p>{item.instructions?.length}</p>
                        </span>
                    </div>
                    <div className="flex gap-1 text-xs lg:text-sm text-gray-600 items-center">
                    <p className="text-sm text-gray-600">{item?.video_title}</p> {/* Recipe Name */}
                    </div>
                </div>
            </div>
            {/* Overlay Icon */}
            <Link href={`/${item.owner.affiliate_code}/${item?.data?.id}`} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-3xl hover:animate-fadeInExtraFast">
                <EyeIcon className="text-white h-10 w-10 hover:text-gray-300 hover:bg-gray-500 bg-gray-700 rounded-xl p-1"/>
            </Link>
        </div>
    )
}