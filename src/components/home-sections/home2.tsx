import { Container } from "../shared/container"
import { ArrowRightIcon, StarIcon, VideoCameraIcon, ComputerDesktopIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid"
import Link from "next/link"
import { useState } from "react"
import { ToolExamples, Scroller } from "./scroll"

export function HomePageTools() {

    const tools = [
        {
          name: 'AI Recipe Generator',
          description: 'Create a recipe from a list of ingredients, description or dish name.',
          icon: StarIcon,
          href: '/about/tools/create-recipe'
        },
        {
          name: 'Save Tiktok & YouTube Recipes',
          description: 'No more pausing or rewinding cooking videos to get every detail.',
          icon: VideoCameraIcon,
          href: '/about/tools/social-media-recipe'
        },
        {
          name: 'Ad-Free Web Recipe',
          description: 'Remove clutter and invasive ads from website recipes using Zesti',
          icon: ComputerDesktopIcon,
          href: '/about/tools/web-recipe'
        },
      ]

    return(
    <Container className={"py-10 px-5"}>
        <div className="w-full max-w-7xl mx-auto space-y-12 p-4">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-8 lg:gap-14 text-center lg:text-left">
                <p className="text-4xl lg:text-5xl font-semibold text-gray-700 lg:w-1/3">
                USE THE BEST
                <br />
                <span className="primary-orange-text-gradient"> AI RECIPE TOOLS</span>
                <br />
                AROUND
                </p>
                <p className="w-full lg:w-1/2 text-lg text-gray-600">
                We continue to consistently choose and maintain the quality of the fruit served, so that it remains fresh and nutritious when you eat it.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10">
                {tools.map((tool) => (
                <div key={tool.name} className="flex flex-col items-start p-6 rounded-3xl bg-white border border-orange-200 shadow-xl shadow-primary-main/10 gap-y-2">
                    <tool.icon className="h-12 w-12 bg-orange-100 p-2 rounded-2xl text-primary-main" aria-hidden="true" />
                    <div className="flex flex-col gap-3">
                        <p className="text-xl font-semibold text-gray-800 mb-2">{tool.name}</p>
                        <p className="text-base text-gray-600 flex-grow">{tool.description}</p>
                        <Link href={tool.href} className="text-base text-primary-main hover:text-primary-alt inline-flex gap-x-1 items-center">Learn more<ArrowRightIcon className="w-5 h-5"/></Link>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </Container>
    )
}


// CONSIDER REPLACING TESTIMONIALS WITH QUOTES OF WHAT PEOPLE SAY TO GET RECIPES, ETC. //

/* EXAMPLE: 
    HAVE EACH SLIDE REPRESENT A DIFFERENT TOOL
    SLIDE 1: AI GENERATOR - SHOW QUOTE OF WHAT SOMEONE SAID (IE. FRENCH TOAST) - THEN LINK TO FRENCH TOAST RECIPE RESULT
    SLIDE 2: YOUTUKE TIKTOK - SHOW LINK TO VIDEO OR NAME OF VIDEO OR SOMETHING - THEN LINK TO YOUTUBE VIDEO RESULT
    SLIDE 3: WEB URL - SAME THING AS PREVIOUS
*/

/**FIRST IDEA ON HOW TO MAKE SCROLLER WORK
 * 
 * MAKE DIFFERENT TSX COMPONENT FOR EACH PAGE AND PASS SCROLL NUMBER -> IN RETURN FUNCTION OF TSX COMPONENT DO IF STATEMENT BEFORE RETURNING TSX
 */
export function HomePageScroller() {

    const [ scrollPage, setScrollPage] = useState<number>(1)

    const onRightScrollClick = () => {
      if(scrollPage >= 3) {
        setScrollPage(1)
      } else {
        setScrollPage(scrollPage + 1)
      }
    }

    const onLeftScrollClick = () => {
      if(scrollPage <= 1) {
        setScrollPage(3)
      }
      else {
        setScrollPage(scrollPage - 1)
      }
    }

    if (scrollPage == 1) return(
      <Container className="flex flex-col items-start py-12 px-5 bg-gradient-to-b from-orange-100 to-orange-200/50 xl:rounded-3xl"> 
        <ToolExamples/>
        <Scroller onRightScrollClick={onRightScrollClick} onLeftScrollClick={onLeftScrollClick} scrollPage={scrollPage}/>
      </Container> 
    )
    else if (scrollPage == 2) return (
      <Container className="flex flex-col items-start py-12 px-5 bg-gradient-to-b from-orange-100 to-orange-200/50 xl:rounded-3xl"> 
        <ToolExamples/>
        <Scroller onRightScrollClick={onRightScrollClick} onLeftScrollClick={onLeftScrollClick} scrollPage={scrollPage}/>
      </Container>
    )
    else if (scrollPage == 3) return (
      <Container className="flex flex-col items-start py-12 px-5 bg-gradient-to-b from-orange-100 to-orange-200/50 xl:rounded-3xl"> 
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

