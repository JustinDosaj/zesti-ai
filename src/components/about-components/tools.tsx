
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import React from 'react'
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { BtnLink } from "../shared/btnlink";
import { StarIcon, VideoCameraIcon, ComputerDesktopIcon, LinkIcon, PencilIcon, Cog6ToothIcon, BookOpenIcon  } from "@heroicons/react/20/solid";
import { Title } from "../shared/title";

export function SocialMediaRecipeHero(){
    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <div className="space-y-4 relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-black">Instantly Save</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> TikTok & YouTube </span> 
                        <span className="text-black">Recipes</span>
                    </h1>
                    <Paragraph className="text-lg mt-8 text-black">
                        Say goodbye to pausing, rewinding and restarting. Zesti Premium lets you transform a cooking video from TikTok or YouTube to an easy-to-follow text recipe!
                    </Paragraph>
                    <BtnLink text="Start Free 7-Day Trial" href="/pricing" className="align-middle mt-4 text-lg"/>
                </div>
            </Container>
        </section>
    )
}

export function SocialMediaRecipeQuickGuide() {

    const cards = [
      {
        name: 'Find a Video',
        description: 'Find a cooking video with audible instructions on YouTube or TikTok',
        icon: VideoCameraIcon,
      },
      {
        name: 'Copy & Paste the Link',
        description: 'Go to your dashboard, access the video tool and paste the link.',
        icon: LinkIcon,
      },
      {
        name: 'Go to Recipe Book',
        description: 'After a few moments your recipe will be ready!',
        icon: BookOpenIcon,
      },
    ]
  
    return (
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
          <div className="relative isolate overflow-hidden py-8 sm:py-32 ">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-3xl text-center">
                      <Title className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                      <span className="text-black">Following</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Video Recipes </span>
                      <span className="text-black">Has Never Been Easier</span>
                      </Title>
                      <Paragraph className="mt-6 text-lg leading-8 text-gray-800">
                        All your tools are accessible through the dashboard, once you've created an account you can access the tools there to get started
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

export function CreateRecipeHero(){
    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <div className="space-y-4 relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-black">Create Amazing</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> AI Generated </span> 
                        <span className="text-black">Recipes</span>
                    </h1>
                    <Paragraph className="text-lg mt-8 text-black">
                        Use Zesti to come up with recipe ideas from scratch or from ingredients you have on hand
                    </Paragraph>
                    <BtnLink text="Try for Free" href="/login" className="align-middle mt-4 text-lg"/>
                    <p className="text-gray-600">Try for Free. No Credit Card Required.</p>
                </div>
            </Container>
        </section>
    )
}

export function CreateRecipeQuickGuide() {

    const cards = [
      {
        name: 'Chat with Zesti AI',
        description: 'Access the AI recipe generator and let Zesti know what you want!',
        icon: PencilIcon,
      },
      {
        name: 'Advanced Controls',
        description: 'Optionally get more control over the output with additional settings',
        icon: Cog6ToothIcon,
      },
      {
        name: 'Go to Recipe Book',
        description: 'After a few moments your recipe will be ready!',
        icon: BookOpenIcon,
      },
    ]
  
    return (
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
          <div className="relative isolate overflow-hidden py-8 sm:py-32 ">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-3xl text-center">
                      <Title className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                      <span className="text-black">Craft Up Delicious</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> AI Generated </span>
                      <span className="text-black">Recipes</span>
                      </Title>
                      <Paragraph className="mt-6 text-lg leading-8 text-gray-800">
                        All your tools are accessible through the dashboard, once you've created an account you can access the tools there to get started
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

export function WebRecipeHero(){
    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <div className="space-y-4 relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-black">Remove</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Clutter & Ads </span> 
                        <span className="text-black">From Website Recipes</span>
                    </h1>
                    <Paragraph className="text-lg mt-8 text-black">
                        Tired of the constant ad spam or the paragraphs of information you have to sift through to get a recipe? Zesti will remove all of that instantly!
                    </Paragraph>
                    <BtnLink text="Start Free 7-Day Trial" href="/pricing" className="align-middle mt-4 text-lg"/>
                </div>
            </Container>
        </section>
    )
}

export function WebRecipeQuickGuide() {

    const cards = [
      {
        name: 'Copy Website URL',
        description: 'Once you found a recipe you love, copy the URL',
        icon: LinkIcon,
      },
      {
        name: 'Give URL to Zesti',
        description: 'From the dashboard, access the website tool and paste the link',
        icon: ComputerDesktopIcon,
      },
      {
        name: 'Go to Recipe Book',
        description: 'After a few moments your recipe will be ready!',
        icon: BookOpenIcon,
      },
    ]
  
    return (
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
          <div className="relative isolate overflow-hidden py-8 sm:py-32 ">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-3xl text-center">
                      <Title className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                      <span className="text-black">Say Goodbye to</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red"> Cluttered Websites</span>
                      </Title>
                      <Paragraph className="mt-6 text-lg leading-8 text-gray-800">
                        All your tools are accessible through the dashboard, once you've created an account you can access the tools there to get started
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
