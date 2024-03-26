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

interface SupportButton {
  setIsOpen?: any,
  size?: 'small' | 'large'
  name?: string 
}

export function SupportCreatorButton({setIsOpen, size, name}: SupportButton) {
  return(
      <button onClick={() => setIsOpen(true)} className="flex flex-col items-center justify-center">
        <svg className={size == 'small' ? `h-7 w-7` : size == 'large' ? `h-12 w-12` : `h-10 w-10`} 
        viewBox="-21 -48 682.66566 682" width="682pt" xmlns="http://www.w3.org/2000/svg" id="fi_1383929"><path d="m614.335938 285.277344c-27.167969 49.671875-69.308594 89.328125-110.058594 127.667968-7.1875 6.757813-13.960938 13.132813-20.707032 19.601563-25.28125 24.285156-50.890624 47.691406-75.644531 70.324219-24.582031 22.480468-49.996093 45.710937-74.941406 69.667968l-12.984375 12.460938-12.984375-12.460938c-24.945313-23.957031-50.359375-47.1875-74.941406-69.667968-24.753907-22.632813-50.359375-46.039063-75.644531-70.324219-6.746094-6.46875-13.519532-12.84375-20.707032-19.601563-40.753906-38.339843-82.890625-77.996093-110.058594-127.667968-35.128906-64.234375-34.152343-135.550782 2.660157-195.699219 45.679687-74.578125 109.320312-90.636719 154.671875-90.988281 38.726562-.273438 77.007812 10.824218 110.773437 32.117187l26.230469 16.429688 26.277344-16.453125c33.71875-21.269532 72.046875-32.394532 110.722656-32.09375 45.351562.351562 108.996094 16.410156 154.675781 90.988281 36.808594 60.148437 37.785157 131.464844 2.660157 195.699219zm0 0" fill="#ff7a53"></path><path d="m614.335938 285.277344c-27.167969 49.671875-69.308594 89.328125-110.058594 127.667968-7.1875 6.757813-13.960938 13.132813-20.707032 19.601563-25.28125 24.285156-50.890624 47.691406-75.644531 70.324219-24.582031 22.480468-49.996093 45.710937-74.941406 69.667968l-12.984375 12.460938v-537.863281l26.277344-16.453125c33.71875-21.269532 72.046875-32.394532 110.722656-32.09375 45.351562.351562 108.996094 16.410156 154.675781 90.988281 36.808594 60.148437 37.785157 131.464844 2.660157 195.699219zm0 0" fill="#fd5016"></path><path d="m487.871094 269.867188c0 92.558593-75.3125 167.871093-167.871094 167.871093s-167.871094-75.3125-167.871094-167.871093c0-92.5625 75.308594-167.875 167.871094-167.875s167.871094 75.3125 167.871094 167.875zm0 0" fill="#ffe670"></path><path d="m487.871094 269.867188c0 92.558593-75.3125 167.871093-167.871094 167.871093v-335.746093c92.558594 0 167.871094 75.3125 167.871094 167.875zm0 0" fill="#ffdf48"></path><path d="m379.320312 301.25c0 8.480469-1.597656 15.652344-4.773437 21.519531-3.183594 5.871094-7.382813 10.609375-12.617187 14.207031-5.226563 3.609376-11.238282 6.222657-18.023438 7.847657-1.738281.410156-3.488281.777343-5.25 1.089843v28.300782h-37.488281v-29.03125c-4.136719-.761719-8.199219-1.722656-12.183594-2.910156-5.511719-1.609376-10.851563-3.5625-16.011719-5.824219s-9.929687-4.871094-14.304687-7.847657l15.257812-30.332031c.5625.714844 2.410157 2.066407 5.507813 4.039063 3.113281 1.972656 6.976562 3.960937 11.5625 5.9375 4.597656 1.988281 9.722656 3.75 15.378906 5.296875 4.503906 1.238281 9.039062 1.988281 13.625 2.222656 1.175781.078125 2.363281.113281 3.550781.113281 12.292969 0 18.441407-3.746094 18.441407-11.230468 0-2.835938-.910157-5.160157-2.75-7.003907-1.84375-1.835937-4.382813-3.496093-7.632813-4.984375-3.261719-1.484375-7.113281-2.859375-11.5625-4.136718-.007813 0-.03125-.007813-.046875-.007813-4.4375-1.273437-9.273438-2.675781-14.472656-4.222656-6.933594-2.128907-12.933594-4.425781-18.03125-6.902344-5.085938-2.472656-9.296875-5.335937-12.609375-8.582031-3.324219-3.253906-5.800781-7.003906-7.421875-11.25-1.625-4.234375-2.4375-9.183594-2.4375-14.835938 0-7.917968 1.476562-14.921875 4.449218-20.988281 2.972657-6.074219 6.996094-11.210937 12.085938-15.371094 5.082031-4.175781 10.996094-7.324219 17.703125-9.449219.625-.191406 1.265625-.375 1.902344-.550781v-28.339843h37.488281v27.753906c4.160156.898437 8.175781 1.972656 12.035156 3.261718 4.660156 1.5625 9.011719 3.324219 13.046875 5.296876 4.023438 1.988281 7.734375 3.960937 11.121094 5.9375l-15.253906 28.84375c-.429688-.566407-1.914063-1.628907-4.464844-3.179688-2.539063-1.558594-5.722656-3.183594-9.535156-4.882812-3.824219-1.691407-8-3.175782-12.511719-4.449219-4.375-1.226563-8.734375-1.863281-13.09375-1.898438-.160156-.015625-.3125-.015625-.472656-.015625-12.449219 0-18.671875 4.175782-18.671875 12.511719 0 2.546875.671875 4.671875 2.011719 6.371094 1.351562 1.6875 3.324218 3.210937 5.945312 4.550781 2.613281 1.347656 5.898438 2.585938 9.863281 3.710938.433594.125.875.25 1.324219.386718 3.636719 1.023438 7.796875 2.175782 12.460938 3.4375 7.207031 1.972656 13.707031 4.132813 19.507812 6.457032 5.785156 2.339843 10.707031 5.242187 14.730469 8.703124 4.023437 3.457032 7.136719 7.671876 9.335937 12.617188 2.1875 4.949219 3.285156 10.886719 3.285156 17.8125zm0 0" fill="#ff7a53"></path><g fill="#fd5016"><path d="m379.320312 301.246094c0 8.484375-1.597656 15.65625-4.773437 21.515625-3.183594 5.875-7.382813 10.613281-12.617187 14.210937-5.226563 3.613282-11.238282 6.226563-18.023438 7.847656-1.738281.414063-3.488281.773438-5.25 1.085938v28.308594h-18.65625v-58.449219c1.175781.074219 2.363281.113281 3.550781.113281 12.292969 0 18.441407-3.75 18.441407-11.234375 0-2.839843-.910157-5.164062-2.75-7-1.84375-1.835937-4.382813-3.5-7.632813-4.984375-3.261719-1.488281-7.113281-2.859375-11.5625-4.136718-.007813 0-.03125-.011719-.046875-.011719v-36.289063c3.636719 1.023438 7.796875 2.171875 12.460938 3.4375 7.207031 1.972656 13.707031 4.132813 19.507812 6.457032 5.785156 2.335937 10.707031 5.234374 14.730469 8.699218 4.023437 3.460938 7.136719 7.667969 9.335937 12.621094 2.1875 4.945312 3.285156 10.882812 3.285156 17.808594zm0 0"></path><path d="m333.09375 226.605469c-4.375-1.226563-8.734375-1.863281-13.09375-1.898438v-56.683593h18.65625v27.753906c4.160156.898437 8.175781 1.972656 12.035156 3.261718 4.660156 1.5625 9.011719 3.324219 13.046875 5.296876 4.023438 1.988281 7.734375 3.960937 11.121094 5.9375l-15.253906 28.84375c-.429688-.566407-1.914063-1.628907-4.464844-3.179688-2.539063-1.558594-5.722656-3.183594-9.535156-4.882812-3.824219-1.691407-8-3.175782-12.511719-4.449219zm0 0"></path></g></svg>
        {size == 'large' ? 
        <p className="text-base text-gray-700 capitalize">Support {name}</p>
        :
        <></>
        }
      </button>
  )
}