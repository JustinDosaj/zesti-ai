import { Container } from "@/components/shared/container"
import { ChatBubbleLeftIcon, StarIcon, BookOpenIcon, PuzzlePieceIcon, SpeakerWaveIcon, EyeIcon } from "@heroicons/react/20/solid"
import { Button, InlineButton } from "@/components/shared/button"
import { useRouter } from "next/router"
import { MinusSmallIcon, PlusSmallIcon} from "@heroicons/react/20/solid"
import { Disclosure } from "@headlessui/react"
import { TitleSection } from "../shared/title"
import { Paragraph } from "../shared/paragraph"


interface HeroProps {
  titleStart?: string,
  titleEnd?: string,
  description?: string,
  button?: () => void,
  buttonName: string,
  imageSrc?: string,
}

export function SharedHero({titleStart, titleEnd, description, button, buttonName}: HeroProps) {

  return (
    <Container className="flex flex-col items-center justify-between pt-8 lg:pt-16 px-5 space-x-4 animate-fadeIn">
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
}

interface Feature {
  name: string,
  description: string,
  icon: any,
  href?: () => void,
  linkName?: string,
}
  
interface ThreeBoxFeatureProps {
  type: 'home' | 'assistant' | 'howitworks',
  titleStart: string,
  titleEnd: string,
  desc: string,
}
  
export function ThreeBoxFeature({type, titleStart, titleEnd, desc}: ThreeBoxFeatureProps) {

    const router = useRouter()

    const FeatureTypes = {
        home: [
            {
                name: 'Search for Recipe or Creator',
                description: 'Find recipes from your favorite tiktok chefs',
                icon: StarIcon,
            },
            {
                name: 'Save Recipes',
                description: 'Save recipes to your account so you can easily find them later',
                icon: BookOpenIcon,
            },
            {
                name: 'AI Cooking Assistant',
                description: 'Get chat assistant help for any recipe you are cooking',
                icon: ChatBubbleLeftIcon,
                href: () => router.push('/about/solutions/cooking-assistant'),
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
        <Container className={"px-5 animate-fadeIn"}>
            <div className="w-full max-w-7xl mx-auto space-y-4">
                <div className="grid justify-center items-center text-center lg:text-left">
                    <p className="section-title-text-size font-semibold text-gray-700">
                    {titleStart}
                    <span className="primary-orange-text-gradient"> {titleEnd} </span>
                    </p>
                </div>
                <Paragraph className="text-center text-gray-600">
                  {desc}
                </Paragraph>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-12">
                    {features.map((feature) => (
                    <div key={feature.name} className="flex flex-col items-start p-6 rounded-3xl gap-y-2 bg-white orange-border-shadow">
                        <feature.icon className="h-12 w-12 bg-orange-100 p-2 rounded-2xl text-primary-main" aria-hidden="true" />
                        <div className="flex flex-col mt-2 gap-2">
                            <p className="text-xl font-semibold text-gray-800">{feature.name}</p>
                            <p className="text-base text-gray-600 flex-grow">{feature.description}</p>
                            { feature.href ? 
                            <InlineButton text={feature.linkName || ''} onClick={feature.href} isLink={false} className="text-left"/>
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
    answer: any,
  }

interface FAQProps {
    type: 'user',
    title?: string,
    desc?: string,
}

export function FAQ({type, title, desc}: FAQProps) {

    const FAQTypes = {
        user: [
            {
              question: "Zesti Disclaimer",
              answer: "Zesti AI is currently in Beta. Not all recipe videos may successfully transcribe & results of successful transcriptions may vary. You can contact us with any further questions. Additionally, Zesti does not currently support instagram albums.",
            },
            {
              question: "What is Zesti AI?",
              answer: "Zesti AI is a platform created to help make tiktok recipes readily available so you no longer have to pause or rewind multiple times for a recipe",
            },
            {
              question: "How does Zesti work?",
              answer: "Zesti uses AI tools to transcribe the audio from tiktok cooking videos into a format that is easily readable by everyone.",
            },
            {
              question: "What platforms does Zesti support?",
              answer: "Currently TikTok & Instagram is the only platform supported by Zesti right now while we are currently working on integrating YouTube & other platforms!",
            },
            {
              question: "What are the requirments to save a recipe?",
              answer: "To transcribe a recipe, the instructions and ingredient list must be available via the video audio, comments, title or description. If no recipe ia found in these, Zesti AI is trained to reject the video.",
            },
            {
              question: "How much does Zesti cost?",
              answer: "You can use Zesti for free! Simply create an account, then paste the link to a tiktok video to get the recipe instantly. Optionally, you can search already existing recipes.",
            },
            {
              question: "I have more questions, how can I contact you?",
              answer: "You can visit the contact page and send us a message!",
            },
        ],
    }

    const faqs: FAQ[] = FAQTypes[type]

    return (
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
      <div className="bg-white w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <div className="flex flex-col items-center text-center">
              <TitleSection titleBlack={title} desc={desc}/>
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