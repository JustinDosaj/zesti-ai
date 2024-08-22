import { Container } from "@/components/shared/container"
import { useState } from "react"
import { Title } from "@/components/shared/title"
import { RecipeCard } from "../recipe/card"
import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid"
import { Paragraph } from "@/components/shared/paragraph"


export function HomePageScroller({recipes}: any) {

    const [ scrollPage, setScrollPage] = useState<number>(1)

    const onRightScrollClick = () => {
      setScrollPage(prev => prev === 3 ? 1 : prev + 1);
    }

    const onLeftScrollClick = () => {
      setScrollPage(prev => prev === 1 ? 3 : prev - 1);
    }

    const startIndex = (scrollPage - 1) * 3;
    const endIndex = startIndex + 3;
    const recipesToShow = recipes.slice(startIndex, endIndex);

    return (
      <Container className="home-scroll-container">
          <DiscoverRecipes recipes={recipesToShow} />
          <Scroller 
              onRightScrollClick={onRightScrollClick} 
              onLeftScrollClick={onLeftScrollClick} 
              scrollPage={scrollPage}
          />
      </Container>
  );
}

function Scroller({onRightScrollClick, onLeftScrollClick, scrollPage}: any) {
  return(
      <div className="flex items-center justify-center w-full mt-8 space-x-4">
          <button onClick={() => onLeftScrollClick()} type="button"><ChevronLeftIcon className="h-10 w-10 home-page-scroll-btn" /></button>
          <p className="text-base font-bold text-gray-600">{scrollPage} / 3</p>
          <button onClick={() => onRightScrollClick()} type="button"><ChevronRightIcon className="h-10 w-10 home-page-scroll-btn" /></button>
      </div>
  )
}

function DiscoverRecipes({recipes}: any) {
  return(
      <>
          <div className="flex flex-col lg:flex-row justify-center text-center lg:items-center w-full gap-8">
              <div className="flex flex-col">
                    <Title>
                            <span>Recipes Recently Added to </span>
                            <span className="primary-orange-text-gradient">Zesti</span>
                    </Title>
                  <Paragraph className="mt-2">Check out some recipes users have already transcribed from TikTok & Instagram</Paragraph>
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Testimonial cards */}
          {recipes.map((recipe: any) => (
              <RecipeCard
                  key={recipe.data.id}
                  item={recipe}
              />
          ))}
          </div>
      </>
  )
}
