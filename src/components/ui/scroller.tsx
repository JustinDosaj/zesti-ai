import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid"
import { TitleSection } from "../shared/title";
import { RecipeCard } from "./recipe/card";


export function DiscoverRecipes({recipes}: any) {
    return(
        <>
            <div className="flex flex-col lg:flex-row justify-center text-center lg:items-center w-full gap-8">
                <div className="flex flex-col">
                    <TitleSection  titleBlack="Check Out Recipes Already On" titleOrange="Zesti" desc="Click on any of the recipes below to see the ingredient list and instructions!"/>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Testimonial cards */}
            {recipes.map((recipe: any) => (
                <RecipeCard
                    item={recipe}
                />
            ))}
            </div>
        </>
    )
}

export function Scroller({onRightScrollClick, onLeftScrollClick, scrollPage}: any) {
    return(
        <div className="flex items-center justify-center w-full mt-8 space-x-4">
            <button onClick={() => onLeftScrollClick()} type="button"><ChevronLeftIcon className="h-10 w-10 home-page-scroll-btn" /></button>
            <p className="text-base font-bold text-gray-600">{scrollPage} / 3</p>
            <button onClick={() => onRightScrollClick()} type="button"><ChevronRightIcon className="h-10 w-10 home-page-scroll-btn" /></button>
        </div>
    )
}
