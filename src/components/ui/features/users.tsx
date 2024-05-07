import { Container } from "@/components/shared/container"
import { ArrowDownIcon, BeakerIcon} from "@heroicons/react/20/solid"
import React, { useState } from "react"
import { Scroller, DiscoverRecipes } from "../scroller"
import { Button } from "@/components/shared/button"
import { TitleSection } from "@/components/shared/title"
import { SearchOrAddRecipe } from "@/components/search"
import getConfig from "next/config"
import { Paragraph } from "@/components/shared/paragraph"
import dynamic from "next/dynamic"

interface HeroProps {
  titleStart?: string,
  titleEnd?: string,
  description?: string,
}

export function Hero({titleStart, titleEnd, description}: HeroProps) {

  const { publicRuntimeConfig } = getConfig();

  return(
      <Container className="flex flex-col lg:flex-row items-center justify-between pt-36 px-5 space-x-4 xl:pt-48">
        <div className="flex lg:w-1/2 flex-col gap-6 lg:gap-8">
          <div className="inline-flex w-fit mx-auto lg:mx-0 items-center border border-gray-300 rounded-3xl p-2 space-x-1 ">
              <BeakerIcon className="text-black h-4 w-4"/>
              <div className="text-black font-bold text-sm">{`beta v${publicRuntimeConfig?.version}`}</div>
          </div>
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <h1 className="section-title-text-size xl:text-6xl font-bold text-gray-800">
              <span className="text-gray-700"> {titleStart} </span>
              <span className="primary-orange-text-gradient"> {titleEnd} </span>
              <br />
            </h1>
            <Paragraph className="font-medium text-gray-600">
              {description}
            </Paragraph>
          </div>
          <div className="grid justify-center lg:justify-start text-left space-y-1">
            <SearchOrAddRecipe align={"start"}/>
          </div>
          {/* Statistics removed because currently do not have any
            <div className="grid grid-cols-3 lg:flex justify-center lg:justify-start lg:space-x-16">
              <StatisticItem number="3200+" label="Recipes" />
              <StatisticItem number="540+" label="Users" />
              <StatisticItem number="$0/mo." label="Price" />
            </div>
          */}
        </div>


          <div className="hidden lg:block w-1/2 bg-transparent rounded-lg">
            <img src={"/images/Illustration.png"} alt="Profile" height={2058} width={2150} className="object-fit" />
          </div> {/* Placeholder for the illustration */}
        
      </Container>
  )
}

export function StatisticItem({ number, label }: any) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-semibold text-gray-700">{number}</p>
      <p className="text-base font-medium text-gray-600">{label}</p>
    </div>
  );
}

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

export function HomePageCTA() {
  return(
    <Container className="relative w-full max-w-6xl mx-auto px-5">
      <div className="flex flex-col items-center gap-8 orange-border-shadow rounded-3xl p-6 lg:p-12">
        <div className="flex flex-col items-center text-center">
          <p className="w-full md:w-96 text-xl font-medium text-center primary-orange-text-gradient mb-3">
            Check Out Premium
          </p>
          <TitleSection titleBlack="Try Free for 7-Days" desc="Enjoy Zesti without ads and gain access to the Cooking AI Chat Assistant"/>
        </div>
        <Button isLink={true} href='/about/pricing' text="Get Started" className="text-lg font-medium text-center text-white"/>
      </div>
    </Container>
  )
}

export function HomeVideoToRecipe({titleStart, titleEnd, desc}: any,) {

  const TikTokVideo = dynamic(() => import('../recipe/tiktok'), {
    ssr: false, 
    loading: () => <div style={{ height: '90px' }}/> // Placeholder while loading
  });

  return(
    <Container className="relative w-full max-w-6xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row justify-center text-center lg:items-center w-full gap-8 p-2 xl:orange-border-shadow rounded-3xl">
            <div className="flex flex-col mt-8">
                <TitleSection titleBlack={titleStart} titleOrange={titleEnd} desc={desc}/>
                <div className="grid grid-cols-1 xl:grid-cols-2 justify-center mt-4 align-top">
                  <TikTokVideo video_id={"7290713603299331374"}/>
                  <div className="block xl:hidden mx-auto my-auto p-12 text-center">
                      <ArrowDownIcon className="block xl:hidden h-20 w-20 text-white bg-primary-main p-4 rounded-full"/>
                  </div>
                  <div className="h-full w-fit mx-auto">
                    <img src="/images/screenshots/new_recipe_display.png" alt="Tiktok Hawaiian Garlic Rolls Ingredients" className="mt-2 rounded-lg object-scale-down max-w-[325px] sm:max-w-sm"/>
                  </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export function ChatFeature() {

  return (
    <Container className="relative w-full max-w-6xl mx-auto px-5">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8 rounded-3xl orange-border-shadow">
        <div className="flex justify-center items-center">
          <div className="space-y-6">
              <TitleSection titleBlack={"Chat with"} titleOrange={"Zesti"} desc={"Ask questions about specific steps, ingredients or anything regarding cooking and get instant answers!"}/>
            <div className="aspect-h-1 aspect-w-1 overflow-hidden ">
              <div className="flex justify-center">
                <img
                  src="/images/screenshots/chat_screenshot_2.JPG"
                  alt="Zesti AI Cooking Assistant chat example asking about substitutions for heavy cream"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}