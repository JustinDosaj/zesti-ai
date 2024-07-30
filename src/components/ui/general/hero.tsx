import { Container } from "@/components/shared/container"
import { SearchOrAddRecipe } from "@/components/search"
import { Paragraph } from "@/components/shared/paragraph"
import Typewriter from "typewriter-effect"
import Image from "next/image"

interface ImageFields {
    file: {
      url: string;
    };
  }
  
  interface Image {
    fields: ImageFields;
  }
  
  interface HeroContent {
    titleStart: string;
    titleEnd: string;
    description: string;
    image: Image;
  }
  
  interface HeroProps {
    heroContent: HeroContent;
    totalRecipes: number;
  }
  
  export function Hero({heroContent, totalRecipes}: HeroProps) {
  
    const { titleStart, description, image } = heroContent;
    const imageUrl = image.fields.file.url;
    const absoluteImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  
    return(
        <Container className="mt-14 lg:mt-28 flex flex-col lg:flex-row items-center justify-between animate-fadeIn">
          <div className="flex lg:w-1/2 flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-2 text-center lg:text-left">
              <h1 className="section-title-text-size xl:text-6xl font-bold text-gray-800">
  
                <span className="text-gray-700"> {titleStart} </span>
                <br />
                <span className="primary-orange-text-gradient inline-block pb-3">
                  <Typewriter
                    options={{
                      strings: ["TikTok Recipes", "Instagram Recipes"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
  
              </h1>
              <Paragraph className="font-medium text-gray-600">
                {description}
              </Paragraph>
            </div>
            <div className="grid justify-center lg:justify-start text-left space-y-1">
              <SearchOrAddRecipe align={"start"}/>
            </div>
            {
              <div className="grid grid-cols-3 lg:flex justify-center lg:justify-start lg:space-x-16">
                <StatisticItem number={totalRecipes} label="Recipes" />
                <StatisticItem number="130+" label="Users" />
                <StatisticItem number="Free" label="Price" />
              </div>
            }
          </div>
          <div className="mt-12 lg:mt-0 bg-transparent rounded-lg w-full lg:w-auto">
            <div className="relative w-full h-96 lg:w-[450px] lg:h-[600px]">
              <Image
                src={absoluteImageUrl}
                alt="Profile"
                layout="fill"
                objectFit="contain"
                className="object-scale-down"
                loading="lazy"
              />
            </div>
          </div>
          
        </Container>
    )
  }

function StatisticItem({ number, label }: any) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-2xl font-semibold text-gray-700">{number}</p>
        <p className="text-base font-medium text-gray-600">{label}</p>
      </div>
    );
  }