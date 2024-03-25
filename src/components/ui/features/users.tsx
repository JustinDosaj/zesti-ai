import { Container } from "@/components/shared/container"
import { ArrowDownIcon, BeakerIcon} from "@heroicons/react/20/solid"
import { useState, useEffect, useRef } from "react"
import { ToolExamples, Scroller, FeaturedCreators, DashboardExample } from "../scroller"
import { Button } from "@/components/shared/button"
import Image from "next/image"
import { SharedHomeSectionTitle } from "@/components/shared/title"
import { Search } from "@/components/search"
import getConfig from "next/config"

interface HeroProps {
  titleStart?: string,
  titleEnd?: string,
  description?: string,
}

export function Hero({titleStart, titleEnd, description}: HeroProps) {

  const { publicRuntimeConfig } = getConfig();

  return(
      <Container className="flex flex-col lg:flex-row items-center justify-between pt-36 px-5 space-x-4 xl:pt-48 animate-fadeIn">
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
            <p className="section-desc-text-size font-medium text-gray-600">
              {description}
            </p>
          </div>
          <div className="grid justify-center lg:justify-start text-left space-y-1">
            <Search searchLocation="home"/>
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
            <Image src={"/images/Illustration.png"} alt="Profile" height={2058} width={2150} className="object-fit" />
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

export function HomePageScroller({creators}: any) {

    const [ scrollPage, setScrollPage] = useState<number>(1)

    const onRightScrollClick = () => {
      /*if(scrollPage >= 2) {
        setScrollPage(1)
      } else {
        setScrollPage(scrollPage + 1)
      }*/
    }

    const onLeftScrollClick = () => {
      /*if(scrollPage <= 1) {
        setScrollPage(2)
      }
      else {
        setScrollPage(scrollPage - 1)
      }*/
    }

    if (scrollPage == 1) return(
      <Container className="home-scroll-container animate-fadeIn"> 
        <FeaturedCreators creators={creators}/>
        <Scroller onRightScrollClick={onRightScrollClick} onLeftScrollClick={onLeftScrollClick} scrollPage={scrollPage}/>
      </Container> 
    )
    else if (scrollPage == 2) return (
      <Container className="home-scroll-container"> 
        <DashboardExample/>
        <Scroller onRightScrollClick={onRightScrollClick} onLeftScrollClick={onLeftScrollClick} scrollPage={scrollPage}/>
      </Container>
    )
    else if (scrollPage == 3) return (
      <Container className="home-scroll-container"> 
        <ToolExamples/>
        <Scroller onRightScrollClick={onRightScrollClick} onLeftScrollClick={onLeftScrollClick} scrollPage={scrollPage}/>
      </Container>
    )
    /* PROBABLY WANT TO SHOW ERROR HERE IF SCROLL PAGE IS NOT A VALID PAGE */
    else return (
      <Container className="flex flex-col items-start py-12 px-5 bg-gradient-to-b from-orange-100 to-orange-200/50 xl:rounded-3xl"> 
        <ToolExamples/>
        <Scroller onRightScrollClick={onRightScrollClick} onLeftScrollClick={onLeftScrollClick} scrollPage={scrollPage}/>
      </Container>
    )
}

export function HomePageCTA() {
  return(
    <Container className="relative w-full max-w-6xl mx-auto px-5 animate-fadeIn">
      <div className="flex flex-col items-center gap-8 orange-border-shadow rounded-3xl p-6 lg:p-12">
        <div className="flex flex-col items-center text-center">
          <p className="w-full md:w-96 text-xl font-medium text-center primary-orange-text-gradient mb-3">
            Check Out Premium
          </p>
          <SharedHomeSectionTitle titleBlack="Try Free for 7-Days" desc="Get more out of Zesti when you use premium by gaining access to every feature Zesti offers and increased monthly usage!"/>
        </div>
        <Button isLink={true} href='/about/pricing' text="Get Started" className="text-lg font-medium text-center text-white"/>
      </div>
    </Container>
  )
}

export function HomeVideoToRecipe({titleStart, titleEnd, desc}: any,) {

  const tikTokRef = useRef(null);

  useEffect(() => {
    // Function to load tFe TikTok embed script
    const loadTikTokScript = () => {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    };

    // Insert the embed code and load the script
    if (tikTokRef.current) {
      (tikTokRef.current as HTMLDivElement).innerHTML = `
        <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@britscookin/video/7290713603299331374" data-video-id="7290713603299331374" style="max-width: 605px;min-width: 325px;">
          <section>
            <a target="_blank" title="@britscookin" href="https://www.tiktok.com/@britscookin?refer=embed">@britscookin</a>
            <p>Cheesy Hawaiian Roll Garlic Bread!</p>
            <a target="_blank" title="♬ original sound - britscookin" href="https://www.tiktok.com/music/original-sound-7290713636770646827?refer=embed">♬ original sound - britscookin</a>
          </section>
        </blockquote>
      `;
      loadTikTokScript();
    }
  }, []);

  return(
    <Container className="relative w-full max-w-6xl mx-auto px-5 animate-fadeIn ">
        <div className="flex flex-col lg:flex-row justify-center text-center lg:items-center w-full gap-8 p-2 xl:orange-border-shadow rounded-3xl">
            <div className="flex flex-col mt-8">
                <SharedHomeSectionTitle titleBlack={titleStart} titleOrange={titleEnd} desc={desc}/>
                <div className="grid grid-cols-1 xl:grid-cols-2 justify-center mt-4">
                  <div className="mx-auto" ref={tikTokRef}></div>
                  <div className="block xl:hidden mx-auto my-auto p-12 text-center">
                      <ArrowDownIcon className="block xl:hidden h-20 w-20 text-white bg-primary-main p-4 rounded-full"/>
                  </div>
                  <div className="h-full mt-2 w-fit mx-auto">
                    <img src="/images/screenshots/new_recipe_display.png" alt="Tiktok Hawaiian Garlic Rolls Ingredients" className="mt-2 rounded-lg object-scale-down max-w-[340px] sm:max-w-sm"/>
                  </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export function ChatFeature() {

  return (
    <Container className="relative w-full max-w-6xl mx-auto px-5 animate-fadeIn ">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8 rounded-3xl orange-border-shadow">
        <div className="flex justify-center items-center">
          <div className="space-y-6">
              <SharedHomeSectionTitle titleBlack={"Chat with"} titleOrange={"Zesti"} desc={"Ask questions about specific steps, ingredients or anything regarding cooking and get instant answers!"}/>
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

export function CookBookFeature({titleStart, titleEnd, desc}: any) {
  return (
    <Container className="relative w-full max-w-6xl mx-auto px-5 animate-fadeIn home-scroll-container ">
        <SharedHomeSectionTitle titleBlack={titleStart} titleOrange={titleEnd} desc={desc}/>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <img
              src="/images/screenshots/profile_desktop_screenshot.JPG"
              alt="App screenshot"
              className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 hidden sm:block"
              width={2432}
              height={1442}
            />
            <img
              src="/images/screenshots/profile_mobile_screenshot.JPG"
              alt="App screenshot"
              className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 block sm:hidden"
              width={2432}
              height={1442}
            />
            <div className="relative" aria-hidden="true">
              <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-orange-50 pt-[7%]" />
            </div>
          </div>
        </div>
    </Container>
  )
}