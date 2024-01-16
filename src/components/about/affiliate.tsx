
import { Button } from "../shared/button"
import { useAuth } from "@/pages/api/auth/auth"
import Image from "next/image"
import { Container } from "../shared/container"
import { PageLoader } from "../shared/loader"
import { StarIcon, CurrencyDollarIcon, CalendarDaysIcon } from "@heroicons/react/20/solid"


export function AffiliateHero(){

    const { isLoading } = useAuth()

    if (isLoading) return <PageLoader/>

    return(
        <Container className="flex flex-col lg:flex-row items-center justify-between pt-36 px-5 space-x-4 xl:pt-48 animate-fadeIn">
            <div className="flex lg:w-1/2 flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-8 text-center lg:text-left">
                <h1 className="section-title-text-size xl:text-6xl font-bold text-gray-700">
                <span className="primary-orange-text-gradient">Get Paid</span>
                <span className="text-gray-700"> to Recommend </span>
                <br />
                <span className="text-gray-700">Zesti AI</span>
                </h1>
                <p className="section-desc-text-size font-medium text-gray-600">
                    Refer customers to Zesti and earn 15% on each subscription, every month for life
                </p>
            </div>
            <div className="grid justify-center lg:justify-start space-y-1">
                <div className="grid justify-center lg:justify-start space-y-0.5">
                <Button buttonType="button" text="Become Zesti Affiliate" className="w-fit" onClick={() => window.open("https://zesti.getrewardful.com/signup")}/>
                </div>
            </div>
            </div>


            <div className="hidden lg:block w-1/2 bg-transparent rounded-lg">
                <Image src={"/images/new-aff-img.png"} alt="Profile" height={2058} width={2150} className="object-fit" />
            </div> {/* Placeholder for the illustration */}
            
        </Container>
    )
}

export function AffiliateDetails() {

    const tools = [
        {
          name: 'Earn 15% Commission',
          description: 'Get 15% of a referred users subscription while premium account is active!',
          icon: StarIcon,
          href: '/about/tools/create-recipe'
        },
        {
          name: '30 Day Cookie Expiration',
          description: 'Get paid if a user your referred activates a premium subscription within 30 days',
          icon: CalendarDaysIcon,
          href: '/about/tools/social-media-recipe'
        },
        {
          name: '$0.99 Payout Threshold',
          description: 'Choose to get paid out anytime after earning $0.99 or more!',
          icon: CurrencyDollarIcon,
          href: '/about/tools/web-recipe'
        },
      ]

    return(
    <Container className={"py-32 lg:py-48 px-5 animate-fadeIn"}>
        <div className="w-full max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-8 lg:gap-14 text-center lg:text-left">
                <p className="section-title-text-size font-semibold text-gray-700 lg:w-1/3">
                SHARE ZESTI
                <br />
                AND GET PAID
                <br/>
                <span className="primary-orange-text-gradient"> ITS THAT EASY</span>
                <br />
                </p>
                <p className="w-full lg:w-1/2 section-desc-text-size text-gray-600">
                With our affiliate program, we make it possible for you to earn comission on every premium subscription you refer!
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-10">
                {tools.map((tool) => (
                <div key={tool.name} className="flex flex-col items-start p-6 rounded-3xl gap-y-2 bg-white orange-border-shadow">
                    <tool.icon className="h-12 w-12 bg-orange-100 p-2 rounded-2xl text-primary-main" aria-hidden="true" />
                    <div className="flex flex-col gap-3">
                        <p className="text-xl font-semibold text-gray-800 mb-2">{tool.name}</p>
                        <p className="text-base text-gray-600 flex-grow">{tool.description}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </Container>
    )
}