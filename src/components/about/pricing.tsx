"use client";

import { Button, InlineButton } from "../shared/button";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Container } from "../shared/container";
import { createPremiumCheckoutSession } from "@/pages/api/stripe/stripePremium";
import { useAuth } from "@/pages/api/auth/auth";
import { Loader } from "../shared/loader";
import { useState } from "react";
import { useRouter } from "next/router";
import { SharedHomeSectionTitle } from "../shared/title";

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function PricingDisplay() {

    const { user, stripeRole } = useAuth();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const router = useRouter()

    const tiers = [
        {
          name: 'Base',
          id: 'tier-basic',
          trial: false,
          priceMonthly: '$0',
          description: "The perfect plan if you're just getting started with Zesti",
          learnhref: "/about/subscription/free",
          features: [
            'Unlimited Recipe Saves',
            '2 Free Video Translations',
        ],
          featured: false,
          checkout: () => {
            setIsLoading(true)
            router.push('/my-recipes')
          }
        },
        {
          name: 'Premium',
          id: 'tier-premium',
          trial: true,
          priceMonthly: '$2.99',
          description: 'Unlock the full potential of Zesti',
          learnhref: "/about/subscription/premium",
          features: [
            'Unlimited Recipe Saves',
            'Instantly Translate Any TikTok Video',
            'AI Cooking Assistant',
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
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 justify-center mt-6 sm:mt-0 mb-12 sm:mb-16"}>
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
                    <div className="bg-gray-900 text-white text-sm lg:text-base rounded-xl pt-1 pb-1 pl-2 pr-2">Free 7-Day Trial</div>
                  </div>
                </div>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span
                    className={classNames(
                      tier.featured ? 'text-gray-900' : 'text-gray-900',
                      'section-title-text-size font-bold tracking-tight'
                    )}
                  >
                    {tier.priceMonthly}
                  </span>
                  <span className={classNames(tier.featured ? 'text-gray-700' : 'text-gray-500', 'lg:text-base')}>/month</span>
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
                <Button isLink={false} buttonType="button" onClick={() => router.push('/auth/login')} text="Sign Up to Get Started" className="mt-4 text-center w-full"/>
                : (isLoading == false && stripeRole !== 'premium') ?
                <Button isLink={false} buttonType="button" onClick={tier.checkout} text="Get Started" className="mt-4 text-center w-full"/>
                : (isLoading == true) ?
                <div className="mt-4 w-full grid">
                  <Loader/>
                </div>
                :
                <Button isLink={false} buttonType="button" onClick={() => {router.push("/nav/profile")}} text="Manage Account" className="text-sm sm:text-base mt-4 text-center w-full"/>
                }
                <InlineButton isLink={true} href={tier.learnhref} text="Learn More" className="flex justify-center mt-4 text-sm"/>
              </div>
            ))}
          </div>
        </div>
        </Container>
      )
}

export function PricingTitle() {

  return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-4"}>
      <div className="bg-white mx-auto">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8"></div>
          <div className="mx-auto max-w-4xl text-center">
            <SharedHomeSectionTitle titleBlack="Choose a plan" desc="Join hundreds of users creating their favorite home cooked meals!"/>
            <p className="mx-auto sm:mb-8 mt-4 sm:mt-6 max-w-xl w-fit pr-3 pl-3 text-center leading-8 border border-primary-main rounded-3xl text-gray-600">
              Try for Free. Cancel anytime.
            </p>
          </div>
        </div>
    </Container>
  )
}