"use client";
import { Container } from "../shared/container";
import { Paragraph } from "../shared/paragraph";
import React from 'react'
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { Button, InlineBtnLink } from "../shared/button";
import { CheckIcon } from "@heroicons/react/20/solid";
import { createPremiumCheckoutSession } from "@/pages/api/stripe/stripePremium";
import { useAuth } from "@/pages/api/auth/auth";
import { Loader } from "../shared/loader";
import { useState } from "react";
import { useRouter } from "next/router";

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function HolidayDiscountPricingDisplay() {

    const { user, stripeRole } = useAuth();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const router = useRouter()

    const tiers = [
        {
          name: 'Base',
          id: 'tier-basic',
          trial: false,
          priceMonthly: '$0',
          pricingType: '/month',
          description: "The perfect plan if you're just getting started with Zesti",
          learnhref: "/about/subscription/free",
          features: [
            'Save 3 recipes per month',
            'Save TikTok & YouTube recipes',
            'Max Video Length: 5 Minutes',
            'AI Recipe Generator',
            'Customize Recipes',
        ],
          featured: false,
          checkout: () => {
            setIsLoading(true)
            router.push('/dashboard')
          }
        },
        {
          name: 'Premium',
          id: 'tier-premium',
          trial: true,
          priceMonthly: '$2.99',
          pricingType: 'first month',
          description: 'Unlock the full potential of Zesti',
          learnhref: "/about/subscription/premium",
          features: [
            'Save 30 recipes per month',
            'Save TikTok & YouTube recipes',
            'Max Video Length: 15 Minutes',
            'Unlimited AI Generated Recipes',
            'AI Cooking Support',
            'Customize Recipes',
            'Ad-Free'
          ],
          featured: true,
          checkout: () => {
            setIsLoading(true)
            createPremiumCheckoutSession(user?.uid)
          }
        },
      ]
    

    return (
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 justify-center mt-6 sm:mt-0 mb-12 sm:mb-16 animate-fadeIn"}>
        <div className="relative isolate bg-white lg:px-8">
          <div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-y-6 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
            {tiers.map((tier: any, tierIdx: number) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.featured ? 'relative bg-white bg-opacity-90 border border-primary-main' : 'bg-gray-50 sm:mx-8 lg:mx-0',
                  tier.featured
                    ? ''
                    : tierIdx === 0
                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                    : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
                  'rounded-3xl pt-8 pl-8 pr-8 pb-4 ring-1 ring-gray-900/10 '
                )}
              >
                <div className="flex justify-between items-center">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.featured ? 'text-primary-main' : 'text-gray-900',
                      'text-base font-semibold leading-7'
                    )}
                  >
                    {tier.name} 
                  </h3>
                  <div className={tier.trial == true ? `` : `hidden`}>
                    <div className="bg-gray-900 text-white rounded-xl pt-1 pb-1 pl-2 pr-2">Free 7-Day Trial</div>
                  </div>
                </div>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span
                    className={classNames(
                      tier.featured ? 'text-gray-900' : 'text-gray-900',
                      'text-5xl font-bold tracking-tight'
                    )}
                  >
                    {tier.priceMonthly}
                  </span>
                  <span className={classNames(tier.featured ? 'text-gray-700' : 'text-gray-500', 'text-base')}>{tier.pricingType}</span>
                </p>
                <p className={classNames(tier.featured ? 'text-gray-700' : 'text-gray-600', 'mt-6 text-base leading-7')}>
                  {tier.description}
                </p>
                <ul
                  role="list"
                  className={classNames(
                    tier.featured ? 'text-gray-700' : 'text-gray-600',
                    'mt-8 space-y-3 text-sm leading-6 sm:mt-10'
                  )}
                >
                  {tier.features.map((feature: any) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={classNames(tier.featured ? 'text-color-alt-green' : 'text-color-alt-green', 'h-6 w-5 flex-none')}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                {!user ?
                <Button buttonType="button" onClick={() => router.push('/login')} text="Sign Up to Get Started" className="mt-4 text-center w-full"/>
                : (stripeRole == null && isLoading == false && stripeRole !== 'premium') ?
                <Button buttonType="button" onClick={tier.checkout} text="Get Started" className="mt-4 text-center w-full"/>
                : (isLoading == true) ?
                <div className="mt-4 w-full grid">
                  <Loader/>
                </div>
                :
                <Button buttonType="button" onClick={() => {window.open(`${process.env.NEXT_PUBLIC_STRIPE_NO_CODE_PORATL}`)}} text="Manage Subscription" className="text-sm sm:text-base mt-4 text-center w-full"/>
                }
                <InlineBtnLink href={tier.learnhref} text="Learn More" className="flex justify-center mt-4 text-sm"></InlineBtnLink>
              </div>
            ))}
          </div>
        </div>
        </Container>
      )
}

export function HolidayDiscountHero(){
    return(
        <section className="relative pt-24 lg:pt-36">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
                <div className="space-y-4 relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2 p-8 md:p-16">
                    <div className="inline-flex items-center border border-gray-300 rounded-3xl p-2 space-x-1">
                        <div className="text-black font-bold text-sm">Powered By OpenAI</div>
                        <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
                    </div>
                    <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">          
                        <span className="text-black">Get</span>
                        <span className="primary-orange-text-gradient"> 50% Off </span> 
                        <span className="text-black">Zesti Premium</span>
                    </h1>
                    <Paragraph className="text-lg mt-8 text-black">
                        To celebrate the holidays, Zesti is offering half off your first month of Premium 
                    </Paragraph>
                    <p className="text-gray-600 text-xl border p-2 rounded-3xl">Use Code: <span className="text-gray-700 font-bold font-sans text-2xl"> DEC25 </span> at checkout</p>
                </div>
            </Container>
        </section>
    )
}

