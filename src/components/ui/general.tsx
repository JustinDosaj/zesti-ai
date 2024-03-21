import { Container } from "@/components/shared/container"
import { ChatBubbleLeftIcon, StarIcon, BookOpenIcon, PuzzlePieceIcon, UserIcon, CheckIcon, DocumentTextIcon, SpeakerWaveIcon, EyeIcon } from "@heroicons/react/20/solid"
import { Button, InlineButton } from "@/components/shared/button"
import { BeakerIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/router"
import { useAuth } from "@/pages/api/auth/auth"
import getConfig from "next/config"
import { MinusSmallIcon, PlusSmallIcon} from "@heroicons/react/20/solid"
import { Disclosure } from "@headlessui/react"
import { SharedHomeSectionTitle } from "@/components/shared/title"


interface HeroProps {
  titleStart?: string,
  titleEnd?: string,
  description?: string,
  button?: () => void,
  buttonName: string,
  imageSrc?: string,
}

export function SharedHero({titleStart, titleEnd, description, button, buttonName, imageSrc}: HeroProps) {

  const { publicRuntimeConfig } = getConfig();

  if (!imageSrc) return (
    <Container className="flex flex-col items-center justify-between pt-36 px-5 space-x-4 xl:pt-48 animate-fadeIn">
      <div className="flex flex-col gap-6 lg:gap-8">
          <div className="flex flex-col gap-8 text-center">
            <h1 className="section-title-text-size xl:text-6xl font-bold text-gray-800">
              <span className="text-gray-700"> {titleStart} </span>
              <span className="primary-orange-text-gradient"> {titleEnd} </span>
              <br />
            </h1>
            <p className="section-desc-text-size font-medium text-gray-600">
              {description}
            </p>
          </div>
          <div className="grid justify-center text-left space-y-1">
            <Button isLink={false} text={buttonName} buttonType="button" onClick={button}/>
          </div>
      </div>
    </Container>
  )

  return(
      <Container className="flex flex-col lg:flex-row items-center justify-between pt-36 px-5 space-x-4 xl:pt-48 animate-fadeIn">
        <div className="flex lg:w-1/2 flex-col gap-6 lg:gap-8">
          <div className="inline-flex w-fit mx-auto lg:mx-0 items-center border border-gray-300 rounded-3xl p-2 space-x-1 ">
              <BeakerIcon className="text-black h-4 w-4"/>
              <div className="text-black font-bold text-sm">{`beta v${publicRuntimeConfig?.version}`}</div>
          </div>
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <h1 className="section-title-text-size xl:text-6xl font-bold text-gray-800">
              <span className="text-gray-700"> {titleStart} </span>
              <span className="primary-orange-text-gradient"> {titleEnd} </span>
              <br />
            </h1>
            <p className="section-desc-text-size font-medium text-gray-600">
              {description}
            </p>
          </div>
          <div className="grid justify-center lg:justify-start text-left space-y-1">
            <Button isLink={false} text={buttonName} buttonType="button" onClick={button}/>
          </div>
        </div>
        <div className="hidden lg:block bg-transparent rounded-lg">
          <img src={imageSrc} alt="Profile" height={550} width={550} className="object-fit" />
        </div>
      </Container>
  )
}

interface Feature {
  name: string,
  description: string,
  icon: any,
  href?: string,
  linkName?: string,
}
  
interface ThreeBoxFeatureProps {
  type: 'home' | 'assistant' | 'apply' | 'howitworks',
  titleStart: string,
  titleEnd: string,
  desc: string,
}
  
export function ThreeBoxFeature({type, titleStart, titleEnd, desc}: ThreeBoxFeatureProps) {

    const router = useRouter()
    const { user, isLoading, userData } = useAuth()

    const FeatureTypes = {
        home: [
            {
                name: 'Search for Recipe or Creator',
                description: 'Find recipes to try from your favorite tiktok chefs',
                icon: StarIcon,
            },
            {
                name: 'Save & Customize',
                description: 'Love the recipe? Save it for later and make changes just for you',
                icon: BookOpenIcon,
            },
            {
                name: 'AI Cooking Assistant',
                description: 'Answer cooking questions instantly & get help with the recipe your making',
                icon: ChatBubbleLeftIcon,
                href: '/about/solutions/cooking-assistant',
                linkName: 'Learn More'
            },
        ],
        assistant: [
            {
                name: 'Step-by-Step',
                description: 'Zesti AI knows what recipe you are cooking and can help answer questions about any step or ingredient',
                icon: StarIcon,
            },
            {
                name: 'Modern Problem, Modern Solution',
                description: 'No more getting stuck because you are missing an ingredient or skipped a step. Zesti will help you get back on track!',
                icon: PuzzlePieceIcon,
            },
            {
                name: 'Real-Time Answers',
                description: 'Get stuck? Make a mistake? No worries, Zesti will provide real time answers for you!',
                icon: ChatBubbleLeftIcon,
            },
        ],
        apply: [
          {
              name: 'Apply for Program',
              description: 'Create your account, verify your tiktok, and submit your application information through promotekit',
              icon: UserIcon,
              href: user && !isLoading ? '/account' : '/auth/login',
              linkName: user && !isLoading ? "Apply Now" : "Create Account"
          },
          {
              name: 'Upload Recipes',
              description: 'Copy & paste your tiktok video links into Zesti to add an AI transcribed recipe to your collection page',
              icon: CheckIcon,
          },
          {
              name: 'Share Your Collection',
              description: 'Creators have unique affiliate links with Zesti that is used to share your recipe collection with followers',
              icon: DocumentTextIcon,
          },
        ],
        howitworks: [
          {
              name: 'Get Video Audio',
              description: 'Users paste video links into Zesti and we capture the audio as text',
              icon: SpeakerWaveIcon,
          },
          {
              name: 'AI Transcription',
              description: 'AI turns the video audio into a recipe that is recognizable by everyone',
              icon: BookOpenIcon,
          },
          {
              name: 'Completed Recipe',
              description: 'Recipes are available on public pages or inside your own recipe book on Zesti',
              icon: EyeIcon,
          },
        ],
    }

    const features: Feature[] = FeatureTypes[type]

    return(
        <Container className={" px-5 animate-fadeIn"}>
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid justify-center items-center text-center lg:text-left">
                    <p className="section-title-text-size font-semibold text-gray-700">
                    {titleStart}
                    <span className="primary-orange-text-gradient"> {titleEnd} </span>
                    </p>
                </div>
                <p className="mt-6 w-full text-center section-desc-text-size text-gray-600">
                    {desc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-12">
                    {features.map((feature) => (
                    <div key={feature.name} className="flex flex-col items-start p-6 rounded-3xl gap-y-2 bg-white orange-border-shadow">
                        <feature.icon className="h-12 w-12 bg-orange-100 p-2 rounded-2xl text-primary-main" aria-hidden="true" />
                        <div className="flex flex-col mt-2 gap-2">
                            <p className="text-xl font-semibold text-gray-800">{feature.name}</p>
                            <p className="text-base text-gray-600 flex-grow">{feature.description}</p>
                            { feature.href ? 
                            <InlineButton text={feature.linkName || ''} href={feature.href} isLink={false}/>
                            :
                            <div></div>
                            }
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

interface FAQ {
    question: string,
    answer: string,
  }

interface FAQProps {
    type: 'user' | 'creator',
    title?: string,
    desc?: string,
}

export function FAQ({type, title, desc}: FAQProps) {

    const FAQTypes = {
        user: [
            {
              question: "What is Zesti AI",
              answer: "Zesti AI is a platform created to help make tiktok recipes readily available so you no longer have to pause or rewind a dozen times for a recipe. We do this by partnering with creators so they can publish their recipe showcase in text format. Users can freely view these existing recipes or use the Zesti AI transcripton tool if a recipe they want is not published yet.",
            },
            {
              question: "What is the Zesti AI transcription tool?",
              answer: "This is a feature that allows users to copy a video link directly from tiktok and paste it into the tool to instantly receive a recipe in text format. This tool is available to all users and is free to use and is accessible from under the search bar & search results",
            },
            {
              question: "How much does Zesti cost?",
              answer: "The base version of zesti if free and allows you the following: browse existing recipes, unlimited saves to your cookbook, 2 recipe transcriptions per month. We do offer a paid version that unlocks additional features such as increased transcriptions per month and Zesti AI chat assistant.",
            },
            {
              question: "What if a recipe I want is not on Zesti yet?",
              answer: "If you cannot find a recipe with the search bar, the transcription tool is available for you to use. Simply copy the video link from tiktok and paste it into the tool to recieve a text version of the recipe.",
            },
            {
              question: "I have more questions, how can I contact you?",
              answer: "You can visit the contact page and send us a message!",
            },
        ],
        creator: [
            {
                question: "Do I need a minimum amount of followers or videos to join?",
                answer: "Currently we have no minimums to join our affiliate program, however the content must be cooking related." ,
            },
            {
                question: "How do I apply to Zesti?",
                answer: "You will need to create an account, verify your tiktok, then submit basic information. This can all be done from your account settings page while logged in.",
            },
            {
                question: "How do I earn money with Zesti?",
                answer: "Zesti offers approved creators 30% of the subscription fee per month for every user that signs up through their unique affiliate link!",
            },
            {
                question: "How is Zesti different?",
                answer: "Unlike other platforms, Zesti looks to be more of a partner than a service. We believe social media recipes contribute largely to inspiring people to cook & our tools can help get them started. We hope to follow this belief into creating a culinary platform for everyone.",
            },
            {
                question: "Who owns the recipes on Zesti?",
                answer: "All of the recipes on Zesti are owned by the original creator. Zesti does not claim or take ownership of any recipes posted by creators. We provide a platform for creators to share their recipes with their followers while offering premium tools to assist people in their culinary journeys.",
            },
            {
                question: "Why does Zesti need access to my Tiktok account?",
                answer: "Verifying your Tiktok account helps us prevent copy cats. By verifying your account, we can prevent other people from posting your recipes on a public Zesti Page.",
            },
        ]
    }

    const faqs: FAQ[] = FAQTypes[type]

    return (
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
      <div className="bg-white w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <div className="flex flex-col items-center text-center">
              <SharedHomeSectionTitle titleBlack={title} desc={desc}/>
            </div>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-700">
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