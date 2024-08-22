import { Container } from "@/components/shared/container"
import { LinkIcon, VideoCameraIcon, DocumentIcon } from "@heroicons/react/20/solid"
import { Paragraph } from "@/components/shared/paragraph"
import { Title } from "@/components/shared/title"

interface Feature {
    name: string,
    description: string,
    icon: any,
    href?: () => void,
    linkName?: string,
  }

interface ThreeBoxFeatureProps {
    type?: 'home',
  }
    
export function ThreeBoxFeature({type = 'home'}: ThreeBoxFeatureProps) {

    const FeatureTypes = {
        home: [
            {
                name: 'Find Recipe Video',
                description: 'Explore TikTok & Instagram for a recipe you want to try!',
                icon: VideoCameraIcon,
            },
            {
                name: 'Give Zesti the Video Link',
                description: 'Use the share button on the video to copy the link then paste it into Zesti',
                icon: LinkIcon,
            },
            {
                name: 'Enjoy the Recipe!',
                description: 'In just a few seconds, Zesti will have a written recipe ready for you!',
                icon: DocumentIcon,
            },
        ],
    }

    const features: Feature[] = FeatureTypes[type]

    return(
        <Container className={"animate-fadeIn"}>
            <div className="w-full max-w-7xl mx-auto space-y-4">
                <div className="grid justify-center items-center text-center lg:text-left">
                    <Title className="text-center">
                        <span>How </span>
                        <span className="primary-orange-text-gradient">Zesti </span>
                        <span>Works</span>
                    </Title>
                    <Paragraph className="mt-2">Zesti makes it easy to copy recipes so you can do more cooking and less scrolling!</Paragraph>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-12">
                    {features.map((feature) => (
                    <div key={feature.name} className="flex flex-col items-start p-6 rounded-3xl gap-y-2 bg-white orange-border-shadow">
                        <feature.icon className="h-12 w-12 bg-orange-100 p-2 rounded-2xl text-primary-main" aria-hidden="true" />
                        <div className="flex flex-col mt-2 gap-2">
                            <Paragraph size="xlarge" className="font-semibold">{feature.name}</Paragraph>
                            <Paragraph size="medium" className="flex-grow">{feature.description}</Paragraph>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}