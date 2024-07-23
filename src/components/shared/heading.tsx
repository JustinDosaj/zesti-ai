import { Container } from "@/components/shared/container"
import { Button } from "@/components/shared/button"

interface HeroProps {
  titleStart?: string,
  titleEnd?: string,
  description?: string,
  button?: () => void,
  buttonName: string,
  imageSrc?: string,
}

export function SharedHeading({titleStart, titleEnd, description, button, buttonName}: HeroProps) {

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


  


