"use client";

import { Button } from "../shared/button";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Container } from "../shared/container";
import { createBaseCheckoutSession } from "@/pages/api/stripe/stripeBase";
import { createEssentialCheckoutSession } from "@/pages/api/stripe/stripeEssential";
import { createPremiumCheckoutSession } from "@/pages/api/stripe/stripePremium";
import { useAuth } from "@/pages/api/auth/auth";

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
  }


export function PricingList() {

  const { user, stripeRole } = useAuth();

  const tiers = [
    {
      name: 'Base',
      id: 'tier-freelancer',
      href: '#',
      priceMonthly: '$2.99',
      description: 'Best for users who try new recipes once in a while, but not too often.',
      features: [
        '10 Recipe Transcriptions Per Month',
        'Limited to short videos (60s or less)'
      ],
      mostPopular: false,
      checkout: () => {createBaseCheckoutSession(user?.uid)}
    },
    {
      name: 'Essential',
      id: 'tier-startup',
      href: '#',
      priceMonthly: '$7.99',
      description: 'Best for users that find new recipes fairly frequently and want to try them for later.',
      features: [
        '30 Recipe Transcriptions Per Month',
        '10 Minute Max Video Upload'
      ],
      mostPopular: true,
      checkout: () => {createEssentialCheckoutSession(user?.uid)}
    },
    {
      name: 'Premium',
      id: 'tier-enterprise',
      href: '#',
      priceMonthly: '$14.99',
      description: 'Best for users who cook frequently, and constantly enjoy trying new recipes they find online.',
      features: [
        'Unlimited Transcriptions',
        '10 Minute Max Video Upload'
      ],
      mostPopular: false,
      checkout: () => {createPremiumCheckoutSession(user?.uid)}
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
            New users get 10 free tokens (No Credit Card Required).
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
                {stripeRole == null ?
                <Button buttonType="button" onClick={tier.checkout} text="Subscribe" className="mt-4"/>
                :
                <Button buttonType="button" onClick={() => {window.open("https://billing.stripe.com/p/login/test_6oEeY05261fY7a8000")}} text="Manage Subscription" className="mt-4"/>
                }
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-gray-600">
            <p className="border w-full p-2 rounded-2xl text-xs md:text-base">
              1 Video Transcription = 10 Token
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}