import AdSenseDisplay from "@/components/tags/adsense"
import { RecipeCard } from "./card"
import { HorizontalBorder } from "@/components/shared/border"

export function RecipeSuggestions({recipes}: any, role: string | null) { 
    return(
        <div className="mx-auto max-w-7xl w-full space-y-8 mt-6 lg:mt-24">
            <AdSenseDisplay adSlot="7480590418" adFormat="horizontal" widthRes="false" role={role} maxHeight="110px"/>
            <HorizontalBorder/>
            <h2 className="text-gray-900 max-w-[1600px] w-full font-bold prose-2xl">Recipes Recently Added to Zesti</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-3">
              {recipes.map((recipe: any) => (
                <RecipeCard key={recipe.id} item={recipe} />
              ))}
            </div>
            <HorizontalBorder/>
            <AdSenseDisplay adSlot="7423668524" adFormat="horizontal" widthRes="false" role={role} maxHeight="300px"/>
        </div>

    )
}