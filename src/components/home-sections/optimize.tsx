import { CheckIcon } from '@heroicons/react/20/solid'
import { Paragraph } from '../shared/paragraph'
import { Container } from '../shared/container'
import { Title } from '../shared/title'
import Image from 'next/image'

const features = [
    {
      name: 'Ingredient List: ',
      description:
        'Get an organized ingrediant list to help you gather everything you need to get started on cooking something amazing',
      icon: CheckIcon,
    },
    {
      name: 'Instructions: ',
      description: 'Clear instructions will be at your disposal to refer to at any time',
      icon: CheckIcon,
    },
  ]

export function Optimize() {
    return (
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
        <div className="bg-white py-24 sm:py-32 p-8">
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                <div className="md:px-0 lg:pr-4 lg:pt-4">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                    <Title className="mt-2 font-bold tracking-tight text-gray-900 text-4xl md:text-5xl flex flex-wrap">
                    <p>Trying</p>
                    <div className="inline-flex text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-0 sm:pl-1">new recipes</div>
                    <p>has never been</p>
                    <div className="inline-flex text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-0 sm:pl-1">easier</div>
                    </Title>
                    <Paragraph className="mt-6 text-lg text-gray-600">
                        You no longer need to constantly pause and rewind cooking videos. And no more recipe websites with cluttered ads. Zesti will give you the following:
                    </Paragraph>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                        {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                            <dt className="inline font-semibold text-gray-900">
                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-color-alt-green" aria-hidden="true" />
                            {feature.name}
                            </dt>{' '}
                            <dd className="inline">{feature.description}</dd>
                        </div>
                        ))}
                    </dl>
                    
                    </div>
                </div>
                <div className="sm:px-6 lg:px-0">
                    <div className="relative isolate overflow-hidden bg-primary-main sm:mx-auto sm:max-w-2xl rounded-3xl p-2 sm:p-8 lg:p-8">
                    <div
                        className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                        aria-hidden="true"
                    />
                    <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none p-4 sm:p-0">
                        <Image
                            src="/images/video-image.jpg"
                            alt="Cooking Recipes Screenshot"
                            className="rounded-xl w-full max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                            width={500} height={500}
                        />
                    </div>
                    <div
                        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                        aria-hidden="true"
                    />
                    </div>
                </div>
                </div>
            </div>
        </div>
        </Container>
      )
}