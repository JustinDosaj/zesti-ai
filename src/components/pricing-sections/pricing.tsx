"use client";

import { Button } from "../shared/button";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Container } from "../shared/container";
import { createPremiumCheckoutSession } from "@/pages/api/stripe/stripePremium";
import { useAuth } from "@/pages/api/auth/auth";
import { Loader } from "../shared/loader";
import { useState } from "react";
import { useRouter } from "next/router";

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
          href: '#',
          priceMonthly: '$0',
          description: "The perfect plan if you're just getting started with our product.",
          features: [
            '5 Monthly Generated Recipes', 
            'Save up to 5 recipes',
            'Edit Recipes',
            'Chef Chat Assistant' 
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
          href: '#',
          priceMonthly: '$2.99',
          description: 'Dedicated support and infrastructure for your company.',
          features: [
            '30 Monthly Generated Recipes',
            'Unlimited Recipe Saves',
            'Cooking Video Conversion Tool',
            'Website Recipe Transformation Tool',
            'Edit Recipes',
            'Chef Chat Assistant'
          ],
          featured: true,
          checkout: () => {
            setIsLoading(true)
            createPremiumCheckoutSession(user?.uid)
          }
        },
      ]
    

    return (
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 justify-center mb-12 sm:mb-16"}>
        <div className="relative isolate bg-white px-6 lg:px-8">
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
                  'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
                )}
              >
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.featured ? 'text-primary-main' : 'text-gray-900',
                    'text-base font-semibold leading-7'
                  )}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span
                    className={classNames(
                      tier.featured ? 'text-gray-900' : 'text-gray-900',
                      'text-5xl font-bold tracking-tight'
                    )}
                  >
                    {tier.priceMonthly}
                  </span>
                  <span className={classNames(tier.featured ? 'text-gray-700' : 'text-gray-500', 'text-base')}>/month</span>
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
                <Button buttonType="button" onClick={() => {window.open(`${process.env.NEXT_PUBLIC_STRIPE_NO_CODE_PORATL}`)}} text="Manage Subscription" className="mt-4 text-center w-full"/>
                }
              </div>
            ))}
          </div>
        </div>
        </Container>
      )
}

export function PricingTitle() {

  return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
      <div className="bg-white py-24 sm:py-32 p-2 mx-auto">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8"></div>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Choose a plan
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
              Discovering and cooking new recipes has never been easier
            </p>
            <p className="mx-auto mt-2 max-w-xl w-fit pr-2 pl-2 text-center text-sm leading-8 text-gray-600 border rounded-2xl font-semibold">
              Price shown in local currency at checkout
            </p>
          </div>
        </div>
    </Container>
  )
}