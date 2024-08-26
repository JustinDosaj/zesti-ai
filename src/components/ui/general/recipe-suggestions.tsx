import AdSense from "@/components/tags/adsense"
import { RecipeCard } from "../recipe/card"
import { HorizontalBorder } from "@/components/shared/border"

interface Suggestions {
  recipes: any,
  role: string | null,
  title?: string
}

export function RecipeSuggestions({recipes, role, title}: Suggestions) { 
    return(
        <div className="mx-auto max-w-7xl w-full space-y-8 mt-8 lg:mt-24 flex min-h-screen flex-col items-center">
            <AdSense className="mx-auto max-w-[320px] md:max-w-5xl" adSlot="7480590418" adFormat="horizontal" adStyle={{ width: '100%', height: '90px', maxHeight: '90px' }} role={role}/>
            <HorizontalBorder width="100%"/>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800 max-w-[1600px] w-full">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-3">
              {recipes.map((recipe: any) => (
                <RecipeCard key={recipe.id} item={recipe} />
              ))}
            </div>
            <AdSense className="mx-auto max-w-[320px] md:max-w-5xl" adSlot="5275868942" adFormat="auto" adStyle={{ width: '100%', height: '320px', maxHeight: '320px' }} role={role}/>
        </div>

    )
}