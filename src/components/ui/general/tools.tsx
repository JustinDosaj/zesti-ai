import { Container } from "@/components/shared/container"
import { TbSearch, TbRefresh, TbTransform } from "react-icons/tb";
import { Paragraph } from "@/components/shared/paragraph"
import { Title } from "@/components/shared/title"
import Link from "next/link";

interface Feature {
    name: string,
    description: string,
    icon: any,
    linkName?: string,
    href?: string,
  }

    
export function ToolBoxFeature() {

    const FeatureTypes = {
        tools: [
            {
                name: 'Recipe Transcriber',
                description: 'Transcribe TikTok and Instagram recipe videos into clean text instructions.',
                icon: TbTransform,
                href: '/add',
            },
            {
                name: 'Recipe Search',
                description: 'Search through our recipe collection to find exactly what you need.',
                icon: TbSearch,
                href: '/search',
            },
            {
                name: 'AI Recipe Generator',
                description: 'Generate recipes by telling Zesti AI what you want to cook.',
                icon: TbRefresh,
                href: '/tools/ai-recipe-generator',
            },
        ],
    }

    const features: Feature[] = FeatureTypes['tools']

    return(
        <Container className={"animate-fadeIn"}>
            <div className="w-full max-w-7xl mx-auto space-y-4">
                <div className="grid justify-center items-center text-center lg:text-left">
                    <Title className="text-center">
                        <span className="primary-orange-text-gradient">Zesti AI </span>
                        <span>Tools </span>
                    </Title>
                    <Paragraph className="mt-2">Check out all of the free-to-use tools available to Zesti AI users!</Paragraph>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-12">
                    {features.map((feature) => (
                    <div key={feature.name} className="flex flex-col items-start p-6 rounded-3xl gap-y-2 bg-white orange-border-shadow">
                        <feature.icon className="h-12 w-12 bg-orange-100 p-2 rounded-2xl text-primary-main" aria-hidden="true" />
                        <div className="flex flex-col mt-2 gap-2">
                            <Paragraph size="xlarge" className="font-semibold">{feature.name}</Paragraph>
                            <Paragraph size="medium" className="flex-grow">{feature.description}</Paragraph>
                            <Link href={`${feature.href}`} className="w-fit mt-1 text-white py-1.5 border rounded-full bg-primary-main hover:bg-primary-alt px-4">{"Try Now!"}</Link>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}