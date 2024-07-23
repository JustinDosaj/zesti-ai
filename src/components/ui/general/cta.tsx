import { Container } from "@/components/shared/container"
import { Button } from "@/components/shared/button"
import { TitleSection } from "@/components/shared/title"

export function CTA() {
    return(
      <Container className="relative w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-8 orange-border-shadow rounded-3xl p-6 lg:p-12">
          <div className="flex flex-col items-center text-center">
            <p className="w-full md:w-96 text-xl font-medium text-center primary-orange-text-gradient mb-3">
              Premium
            </p>
            <TitleSection titleBlack="The Best Way To Use Zesti" desc="Experience Zesti AI with zero ads"/>
          </div>
          <Button isLink={true} href='/about/pricing' text="Get Started" className="text-lg font-medium text-center text-white"/>
        </div>
      </Container>
    )
  }