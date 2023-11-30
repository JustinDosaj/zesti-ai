import { BtnLink } from "../shared/btnlink";
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import { Button } from "../shared/button";
import { Title } from "../shared/title";
import Link from "next/link";
import React from 'react'
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { useAuth } from "@/pages/api/auth/auth";
import { VideoCameraIcon, ComputerDesktopIcon, StarIcon, CheckIcon } from '@heroicons/react/20/solid'
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

export function Hero(){

    const router = useRouter()
    const { user } = useAuth()

    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pr-2">Upgrade</span>
                        <span className="text-black">Your Cooking Using</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Zesti AI Assistant</span> 
                    </h1>
                    <Paragraph className="text-lg mt-8 text-black">
                        Get your questions answered on the fly, create delicious recipes with what you have available, generate new ideas and turn cooking videos into ad-free text recipe
                    </Paragraph>
                    { !user ? 
                    <Button
                        onClick={() => router.push('/login')}
                        buttonType="button"
                        text="Try for Free"
                        className="mt-4 w-48"
                    >
                    </Button>
                    :
                    <Button
                        onClick={() => router.push('/dashboard')}
                        buttonType="button"
                        text="Go to Dashboard"
                        className="mt-4 w-48"
                    >
                    </Button>
                    }
                    <p className="text-sm mt-1 text-gray-500">No Credit Card Required.</p>
                </div>
            </Container>
        </section>
    )
}

export function Hero2(){

    const router = useRouter()
    const { user } = useAuth()

    return(
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-2 py-32 sm:py-40 lg:px-8 sm:mt-12">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1 ">
                <div className="flex w-fit mx-auto sm:inline-flex sm:justify-left items-center border border-gray-300 rounded-3xl p-2 space-x-1 ">
                    <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                    <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                </div>
                <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6 grid text-center md:text-left">          
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pr-2">Upgrade</span>
                    <span className="text-black">Your Cooking Using</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Zesti AI Assistant</span> 
                </h1>
                <Paragraph className="text-base sm:text-lg mt-8 text-black text-center md:text-left">
                    Create AI generated recipes, instantly save recipes from YouTube & Tiktok, and get cooking questions answered instantly!
                </Paragraph>
              { !user ?
                <div className="mt-6 grid space-y-4 md:space-y-0 md:inline-flex items-center gap-x-6">
                    <Button
                        onClick={() => router.push('/login')}
                        buttonType="button"
                        text="Try for Free"
                        className="w-fit mx-auto"
                    >
                    </Button>
                    <div className="space-x-1 text-sm text-center border rounded-xl p-1 bg-gray-100 w-fit mx-auto">
                        <span className="text-gray-600 text-xs">No Credit Card Required</span>
                    </div>
                </div>
                :
                <div className="mt-6 grid space-y-4 md:space-y-0 md:inline-flex items-center gap-x-6">
                    <Button
                        onClick={() => router.push('/dashboard')}
                        buttonType="button"
                        text="Go to Dashboard"
                        className="w-fit mx-auto"
                    >
                    </Button>
                    <div className="space-x-1 text-sm text-center border rounded-xl p-1 bg-gray-100 w-fit mx-auto">
                        <span className="text-gray-600 text-xs">No Credit Card Required</span>
                    </div>
                </div>
                }
            </div>
            <Image
                src="/images/no-bg-iso.png"
                alt="Cooking Recipes Screenshot"
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                width={500} height={500}
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </Container>
    )
}

export function ZestiTools() {

    const cards = [
      {
        name: 'Generate Recipe',
        description: 'Use Zesti AI to generate a recipe from a list of ingredients, description or dish name.',
        icon: StarIcon,
      },
      {
        name: 'Save Tiktok & YouTube Recipes',
        description: 'Say goodbye to pausing and rewinding cooking videos to get every detail.',
        icon: VideoCameraIcon,
      },
      {
        name: 'Ad-Free Web Recipe',
        description: 'Remove clutter from website recipes using Zesti',
        icon: ComputerDesktopIcon,
      },
    ]
  
    return (
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
          <div className="relative isolate overflow-hidden py-8 sm:py-32 ">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-3xl text-center">
                      <Title className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                      No More
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Cluttered Recipes</span>
                      </Title>
                      <Paragraph className="mt-6 text-lg leading-8 text-gray-800">
                        Start cooking more by discovering new recipes! Use Zesti to retrieve recipes from videos and websites, or just have Zesti create one for you!
                      </Paragraph>
                  </div>
                  <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                  {cards.map((card) => (
                      <div key={card.name} className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10 border">
                      <card.icon className="h-7 w-5 flex-none text-primary-main" aria-hidden="true" />
                      <div className="text-base leading-7">
                          <h3 className="font-semibold text-gray-800">{card.name}</h3>
                          <p className="mt-2 text-gray-600">{card.description}</p>
                      </div>
                      </div>
                  ))}
                  </div>
              </div>
          </div>
      </Container>
    )
}

