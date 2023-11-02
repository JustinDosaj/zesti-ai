import { Title } from "../shared/title"
import { Paragraph } from "../shared/paragraph"
import { Container } from "../shared/container"
import Image from "next/image"


export function Reach() {
    return (
    <Container>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <Title className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pr-2">Save</span>
            recipes you
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">love</span>
            for later
            </Title>
            <Paragraph className="mt-6 text-lg leading-8 text-gray-600">
              Upload a recipe once and always have access to the easy-to-follow text recipe from the dashboard, even without a subscription! 
            </Paragraph>
          </div>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              src="/images/recipepage.JPG"
              alt="Ingredient and Instruction Screenshot for Recipe"
              className="mb-[-4%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 hidden sm:block"
              width={2432}
              height={1442}
            />
            <Image
              src="/images/mobilerecipepage.JPG"
              alt="Ingredient and Instruction Screenshot for Recipe"
              className="mb-[-4%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 block sm:hidden"
              width={2432}
              height={1442}
            />
            <div className="relative" aria-hidden="true">
              <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
            </div>
          </div>
        </div>
      </div>
    </Container>
    )
  }
  