import { Container } from "@/components/shared/container"
import { SearchOrAddRecipe } from "@/components/search/search-add-recipe"
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
  }
  
  export function Hero({heroContent}: HeroProps) {
  
    const { image } = heroContent;
    const imageUrl = image.fields.file.url;
    const absoluteImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  
    return(
        <Container className="mt-8 lg:mt-28 flex flex-col lg:flex-row items-center justify-between animate-fadeIn">
          <div className="flex lg:w-1/2 flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-2 text-center lg:text-left">
              <h1 className="section-title-text-size xl:text-6xl font-bold text-gray-800">
  
                <span className="text-gray-800">Use AI to Instantly Save Recipes from</span>
                <br />
                <span className="primary-orange-text-gradient inline-block pb-3 mx-auto">
                  <Typewriter
                    options={{
                      strings: ["Instagram", "TikTok"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
              </h1>
              <Paragraph className="">
                {"Copy video links from TikTok & Instagram to save recipes in seconds or search for recipes that already exist on Zesti!"}
              </Paragraph>
            </div>
            <div className="grid justify-center lg:justify-start text-left space-y-1">
              <SearchOrAddRecipe/>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 bg-transparent rounded-lg w-full lg:w-auto">
            <div className="relative w-full h-96 lg:w-[425px] lg:h-[575px]">
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