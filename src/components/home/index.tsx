import { Container } from "../shared/container"
import { ChatBubbleLeftIcon, CheckIcon, StarIcon, MinusSmallIcon, PlusSmallIcon, ArrowDownIcon, BookOpenIcon, CheckCircleIcon, BeakerIcon} from "@heroicons/react/20/solid"
import { useState, useEffect, useRef } from "react"
import { ToolExamples, Scroller, FeaturedCreators, DashboardExample } from "./scroll"
import { Button } from "../shared/button"
import Image from "next/image"
import { Disclosure } from "@headlessui/react"
import { SharedHomeSectionTitle } from "../shared/title"
import { Search } from "../search"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "@/pages/api/auth/auth"
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

export function HomePageTools() {

    const tools = [
        {
          name: 'Search for Recipe or Creator',
          description: 'Find recipes to try from your favorite tiktok chefs',
          icon: StarIcon,
        },
        {
          name: 'Save & Customize',
          description: 'Love the recipe? Save it for later and make changes just for you',
          icon: BookOpenIcon,
        },
        {
          name: 'AI Cooking Assistant',
          description: 'Answer cooking questions instantly & get help with the recipe your making',
          icon: ChatBubbleLeftIcon,
        },
      ]

    return(
    <Container className={" px-5 animate-fadeIn"}>
        <div className="w-full max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-8 lg:gap-14 text-center lg:text-left">
                <p className="section-title-text-size font-semibold text-gray-700 lg:w-1/3">
                TIKTOK RECIPES
                <br />
                <span className="primary-orange-text-gradient"> MADE EASY </span>
                </p>
                <p className="w-full lg:w-1/2 section-desc-text-size text-gray-600">
                 Get easy-to-read instructions for those amazing TikTok recipes
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-10">
                {tools.map((tool) => (
                <div key={tool.name} className="flex flex-col items-start p-6 rounded-3xl gap-y-2 bg-white orange-border-shadow">
                    <tool.icon className="h-12 w-12 bg-orange-100 p-2 rounded-2xl text-primary-main" aria-hidden="true" />
                    <div className="flex flex-col gap-3">
                        <p className="text-xl font-semibold text-gray-800 mb-2">{tool.name}</p>
                        <p className="text-base text-gray-600 flex-grow">{tool.description}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </Container>
    )
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
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn pb-28"}>
    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <div className="flex flex-col items-center text-center">
            <SharedHomeSectionTitle titleBlack="FAQ" desc="Get some of the most common questions we are asked answered right away!"/>
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
                    <img src="/images/screenshots/new_recipe_display.png" alt="Tiktok Hawaiian Garlic Rolls Ingredients" className="mt-2 rounded-lg object-scale-down mx-auto max-w-[340px] sm:max-w-sm"/>
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
              <SharedHomeSectionTitle titleBlack={"Chat with"} titleOrange={"Zesti Cooking Assistant"} desc={"Ask questions and get assistance with recipes without ever leaving the page!"}/>
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


export function PremiumSubscriptionBenefits() {

  const features = [
    {
    name: 'Save 30 Recipes Per Month',
    description: 'Premium users are limited to 30 Tiktok, YouTube or Website recipe saves, but does not limit the AI recipe generator',
    },
    {
      name: 'Save TikTok & YouTube Recipes',
      description: 'Instantly save video recipes from TikTok or YouTube so you no longer have to pause, rewind or replay',
    },
    {
      name: 'Max Video Length',
      description: 'Premium users have a max video length of 15 minutes when saving TikTok or YouTube Recipes',
    },
    {
      name: 'Unlimited AI Generated Recipes',
      description: 'Use the AI Recipe Generator unlimited times so you will never run out of meal ideas',
    },
    {
      name: 'AI Cooking Support',
      description: 'Access an AI chat assistant while viewing a recipe so you can get all your cooking questions answered without losing your place',
    },
    {
      name: 'Customize Recipes',
      description: 'Freely edit ingredients and instructions of recipes to make them your own',
    },
    {
      name: 'Ad-Free',
      description: 'Get a 100% ad-free experience when you subscribe to Zesti premium',
    },
  ]

  return(
    <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="text-center lg:text-left">
                <h2 className="text-base font-semibold leading-7 text-primary-main">Premium</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What You Get</p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Zesti premium grants you access to all the features we have to offer!
                </p>
            </div>
            <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                    <dt className="font-semibold text-gray-900">
                    <CheckIcon className="absolute left-0 top-1 h-5 w-5 text-color-alt-green" aria-hidden="true" />
                    {feature.name}
                    </dt>
                    <dd className="mt-2">{feature.description}</dd>
                </div>
                ))}
            </dl>
            </div>
        </div>
    </div>
  )
}

export function FreeSubscriptionBenefits() {

  const features = [
    {
    name: 'Save 3 Recipes Per Month',
    description: 'Save or create up to 3 recipes per month from the AI recipe generator, a website, YouTube, or TikTok',
    },
    {
      name: 'Save TikTok & YouTube Recipes',
      description: 'Instantly save video recipes from TikTok or YouTube so you no longer have to pause, rewind or replay',
    },
    {
      name: 'Max Video Length',
      description: 'Base users have a max video length of 5 minutes when saving TikTok or YouTube Recipes',
    },
    {
      name: 'AI Recipe Generator',
      description: 'Use Zesti AI to generate recipe ideas out of nothing or from ingredients you have around the kitchen',
    },
    {
      name: 'Customize Recipes',
      description: 'Freely edit ingredients and instructions of recipes to make them your own',
    },
  ]

  return(
    <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="text-center lg:text-left">
                <h2 className="text-base font-semibold leading-7 text-primary-main">Free</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What You Get</p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                Our free to use model comes with the least features but will let you explore some basic features Zesti offers
                </p>
            </div>
            <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                    <dt className="font-semibold text-gray-900">
                    <CheckIcon className="absolute left-0 top-1 h-5 w-5 text-color-alt-green" aria-hidden="true" />
                    {feature.name}
                    </dt>
                    <dd className="mt-2">{feature.description}</dd>
                </div>
                ))}
            </dl>
            </div>
        </div>
    </div>
  )
}

