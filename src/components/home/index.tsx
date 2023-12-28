import { Container } from "../shared/container"
import { ArrowRightIcon, CheckIcon, StarIcon, VideoCameraIcon, ComputerDesktopIcon, MinusSmallIcon, PlusSmallIcon, ArrowDownIcon} from "@heroicons/react/20/solid"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ToolExamples, Scroller, DashboardExample } from "./scroll"
import { Button, BtnLink } from "../shared/button"
import Image from "next/image"
import { Disclosure } from "@headlessui/react"
import { useAuth } from "@/pages/api/auth/auth"
import { useRouter } from "next/router"
import { Loader } from "../shared/loader"
import { createPremiumCheckoutSession } from "@/pages/api/stripe/stripePremium"

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
          name: 'Clutterless Web Recipes',
          description: 'Remove clutter and excess ads from website recipes using Zesti',
          icon: ComputerDesktopIcon,
          href: '/about/tools/web-recipe'
        },
      ]

    return(
    <Container className={"py-32 lg:py-48 px-5 animate-fadeIn"}>
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
      <Container className="home-scroll-container animate-fadeIn"> 
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

export function HomePageCTA() {
  return(
    <Container className="relative w-full max-w-6xl mx-auto py-24 px-5 animate-fadeIn">
      <div className="flex flex-col items-center gap-8 orange-border-shadow rounded-3xl p-6 lg:p-12">
        <div className="flex flex-col items-center gap-6">
          <p className="w-full md:w-96 text-xl font-medium text-center primary-orange-text-gradient">
            Check Out Premium
          </p>
          <h1 className="section-title-text-size font-semibold text-center text-gray-700">
            Try Free for 7-Days
          </h1>
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
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
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

export function StatisticItem({ number, label }: any) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-semibold text-gray-700">{number}</p>
      <p className="text-base font-medium text-gray-600">{label}</p>
    </div>
  );
}

export function HomeVideoToRecipe() {

  const tikTokRef = useRef(null);

  useEffect(() => {
    // Function to load the TikTok embed script
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
    <Container className="relative w-full max-w-6xl mx-auto py-12 px-5 animate-fadeIn ">
        <div className="flex flex-col lg:flex-row justify-center text-center lg:items-center w-full gap-8 p-2 xl:orange-border-shadow rounded-3xl">
            <div className="flex flex-col gap-6">
                <h1 className="text-4xl lg:text-5xl font-semibold text-gray-800 mt-6">
                    From Video to 
                <span className="primary-orange-text-gradient"> Recipe </span>
                </h1>
                <p className="section-desc-text-size text-gray-600 w-full">
                    Zesti can quickly create an ingredient list & instructions from your favorite TikTok & YouTube cooking videos!
                </p>
                <div className="grid grid-cols-1 xl:grid-cols-2 justify-center">
                  <div className="mx-auto" ref={tikTokRef}></div>
                  <div className="block xl:hidden mx-auto my-auto p-12 text-center">
                      <ArrowDownIcon className="block xl:hidden h-20 w-20 text-white bg-primary-main p-4 rounded-full"/>
                  </div>
                  <div className="h-full mt-2 w-fit mx-auto">
                    <Image src="/images/Hawaiian-Rolls-Ingredients.png" height={1920} width={1080} alt="Tiktok Hawaiian Garlic Rolls Ingredients" className="border rounded-lg p-2 lg:mt-2 mx-auto object-scale-down max-w-[340px] sm:max-w-sm"/>
                  </div>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Testimonial cards */}

        </div>
    </Container>
  )
}

interface HeroProps {
  titleStart: string,
  titleEnd: string,
  description: string,
  loginURL: string,
}

export function Hero({titleStart, titleEnd, description, loginURL}: HeroProps) {
  const { user, stripeRole } = useAuth()
  const router = useRouter()

  return(
      <Container className="flex flex-col lg:flex-row items-center justify-between pt-36 px-5 space-x-4 xl:pt-48 animate-fadeIn">
        <div className="flex lg:w-1/2 flex-col gap-6 lg:gap-8">
          <div className="inline-flex w-fit mx-auto lg:mx-0 items-center border border-gray-300 rounded-3xl p-2 space-x-1 ">
              <div className="text-black font-bold text-sm">Powered By OpenAI</div>
              <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
          </div>
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <h1 className="section-title-text-size xl:text-6xl font-bold text-gray-700">
              <span className="text-gray-700"> {titleStart} </span>
              <span className="primary-orange-text-gradient"> {titleEnd} </span>
              <br />
            </h1>
            <p className="section-desc-text-size font-medium text-gray-600">
              {description}
            </p>
          </div>
          <div className="grid justify-center lg:justify-start space-y-1">
            {!user ?
            <div className="grid justify-center lg:justify-start space-y-0.5">
              <Button buttonType="button" text="Get Started for Free" className="w-fit" onClick={() => router.push(loginURL)}/>
            </div>
            :
            <div className="grid justify-center lg:justify-start space-y-0.5">
              <Button buttonType="button" text="Go to Dashboard" className="w-fit" onClick={() => router.push('/dashboard')}/>
            </div>
            }
            <p className="text-sm text-center text-gray-500/90 mx-auto lg:mx-1">No Credit Card Required</p>
          </div>

          <div className="grid grid-cols-3 lg:flex justify-center lg:justify-start lg:space-x-16">
            <StatisticItem number="3200+" label="Recipes" />
            <StatisticItem number="540+" label="Users" />
            <StatisticItem number="$0/mo." label="Price" />
          </div>
        </div>


          <div className="hidden lg:block w-1/2 bg-transparent rounded-lg">
            <Image src={"/images/Illustration.png"} alt="Profile" height={2058} width={2150} className="object-fit" />
          </div> {/* Placeholder for the illustration */}
        
      </Container>
  )
}

export function PremiumSubscriptionHero() {

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

  const { user, stripeRole } = useAuth()
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const router = useRouter();

  const PremiumClick = async () => {
      setIsLoading(true);
      await createPremiumCheckoutSession(user?.uid)
  }

  return(
  <>
    <div className="px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-6xl pt-24 text-center sm:pt-40 space-y-8">
          <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">
                  
              <span className="text-gray-700">Try</span>       
              <span className="primary-orange-text-gradient"> Zesti Premium </span>
              <span className="text-gray-700">Free for 7-Days</span> 
          </h1>
          <div className="mt-6 text-lg leading-8 text-gray-700 section-desc-text-size ">
              Save 10x more recipes & access every feature available!
          </div>
          {isLoading == true ?
          <div className="flex justify-center">
            <Loader/>
          </div>
          :
          user && stripeRole !== 'premium' ? 
          <Button text="Start Free Trial!" onClick={PremiumClick} buttonType="button"/>
          : !user ?
          <Button text="Login to Begin Trial" onClick={() => router.push('/login')} buttonType="button" className=""/>
          :
          <Button text="Go to Dashboard" onClick={() => router.push('/dashboard')} buttonType="button" className=""/>
          }
      </div>
    </div>

    {/* Description Section */}
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
  </>
  )
}

export function FreeSubscriptionHero() {
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
  <>
    {/* Header section */}
    <div className="px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-5xl pt-24 text-center sm:pt-40">
          <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">     
              <span className="text-gray-700">Zesti</span>       
              <span className="primary-orange-text-gradient"> Base</span>
          </h1>
          <div className="mt-6 leading-8 text-gray-700 section-desc-text-size">
              Zesti Base is our free-to-use version that grants users access to some of our most popular features
          </div>
      </div>
    </div>

    {/* Description Section */}
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
  </>
  )
}