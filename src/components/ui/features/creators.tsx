import { Container } from "@/components/shared/container"
import { MinusSmallIcon, PlusSmallIcon, CheckCircleIcon} from "@heroicons/react/20/solid"
import { Disclosure } from "@headlessui/react"
import { SharedHomeSectionTitle } from "@/components/shared/title"
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
      'Earn 30% Commission on Subscriptions',
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
  

  
  export function CreatorFAQ() {
    const faqs = [
      {
        question: "Do I need a minimum amount of followers or videos to join?",
        answer: "Nope! Plus, we do not plan on implementing any such requirements" ,
      },
      {
        question: "What is the application process like?",
        answer: "We only need basic information so we can review your tiktok account to ensure it involves cooking or recipes!",
      },
      {
        question: "How do I earn money with Zesti?",
        answer: "Earning money is simple! After account approval, you will setup an affiliate account through Zesti so you can start earning 30% per referred subscription every month.",
      },
      {
        question: "How does Zesti Earn Money?",
        answer: "Unlike other platforms, we do not charge users to access already public recipes and we do not charge creators to display their recipes! Instead, Zesti provides a recipe management platform to users where they can save & customize recipes they find!",
      },
      {
        question: "Who owns the recipes on Zesti?",
        answer: "Whoever posted it. All recipes will link back to the original video & back to the original creator page on Zesti.",
      },
      {
        question: "Does Zesti need authorization to access my TikTok?",
        answer: "Yes! This is the most secure way to ensure recipes cannot be taken or displayed by someone other than an account owner.",
      },
      // More questions...
    ]
      return (
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn pb-28"}>
          <div className="bg-white w-full">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <div className="flex flex-col items-center text-center">
                  <SharedHomeSectionTitle titleBlack="Creator FAQ" desc="Get some of the most common questions we are asked answered right away!"/>
                </div>
                <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                  {faqs.map((faq) => (
                    <Disclosure as="div" key={faq.question} className="pt-6">
                      {({ open }) => (
                        <>
                          <dt>
                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                              <span className="text-base font-semibold leading-7">{faq.question}</span>
                              <span className="ml-6 flex h-7 items-center">
                                {open ? (
                                  <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                  <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </dt>
                          <Disclosure.Panel as="dd" className="mt-2 pr-12">
                            <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      )
  }