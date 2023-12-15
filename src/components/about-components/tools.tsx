
import { Container } from "../shared/container";
import React from 'react'
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { BtnLink } from "../shared/button";
import { VideoCameraIcon, ComputerDesktopIcon, LinkIcon, PencilIcon, Cog6ToothIcon, BookOpenIcon, StarIcon, ArrowRightIcon  } from "@heroicons/react/20/solid";

export function SocialMediaRecipeHero(){
    return(
        <section className="pt-24 lg:pt-36 animate-fadeIn">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
                <div className="space-y-6 relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="section-title-text-size xl:text-6xl font-bold text-gray-700">
                        <span className="text-gray-700">Instantly Save</span>
                        <span className="primary-orange-text-gradient"> TikTok & YouTube </span>
                        <span className="text-gray-700">Recipes</span>
                    </h1>
                    <p className="section-desc-text-size font-medium text-gray-600">
                        Say goodbye to pausing, rewinding and restarting. Zesti Premium lets you transform a cooking video from TikTok or YouTube to an easy-to-follow text recipe!
                    </p>
                    <div className="space-y-4">
                        <BtnLink text="Try for Free" href="/login" className="align-middle mt-4 text-lg"/>
                        <p className="text-sm text-gray-500/90">Try for Free. No Credit Card Required.</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export function SocialMediaRecipeQuickGuide() {

    const tools = [
        {
          name: 'Find a Video',
          description: 'Find a cooking video with audible instructions on YouTube or TikTok',
          icon: VideoCameraIcon,
          href: '/about/tools/create-recipe'
        },
        {
          name: 'Copy & Paste the Link',
          description: 'Go to your dashboard, access the video tool and paste the link.',
          icon: LinkIcon,
          href: '/about/tools/social-media-recipe'
        },
        {
          name: 'Go to Recipe Book',
          description: 'After a few moments your recipe will be ready!',
          icon: BookOpenIcon,
          href: '/about/tools/web-recipe'
        },
      ]
  
    return (
    <Container className={"py-24 lg:py-36 px-5 animate-fadeIn"}>
        <div className="w-full max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col justify-center lg:justify-between items-center gap-8 lg:gap-8 text-center lg:text-left">
                <h1 className="section-title-text-size font-semibold text-gray-700 text-center">
                USING ZESTI
                <br />
                <span className="primary-orange-text-gradient"> AI RECIPE GENERATOR</span>
                <br />
                AROUND
                </h1>
                <p className="w-full section-desc-text-size text-gray-600 text-center">
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
                    </div>
                </div>
                ))}
            </div>
        </div>
    </Container>
    )
}

export function CreateRecipeHero(){
    return(
        <section className="pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
                <div className="space-y-6 relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="section-title-text-size xl:text-6xl font-bold text-gray-700">
                        <span className="text-gray-700">Create Amazing</span>
                        <span className="primary-orange-text-gradient"> AI Generated </span>
                        <span className="text-gray-700">Recipes</span>
                    </h1>
                    <p className="section-desc-text-size font-medium text-gray-600">
                        Use Zesti to come up with recipe ideas from scratch or from ingredients you have on hand
                    </p>
                    <div className="space-y-4">
                        <BtnLink text="Try for Free" href="/login" className="align-middle mt-4 text-lg"/>
                        <p className="text-sm text-gray-500/90">Try for Free. No Credit Card Required.</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export function CreateRecipeQuickGuide() {

    const tools = [
        {
          name: 'Chat with Zesti AI',
          description: 'Access the AI recipe generator and let Zesti know what you want!',
          icon: PencilIcon,
          href: '/about/tools/create-recipe'
        },
        {
          name: 'Advanced Controls',
          description: 'For more control over the recipe, we provide additional settings so you can provide clarity!',
          icon: Cog6ToothIcon,
          href: '/about/tools/social-media-recipe'
        },
        {
          name: 'Go to Recipe Book',
          description: 'All of your created recipes will go to your recipe book where you can use & edit them later',
          icon: BookOpenIcon,
          href: '/about/tools/web-recipe'
        },
      ]
  
    return (
    <Container className={"py-24 lg:py-36 px-5 animate-fadeIn"}>
        <div className="w-full max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col justify-center lg:justify-between items-center gap-8 lg:gap-8 text-center lg:text-left">
                <h1 className="section-title-text-size font-semibold text-gray-700 text-center">
                USING ZESTI
                <br />
                <span className="primary-orange-text-gradient"> AI RECIPE GENERATOR</span>
                <br />
                AROUND
                </h1>
                <p className="w-full section-desc-text-size text-gray-600 text-center">
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
                    </div>
                </div>
                ))}
            </div>
        </div>
    </Container>
    )
}

export function WebRecipeHero(){
    return(
        <section className="pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
                <div className="space-y-6 relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="section-title-text-size xl:text-6xl font-bold text-gray-700">
                        <span className="text-gray-700">Remove</span>
                        <span className="primary-orange-text-gradient"> Clutter & Ads </span>
                        <span className="text-gray-700">From Web Recipes</span>
                    </h1>
                    <p className="section-desc-text-size font-medium text-gray-600">
                        Use Zesti to come up with recipe ideas from scratch or from ingredients you have on hand
                    </p>
                    <div className="space-y-4">
                        <BtnLink text="Try for Free" href="/login" className="align-middle mt-4 text-lg"/>
                        <p className="text-sm text-gray-500/90">Try for Free. No Credit Card Required.</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export function WebRecipeQuickGuide() {

    const tools = [
        {
          name: 'Copy Website URL',
          description: 'Access the AI recipe generator and let Zesti know what you want!',
          icon: LinkIcon,
          href: '/about/tools/create-recipe'
        },
        {
          name: 'Paste URL in Zesti',
          description: 'For more control over the recipe, we provide additional settings so you can provide clarity!',
          icon: ComputerDesktopIcon,
          href: '/about/tools/social-media-recipe'
        },
        {
          name: 'Go to Recipe Book',
          description: 'All of your created recipes will go to your recipe book where you can use & edit them later',
          icon: BookOpenIcon,
          href: '/about/tools/web-recipe'
        },
      ]
  
    return (
        <Container className={"py-24 lg:py-36 px-5 animate-fadeIn"}>
            <div className="w-full max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col justify-center lg:justify-between items-center gap-8 lg:gap-8 text-center lg:text-left">
                    <h1 className="section-title-text-size font-semibold text-gray-700 text-center">
                    USING ZESTI
                    <br />
                    <span className="primary-orange-text-gradient"> AI RECIPE GENERATOR</span>
                    <br />
                    AROUND
                    </h1>
                    <p className="w-full section-desc-text-size text-gray-600 text-center">
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
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}
