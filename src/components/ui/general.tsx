import { Container } from "@/components/shared/container"
import { ChatBubbleLeftIcon, StarIcon, BookOpenIcon, PuzzlePieceIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/shared/button"
import Image from "next/image"
import { useRouter } from "next/router"
import { useAuth } from "@/pages/api/auth/auth"


interface HeroProps {
  titleStart?: string,
  titleEnd?: string,
  description?: string,
  button?: () => void,
  buttonName: string,
  imageSrc: string,
}

export function SharedHero({titleStart, titleEnd, description, button, buttonName, imageSrc}: HeroProps) {

  const router = useRouter()
  const { user } = useAuth()

  return(
      <Container className="flex flex-col lg:flex-row items-center justify-between pt-36 px-5 space-x-4 xl:pt-48 animate-fadeIn">
        <div className="flex lg:w-1/2 flex-col gap-6 lg:gap-8">
          <div className="inline-flex w-fit mx-auto lg:mx-0 items-center border border-gray-300 rounded-3xl p-2 space-x-1 ">
              <div className="text-black font-bold text-sm">Powered By OpenAI</div>
              <Image width={20} height={20} src="/images/openaipng.png" alt="Powered by OpenAI Chatgpt AI Technology Tool" className=" "/>
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

            {/* user ?
            <Button isLink={false} text="Apply to Join" buttonType="button" onClick={() => router.push('/account') }/>
            :
            <Button isLink={false} text="Apply to Join" buttonType="button" onClick={() => router.push('/auth/login') }/> 
            */}
          </div>
        </div>


          <div className="hidden lg:block w-1/2 bg-transparent rounded-lg">
            <Image src={imageSrc} alt="Profile" height={2058} width={2150} className="object-fit" />
          </div> {/* Placeholder for the illustration */}
        
      </Container>
  )
}

interface Feature {
  name: string,
  description: string,
  icon: any,
}
  
interface ThreeBoxFeatureProps {
  type: 'home' | 'assistant',
  titleStart: string,
  titleEnd: string,
  desc: string,
}
  
export function ThreeBoxFeature({type, titleStart, titleEnd, desc}: ThreeBoxFeatureProps) {

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
        ]
    }

    const features: Feature[] = FeatureTypes[type]

    return(
        <Container className={" px-5 animate-fadeIn"}>
            <div className="w-full max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-8 lg:gap-14 text-center lg:text-left">
                    <p className="section-title-text-size font-semibold text-gray-700 lg:w-1/3 uppercase">
                    {titleStart}
                    <br />
                    <span className="primary-orange-text-gradient uppercase"> {titleEnd} </span>
                    </p>
                    <p className="w-full lg:w-1/2 section-desc-text-size text-gray-600">
                    {desc}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-10">
                    {features.map((feature) => (
                    <div key={feature.name} className="flex flex-col items-start p-6 rounded-3xl gap-y-2 bg-white orange-border-shadow">
                        <feature.icon className="h-12 w-12 bg-orange-100 p-2 rounded-2xl text-primary-main" aria-hidden="true" />
                        <div className="flex flex-col gap-3">
                            <p className="text-xl font-semibold text-gray-800 mb-2">{feature.name}</p>
                            <p className="text-base text-gray-600 flex-grow">{feature.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}