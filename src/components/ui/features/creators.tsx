import { CheckCircleIcon} from "@heroicons/react/20/solid"
import Link from "next/link"

interface CreatorCTAProps {
    isHome: boolean,
    title: string,
  }
  
export function CreatorCTA({isHome, title}: CreatorCTAProps) {
  const benefits = [
    'Zero Fees',
    'Showcase Your Recipes',
    'Transcribe Recipes Using AI',
    'Get Discovered Through Zesti',
    'Earn 50% Commission on Subscriptions',
  ]
  
  return(
      <div className="relative isolate p-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-transparent rounded-3xl orange-border-shadow px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
            <img
              className="h-96 w-full flex-none rounded-2xl object-cover lg:aspect-square lg:h-auto lg:max-w-sm"
              src="/images/no-bg-iso.png"
              alt=""
            />
            <div className="w-full flex-auto">
              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-700 sm:text-4xl">{title}</h2>
              <p className="mt-6 leading-8 text-gray-600 section-desc-text-size">
                Love posting your videos to TikTok? Join our creator program to put your recipes on display for all your viewers!
              </p>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-gray-600 sm:grid-cols-2"
              >
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-x-3">
                    <CheckCircleIcon className="h-7 w-5 flex-none text-green-600" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex justify-end">
                { isHome == true ?
                <Link href="/about/creator" className="text-sm font-semibold leading-6 text-primary-main">
                  Learn More <span aria-hidden="true">&rarr;</span>
                </Link>
                :
                <Link href="/account" className="text-sm font-semibold leading-6 text-primary-main">
                  Apply Now <span aria-hidden="true">&rarr;</span>
                </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  
  )
}