export function HomeChat() {

    const features = [
        {
          name: 'Fast Responses:',
          description: 'Zesti typically responds within 3 seconds of less',
          icon: CheckIcon,
        },
        {
            name: 'Save Time:',
            description: 'Zesti can handle most questions so you never have to take your eye of the recipe to get answers',
            icon: CheckIcon,
          },
      ]

    return (
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
        <div className="bg-white py-24 sm:py-32 p-8">
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                <div className="md:px-0 lg:pr-4 lg:pt-4">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">

                        <Title className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Ask
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Zesti </span>
                        Questions While
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Cooking</span>
                        </Title>
                        <Paragraph className="mt-6 text-lg leading-8 text-gray-800">
                            With cooking, time is everything. When you start cooking a recipe, Zesti will be ready to answer any of your questions.
                        </Paragraph>
                
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                        {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                            <dt className="inline font-semibold text-gray-900">
                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-color-alt-green" aria-hidden="true" />
                            {feature.name}
                            </dt>{' '}
                            <dd className="inline">{feature.description}</dd>
                        </div>
                        ))}
                    </dl>
                    
                    </div>
                </div>
                <div className="sm:px-6 lg:px-0">
                    <div className="relative isolate overflow-hidden bg-primary-main sm:mx-auto sm:max-w-2xl rounded-3xl p-2 sm:p-8 lg:p-8">
                    <div
                        className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                        aria-hidden="true"
                    />
                    <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none p-4 sm:p-0">
                        <Image
                            src="/images/chatbotpicbgless.png"
                            alt="Cooking Recipes Screenshot"
                            className="bg-transparent rounded-xl w-full max-w-none rounded-tl-xl"
                            width={500} height={500}
                        />
                    </div>
                    <div
                        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                        aria-hidden="true"
                    />
                    </div>
                </div>
                </div>
            </div>
        </div>
        </Container>
      )
}

export function HomeDashDisplay() {
    return (
    <Container>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <Title className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red">Save, Edit & Create </span>
            Recipes from the
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Dashboard</span>

            </Title>
            <Paragraph className="mt-6 text-lg leading-8 text-gray-600">
              Everything is accessible from our easy-to-use dashboard. Cooking has never been easier!
            </Paragraph>
          </div>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              src="/images/dashdeskcap.JPG"
              alt="Ingredient and Instruction Screenshot for Recipe"
              className="mb-[-4%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 hidden sm:block"
              width={2432}
              height={1442}
            />
            <Image
              src="/images/mobdashcap.JPG"
              alt="Ingredient and Instruction Screenshot for Recipe"
              className="mb-[-4%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 block sm:hidden"
              width={2432}
              height={1442}
            />
            <div className="relative" aria-hidden="true">
              <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
            </div>
          </div>
        </div>
      </div>
    </Container>
    )
}

export function HomeRecipeDisplay() {
  return (
  <Container>
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <Title className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red">Easy-to-follow </span>
          Recipes
          </Title>
          <Paragraph className="mt-6 text-lg leading-8 text-gray-600">
            Everything is accessible from our easy-to-use dashboard. Cooking has never been easier!
          </Paragraph>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Image
            src="/images/deskreccap.JPG"
            alt="Ingredient and Instruction Screenshot for Recipe"
            className="mb-[-4%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 hidden sm:block"
            width={2432}
            height={1442}
          />
          <Image
            src="/images/mobreccap.JPG"
            alt="Ingredient and Instruction Screenshot for Recipe"
            className="mb-[-4%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 block sm:hidden"
            width={2432}
            height={1442}
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
    </div>
  </Container>
  )
}

export function TryPremiumCTA() {
    return (
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
        <div className="bg-white border rounded-xl w-full">
            <div className="px-6 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                  Get the most out of Zesti
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-base lg:text-lg leading-8 text-gray-700">
                Join hundreds of users cooking fresh meals at home and try Zesti premium free for 7 days.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <BtnLink className="" text="Try Premium Free" href="/pricing"/>
                </div>
            </div>
            </div>
        </div>
        </Container>
    )
}

export function FAQ() {

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
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <Title className="text-center text-black text-4xl md:text-5xl">Frequently asked questions</Title>
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

  