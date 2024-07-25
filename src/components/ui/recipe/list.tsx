import { Button } from "@/components/shared/button"
import { Container } from "@/components/shared/container"
import { useState, useRef } from "react"
import { PageLoader } from "@/components/shared/loader"
import { RecipeCard } from "./card"

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
      const dateA = new Date(a.data.date_added).getTime() || 0;
      const dateB = new Date(b.data.date_added).getTime() || 0;
  
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
    
    if(loading) return(<PageLoader type={"recipe-list"}/>)

    return(
      <Container className={`grid justify-center lg:flex-row gap-10 lg:gap-12  animate-fadeIn`}>
            <div className="space-y-2 border-t mt-2 pt-2">
                { sortedData.length > 0 ? 
                <div className="space-y-6">
                    <div ref={containerRef} className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-4`} >
                        {sortedData.slice(0, displayCount).map((item: any) => (
                            <RecipeCard item={item} key={item.data.unique_id}/>
                        ))}
                    </div>
                      {shouldShowLoadMore && (
                          <div className="w-fit grid mx-auto">
                              <Button onClick={handleLoadMore} isLink={false} className="bg-primary-main rounded-3xl hover:bg-primary-alt text-white font-semibold py-2 px-4" text="Load More" buttonType="button"/>
                          </div>
                      )}
                </div>
                :
                  <div className="text-center my-12">
                    <p className="text-xl font-semibold text-gray-500">No Results...</p>
                  </div>
                }
            </div>
        </Container>
    )
}