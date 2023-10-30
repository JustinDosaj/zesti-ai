import { VideoCameraIcon, ChatBubbleBottomCenterIcon, KeyIcon } from '@heroicons/react/20/solid'
import { Container } from '../shared/container'
import { Title } from "../shared/title";
import { Paragraph } from '../shared/paragraph'; 

const cards = [
  {
    name: 'Paste Youtube Link',
    description: 'Find a cooking video you want to try and copy the link',
    icon: VideoCameraIcon,
  },
  {
    name: 'Get the Recipe',
    description: 'After pasting the link, Zesti will take the video and transform it to text for your convenience',
    icon: ChatBubbleBottomCenterIcon,
  },
  {
    name: 'Access Recipes',
    description: 'Go to your dashboard and access the easy-to-read recipe and cook at your own pace, ad-free!',
    icon: KeyIcon,
  },
]

export default function HowItWorks() {
  return (
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
        <div className="relative isolate overflow-hidden py-24 sm:py-32 ">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <Title className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    How it
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Works</span>
                    </Title>
                    <Paragraph className="mt-6 text-lg leading-8 text-gray-800">
                    Using Zesti is easy! All you need is a link to a youtube cooking video, and you are good to go!
                    </Paragraph>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                {cards.map((card) => (
                    <div key={card.name} className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10 border">
                    <card.icon className="h-7 w-5 flex-none text-primary-main" aria-hidden="true" />
                    <div className="text-base leading-7">
                        <h3 className="font-semibold text-gray-800">{card.name}</h3>
                        <p className="mt-2 text-gray-600">{card.description}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </Container>
  )
}
