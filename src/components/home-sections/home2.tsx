import { Container } from "../shared/container"
import { ArrowRightIcon, StarIcon, VideoCameraIcon, ComputerDesktopIcon, ChevronLeftIcon, ChevronRightIcon, MinusSmallIcon, PlusSmallIcon} from "@heroicons/react/20/solid"
import Link from "next/link"
import { useState } from "react"
import { ToolExamples, Scroller, DashboardExample } from "./scroll"
import { Button, BtnLink } from "../shared/button"
import Image from "next/image"
import { Disclosure } from "@headlessui/react"
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router"

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
    <Container className={"py-32 lg:py-48 px-5"}>
        <div className="w-full max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-8 lg:gap-14 text-center lg:text-left">
                <p className="section-title-text-size font-semibold text-gray-700 lg:w-1/3">
                USE THE BEST
                <br />
                <span className="primary-orange-text-gradient"> AI RECIPE TOOLS</span>
                <br />
                AROUND
                </p>
                <p className="w-full lg:w-1/2 section-desc-text-size text-gray-600">
                Zesti makes it easy for you to discover and try new recipes Instantly save video recipes or create your own using AI!
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-10">
                {tools.map((tool) => (
                <div key={tool.name} className="flex flex-col items-start p-6 rounded-3xl gap-y-2 bg-white orange-border-shadow">
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

export function HomePageScroller() {

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
      <Container className="home-scroll-container"> 
        <ToolExamples/>
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

export function HomePageHero(){

  const { user, stripeRole } = useAuth()
  const router = useRouter()

  return(
    <Container className="flex flex-col lg:flex-row items-center justify-between pt-36 px-5 space-x-4 xl:pt-48">
      <div className="flex lg:w-1/2 flex-col gap-6 lg:gap-8">
        <div className="inline-flex w-fit mx-auto lg:mx-0 items-center border border-gray-300 rounded-3xl p-2 space-x-1 ">
            <div className="text-black font-bold text-sm">Powered By OpenAI</div>
            <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
        </div>
        <div className="flex flex-col gap-8 text-center lg:text-left">
          <p className="section-title-text-size xl:text-6xl font-bold primary-orange-text-gradient">
            <span className="primary-orange-text-gradient">Upgrade</span>
            <span className="text-gray-700"> Your Cooking With </span>
            <br />
            <span className="primary-orange-text-gradient">Zesti AI</span>
          </p>
          <p className="section-desc-text-size font-medium text-gray-600">
          Create AI generated recipes, instantly save recipes from YouTube & Tiktok, 
          and get cooking questions answered instantly!
          </p>
        </div>
        <div className="grid justify-center lg:justify-start space-y-1">
          {!user ?
          <div className="grid justify-center lg:justify-start space-y-0.5">
            <Button buttonType="button" text="Get Started" className="w-fit" onClick={() => router.push('/login')}/>
          </div>
          :
          <div className="grid justify-center lg:justify-start space-y-0.5">
            <Button buttonType="button" text="Go to Dashboard" className="w-fit" onClick={() => router.push('/dashboard')}/>
          </div>
          }
          <p className="text-sm text-gray-500/90 mx-auto lg:mx-1">Try for Free. No Credit Card Required</p>
        </div>

        <div className="grid grid-cols-3 lg:flex justify-center lg:justify-start lg:space-x-16">
          <StatisticItem number="3000+" label="Recipes" />
          <StatisticItem number="500+" label="Users" />
          <StatisticItem number="$0" label="Price" />
        </div>
      </div>


        <div className="hidden lg:block w-1/2 bg-transparent rounded-lg">
          <Image src={"/images/Illustration.png"} alt="Profile" height={2058} width={2150} className="object-fit" />
        </div> {/* Placeholder for the illustration */}
      
  </Container>
)
}

export function HomePageCTA() {
  return(
    <Container className="relative w-full max-w-6xl mx-auto py-32 lg:py-48 px-5">
      <div className="flex flex-col items-center gap-8 border rounded-3xl p-6 lg:p-12">
        <div className="flex flex-col items-center gap-6">
          <p className="w-full md:w-96 text-xl font-medium text-center primary-orange-text-gradient">
            Check Out Premium
          </p>
          <p className="section-title-text-size font-semibold text-center text-gray-700">
            Try Zesti Premium Free for 7-Days

          </p>
          <p className="w-full section-desc-text-size font-medium text-center text-gray-600 opacity-70">
            Get more out of Zesti when you use premium by gaining access to every feature Zesti offers and increased monthly usage! 
          </p>
        </div>
        <BtnLink href='/pricing' text="Get Started" className="text-lg font-medium text-center text-white"/>
      </div>
    </Container>
  )
}

export function HomeFAQ() {

  const faqs = [
    {
      question: "How does Zesti work?",
      answer: "Zesti Utilizes AI (Artificial Intelligence) to generate recipes and transcribe them from videos and websites." ,
    },
    {
      question: "Why use Zesti?",
      answer: "Zesti will help you create recipes that fit your exact needs, create text recipes from YouTube videos to make following the recipe easier, and cut through the ads and clutter on website recipes.",
    },
    {
      question: "How much does Zesti cost?",
      answer: "Zesti is free to use, but we also have a premium option (7-day free trial) that unlocks the full potential of Zesti",
    },
    {
      question: "Does Zesti work?",
      answer: "Yes, Zesti can help create easy-to-read recipes. Though, Zesti is not always perfect and sometimes makes mistakes and misses information. But we constantly strive to improve the performance of Zesti",
    },
    {
      question: "I have more questions, how can I contact you?",
      answer: "You can visit the contact page and send us a message!",
    },
    // More questions...
  ]
  return (
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl px-6 pb-32">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <div className="flex flex-col items-center gap-6">
            <p className="section-title-text-size font-semibold text-center text-gray-700">
              FAQ
            </p>
            <p className="w-full section-desc-text-size font-medium text-center text-gray-600 opacity-70">
              Get some of the most common questions we are asked answered right away!
            </p>
          </div>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
    </Container>
  )
}

function StatisticItem({ number, label }: any) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-semibold text-gray-700">{number}</p>
      <p className="text-base font-medium text-gray-600">{label}</p>
    </div>
  );
}