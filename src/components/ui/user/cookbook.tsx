import { EyeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React, { useState, useRef  } from "react"
import { RecipeListLoader } from '@/components/shared/loader'
import { Button } from '@/components/shared/button'


interface UserSavedRecipeListProps {
    recipes: any,
    creatorName?: string,
    maxDisplayCount?: number,
    incrementCount?: number,
    max?: number,
    loading?: boolean,
}
  
export function UserSavedRecipeList({recipes, maxDisplayCount = 9, incrementCount = 9, max = 0, loading}: UserSavedRecipeListProps) {

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

if(loading) return <RecipeListLoader/>

return(
<div className="space-y-2 animate-fadeIn sm:p-0">
    <div ref={containerRef} className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4`} >
        {sortedData.slice(0,displayCount).map((item: any) => (
            <UserRecipeListCard item={item} key={item.name}/>
        ))}
    </div>
    {shouldShowLoadMore && (
        <div className="grid justify-center py-6">
            <Button onClick={handleLoadMore} isLink={false} className="bg-primary-main rounded-3xl hover:bg-primary-alt text-white font-semibold py-2 px-4" text="Load More" buttonType="button"/>
        </div>
    )}
</div>
)
}
 
interface RecipeCardProps {
    item: any,
    creatorName?: string,
    key?: any,
}

export function UserRecipeListCard({item, key}: RecipeCardProps) {
    return(
    <div key={key} className="group relative w-[350px] lg:w-[425px]">
            {/* Image and Details */}
            <div className="flex items-center space-x-4 border border-gray-300 p-4 rounded-3xl max-w-2xl">
                {item.status == "Complete" ? 
                    <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} className="h-[136px] w-[96px] rounded-xl object-cover" alt={item.title}/>
                :
                    <div className="grid justify-center lg:inline-flex items-center lg:gap-4 h-[136px] w-[96px] rounded-xl object-cover border">
                        <div className="animate-spin flex justify-center w-6 h-6 border-[2px] border-current border-t-transparent text-orange-600 rounded-full " role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                { item.status == "Complete" ?
                <div className="flex-grow space-y-1 lg:space-y-2">
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-700">{item.name}</h3> {/* Video Title */}
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
                        <p className="text-sm text-gray-600 w-[225px]">{item.title !== '' ? item.title : 'Title Not Available'}</p> {/* Recipe Name */}
                    </div>
                </div>
                :
                <div className="flex-grow space-y-1 lg:space-y-2">
                    <div className="grid justify-center lg:inline-flex items-center lg:gap-4">
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-700 hidden lg:flex">Loading Recipe...</h3> 
                    </div>
                </div>
                }
            </div>
                {/* Overlay Icon */}
            <Link className={item.status == "Complete" ? `absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-3xl hover:animate-fadeInExtraFast` : `hidden`} href={`/${item.owner_affiliate_code}/${item.id}`} >
                <EyeIcon className="text-white h-10 w-10 hover:text-gray-300 hover:bg-gray-500 bg-gray-700 rounded-xl p-1"/>
            </Link>
        </div>
    )
}
  