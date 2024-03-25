import { CheckIcon} from "@heroicons/react/20/solid"

export function PremiumSubscriptionBenefits() {

    const features = [
      {
        name: 'Freely Access All Recipes on Zesti',
        description: 'Freely search recipes that creators have posted for your convenience. No more pausing or rewinding',
      },
      {
        name: 'Save Unlimited Recipes',
        description: 'There is no limit to the amount of recipes you can save to your Zesti account',
      },
      {
        name: 'AI Cooking Assistant',
        description: 'Chat with Zesti AI while cooking and get general cooking help or ask specific questions about the recipe your making',
      },
      {
        name: 'Ad-Free',
        description: 'Enjoy an ad free experience of Zesti AI with premium',
      },
      {
        name: 'Support Creators',
        description: 'Upgrade to premium via a creator recipe collection and they will receive a portion of the subscription fee',
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
                      Get maximum access to Zesti AI and unlock key features to make your life in the kitchen easier
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
  