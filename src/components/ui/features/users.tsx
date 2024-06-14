import { Container } from "@/components/shared/container"
import { BeakerIcon} from "@heroicons/react/20/solid"
import { useState } from "react"
import { Scroller, DiscoverRecipes } from "../scroller"
import { Button } from "@/components/shared/button"
import { TitleSection } from "@/components/shared/title"
import { SearchOrAddRecipe } from "@/components/search"
import getConfig from "next/config"
import { Paragraph } from "@/components/shared/paragraph"
import Image from "next/image"

interface ImageFields {
  file: {
    url: string;
  };
}

interface Image {
  fields: ImageFields;
}

interface HeroContent {
  titleStart: string;
  titleEnd: string;
  description: string;
  image: Image;
}

interface HeroProps {
  heroContent: HeroContent;
}

export function Hero({heroContent}: HeroProps) {

  const { publicRuntimeConfig } = getConfig();
  const { titleStart, titleEnd, description, image } = heroContent;
  const imageUrl = image.fields.file.url;
  const absoluteImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;

  return(
      <Container className="flex flex-col lg:flex-row items-center justify-between pt-14 px-5 space-x-4 animate-fadeIn">
        <div className="flex lg:w-1/2 flex-col gap-6 lg:gap-8">
          <div className="inline-flex w-fit mx-auto lg:mx-0 items-center border border-gray-300 rounded-3xl p-2 space-x-1 ">
              <BeakerIcon className="text-black h-4 w-4"/>
              <div className="text-black font-bold text-sm">{`beta v${publicRuntimeConfig?.version}`}</div>
          </div>
          <div className="flex flex-col gap-4 text-center lg:text-left">
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
          {
            <div className="grid grid-cols-3 lg:flex justify-center lg:justify-start lg:space-x-16">
              <StatisticItem number="407+" label="Recipes" />
              <StatisticItem number="500+" label="Users" />
              <StatisticItem number="$0/mo." label="Price" />
            </div>
          }
        </div>
        <div className="hidden lg:block w-1/2 bg-transparent rounded-lg">
          <Image src={absoluteImageUrl} alt="Profile" height={2058} width={2150} className="object-fit" loading="lazy"/>
          {/* https://firebasestorage.googleapis.com/v0/b/zesti-production.appspot.com/o/public_images%2FIllustration.png?alt=media&token=581a8061-8667-4b7f-9dd0-3c092c009b24 */}
        </div>
        
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
            Premium
          </p>
          <TitleSection titleBlack="Try 7-Day Free Trial" desc="Enjoy Zesti without ads and gain access to the Cooking AI Chat Assistant"/>
        </div>
        <Button isLink={true} href='/about/pricing' text="Get Started" className="text-lg font-medium text-center text-white"/>
      </div>
    </Container>
  )
}

export function ChatFeature({data}: any) {

  const { imageAlt, chatScreenshot } = data;

  const imageUrl = chatScreenshot.fields.file.url;
  const absoluteImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;

  return (
    <Container className="relative w-full max-w-6xl mx-auto px-5 animate-fadeIn">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8 rounded-3xl orange-border-shadow">
        <div className="flex justify-center items-center">
          <div className="space-y-6">
              <TitleSection titleBlack={"Chat with"} titleOrange={"Zesti"} desc={"Ask questions about specific steps, ingredients or anything regarding cooking and get instant answers!"}/>
            <div className="aspect-h-1 aspect-w-1 overflow-hidden ">
              <div className="flex justify-center">
                <Image
                  src={absoluteImageUrl}
                  alt={imageAlt}
                  className="object-cover"
                  height={500}
                  width={500}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}