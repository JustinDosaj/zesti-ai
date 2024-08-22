import { Container } from "@/components/shared/container"
import { Button } from "@/components/shared/button"
import { Title } from "@/components/shared/title"
import { Paragraph } from "@/components/shared/paragraph"

export function CTA() {
    return(
      <Container className="relative w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-8 orange-border-shadow rounded-3xl p-6 lg:p-12">
          <div className="flex flex-col items-center text-center">
            <p className="w-full md:w-96 text-xl font-medium text-center primary-orange-text-gradient mb-3">
              Premium
            </p>
            <Title>The Best Way To Use Zesti</Title>
            <Paragraph className="mt-2">Experience Zesti AI with zero ads</Paragraph>
          </div>
          <Button isLink={true} href='/about/pricing' text="Get Started" className="text-lg font-medium text-center text-white"/>
        </div>
      </Container>
    )
  }