interface CreatorCTAProps {
  isHome: boolean,
  title: string,
}

export function CreatorCTA({isHome, title}: CreatorCTAProps) {
  const benefits = [
    'Zero Fees',
    'Display Recipes for Viewers',
    'Auto-Translate Videos Using AI',
    'Get Discovered Through Zesti',
    'Earn 30% from Referred Subscriptions',
  ]
  
  return(
      <div className="relative isolate p-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-transparent rounded-3xl orange-border-shadow px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
            <img
              className="h-96 w-full flex-none rounded-2xl object-cover lg:aspect-square lg:h-auto lg:max-w-sm"
              src="/images/no-bg-iso.png"
              alt=""
            />
            <div className="w-full flex-auto">
              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-700 sm:text-4xl">{title}</h2>
              <p className="mt-6 leading-8 text-gray-600 section-desc-text-size">
                Love posting your videos to TikTok? Join our creator program to put your recipes on display for all your viewers!
              </p>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-gray-600 sm:grid-cols-2"
              >
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-x-3">
                    <CheckCircleIcon className="h-7 w-5 flex-none text-green-600" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex justify-end">
                { isHome == true ?
                <Link href="/about/creator" className="text-sm font-semibold leading-6 text-primary-main">
                  Learn More <span aria-hidden="true">&rarr;</span>
                </Link>
                :
                <Link href="/account" className="text-sm font-semibold leading-6 text-primary-main">
                  Apply Now <span aria-hidden="true">&rarr;</span>
                </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  
  )
}

export function CreatorHero({titleStart, titleEnd, description}: HeroProps) {

  const router = useRouter()
  const { user } = useAuth()

  return(
      <Container className="flex flex-col lg:flex-row items-center justify-between pt-36 px-5 space-x-4 xl:pt-48 animate-fadeIn">
        <div className="flex lg:w-1/2 flex-col gap-6 lg:gap-8">
          <div className="inline-flex w-fit mx-auto lg:mx-0 items-center border border-gray-300 rounded-3xl p-2 space-x-1 ">
              <div className="text-black font-bold text-sm">Powered By OpenAI</div>
              <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
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
            { user ?
            <Button isLink={false} text="Apply to Join" buttonType="button" onClick={() => router.push('/account') }/>
            :
            <Button isLink={false} text="Apply to Join" buttonType="button" onClick={() => router.push('/auth/login') }/> 
            }
          </div>
        </div>


          <div className="hidden lg:block w-1/2 bg-transparent rounded-lg">
            <Image src={"/images/new-aff-img.png"} alt="Profile" height={2058} width={2150} className="object-fit" />
          </div> {/* Placeholder for the illustration */}
        
      </Container>
  )
}

export function CreatorFAQ() {
  const faqs = [
    {
      question: "Do I need a minimum amount of followers or videos to join?",
      answer: "Nope! Plus, we do not plan on implementing any such requirements" ,
    },
    {
      question: "What is the application process like?",
      answer: "We only need basic information so we can review your tiktok account to ensure it involves cooking or recipes!",
    },
    {
      question: "How do I earn money with Zesti?",
      answer: "Earning money is simple! After account approval, you will setup an affiliate account through Zesti so you can start earning 30% per referred subscription every month.",
    },
    {
      question: "How does Zesti Earn Money?",
      answer: "Unlike other platforms, we do not charge users to access already public recipes and we do not charge creators to display their recipes! Instead, Zesti provides a recipe management platform to users where they can save & customize recipes they find!",
    },
    {
      question: "Who owns the recipes on Zesti?",
      answer: "Whoever posted it. All recipes will link back to the original video & back to the original creator page on Zesti.",
    },
    {
      question: "Does Zesti need authorization to access my TikTok?",
      answer: "Yes! This is the most secure way to ensure recipes cannot be taken or displayed by someone other than an account owner.",
    },
    // More questions...
  ]
    return (
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn pb-28"}>
        <div className="bg-white w-full">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
              <div className="flex flex-col items-center text-center">
                <SharedHomeSectionTitle titleBlack="Creator FAQ" desc="Get some of the most common questions we are asked answered right away!"/>
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
