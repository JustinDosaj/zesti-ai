import { Container } from "@/components/shared/container"
import { MinusSmallIcon, PlusSmallIcon, CheckCircleIcon} from "@heroicons/react/20/solid"
import { Button } from "@/components/shared/button"
import Image from "next/image"
import { Disclosure } from "@headlessui/react"
import { SharedHomeSectionTitle } from "@/components/shared/title"
import Link from "next/link"
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