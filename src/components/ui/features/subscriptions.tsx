import { CheckIcon} from "@heroicons/react/20/solid"

export function PremiumSubscriptionBenefits() {

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
  
    return(
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
    )
}
  
export function FreeSubscriptionBenefits() {

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
  )
}