import { Container } from "@/components/shared/container"
import { ChatBubbleLeftIcon, StarIcon, BookOpenIcon, PuzzlePieceIcon, UserIcon, CheckIcon, DocumentTextIcon, VideoCameraIcon, SpeakerWaveIcon, EyeIcon } from "@heroicons/react/20/solid"
import { Button, InlineButton } from "@/components/shared/button"
import { BeakerIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/router"
import { useAuth } from "@/pages/api/auth/auth"
import getConfig from "next/config"


interface HeroProps {
  titleStart?: string,
  titleEnd?: string,
  description?: string,
  button?: () => void,
  buttonName: string,
  imageSrc: string,
}

export function SharedHero({titleStart, titleEnd, description, button, buttonName, imageSrc}: HeroProps) {

  const { publicRuntimeConfig } = getConfig();

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
          </div> {/* Placeholder for the illustration */}
        
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
              name: 'Start Application',
              description: 'Create an account with Zesti then go to your account settings to begin',
              icon: UserIcon,
              href: user && !isLoading ? '/account' : '/auth/login',
              linkName: user && !isLoading ? "Apply Now" : "Create Account"
          },
          {
              name: 'Verify TikTok Account',
              description: 'To ensure you own the account, Zesti will request account information directly from TikTok',
              icon: CheckIcon,
          },
          {
              name: 'Submit Application',
              description: 'Finally fill out your affiliate information with promotekit to submit your application',
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