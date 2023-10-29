"use client";

import { Button } from "../shared/button";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Container } from "../shared/container";
import { createBaseCheckoutSession } from "@/pages/api/stripe/stripeBase";
import { createEssentialCheckoutSession } from "@/pages/api/stripe/stripeEssential";
import { createPremiumCheckoutSession } from "@/pages/api/stripe/stripePremium";
import { useAuth } from "@/pages/api/auth/auth";
import { Loader } from "../shared/loader";
import { useState } from "react";

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
  }


export function PricingList() {

  const { user, stripeRole, login } = useAuth();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);


  const tiers = [
    {
      name: 'Base',
      id: 'tier-freelancer',
      href: '#',
      priceMonthly: '$1.99',
      description: 'Best for users who try new recipes once in a while, but not too often.',
      features: [
        '5 Recipes Per Month',
        '5 Minute Max Video Upload'
      ],
      mostPopular: false,
      checkout: () => {
        setIsLoading(true)
        createBaseCheckoutSession(user?.uid)
      }
    },
    {
      name: 'Essential',
      id: 'tier-startup',
      href: '#',
      priceMonthly: '$4.99',
      description: 'Best for users that find new recipes fairly frequently and want to try them for later.',
      features: [
        '15 Recipes Per Month',
        '10 Minute Max Video Upload'
      ],
      mostPopular: true,
      checkout: () => {
        setIsLoading(true)
        createEssentialCheckoutSession(user?.uid)
      }
    },
    {
      name: 'Premium',
      id: 'tier-enterprise',
      href: '#',
      priceMonthly: '$9.99',
      description: 'Best for users who cook frequently, and constantly enjoy trying new recipes they find online.',
      features: [
        '30 Recipes Per Month',
        '20 Minute Max Video Upload'
      ],
      mostPopular: false,
      checkout: () => {
        setIsLoading(true)
        createPremiumCheckoutSession(user?.uid)
      }
    },
  ]

  return (
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
      <div className="bg-white py-24 sm:py-32 p-2">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Pricing
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Try for free. (No Credit Card Required). Cancel anytime.
          </p>
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier, tierIdx) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                  tierIdx === 0 ? 'lg:rounded-r-none' : '',
                  tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                  'flex flex-col justify-between rounded-3xl bg-white p-4 first-letter md:p-8 ring-1 ring-gray-200 xl:p-10'
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      id={tier.id}
                      className={classNames(
                        tier.mostPopular ? 'text-primary-main' : 'text-gray-900',
                        'text-lg font-semibold leading-8'
                      )}
                    >
                      {tier.name}
                    </h3>
                    {tier.mostPopular ? (
                      <p className="rounded-full bg-primary-main/10 md:px-2.5 py-1 text-xs font-semibold leading-5 text-primary-main">
                        Most popular
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-color-alt-green" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {!user ?
                <Button buttonType="button" onClick={login} text="Sign up to Subscribe" className="mt-4"/>
                : (stripeRole == null && isLoading == false) ?
                <Button buttonType="button" onClick={tier.checkout} text="Subscribe" className="mt-4"/>
                : (isLoading == true) ?
                <div className="mt-4 w-full grid">
                  <Loader/>
                </div>
                :
                <Button buttonType="button" onClick={() => {window.open(`${process.env.NEXT_PUBLIC_STRIPE_NO_CODE_PORATL}`)}} text="Manage Subscription" className="mt-4"/>
                
              }
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}