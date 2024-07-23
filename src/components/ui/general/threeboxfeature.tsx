import { Container } from "@/components/shared/container"
import { ChatBubbleLeftIcon, StarIcon, BookOpenIcon, PuzzlePieceIcon, SpeakerWaveIcon, EyeIcon, LinkIcon, VideoCameraIcon, DocumentIcon } from "@heroicons/react/20/solid"
import { InlineButton } from "@/components/shared/button"
import { Paragraph } from "@/components/shared/paragraph"

interface Feature {
    name: string,
    description: string,
    icon: any,
    href?: () => void,
    linkName?: string,
  }

interface ThreeBoxFeatureProps {
    type: 'home' | 'assistant' | 'howitworks',
    titleStart: string,
    titleEnd: string,
    titleMid?: string,
    desc: string,
  }
    
  export function ThreeBoxFeature({type, titleStart, titleEnd, titleMid, desc}: ThreeBoxFeatureProps) {
  
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
          assistant: [
              {
                  name: 'Step-by-Step',
                  description: 'Zesti AI knows what recipe you are cooking and can help answer questions about any step or ingredient',
                  icon: StarIcon,
              },
              {
                  name: 'Modern Problem, Modern Solution',
                  description: 'No more getting stuck because you are missing an ingredient or skipped a step. Zesti will help you get back on track!',
                  icon: PuzzlePieceIcon,
              },
              {
                  name: 'Real-Time Answers',
                  description: 'Get stuck? Make a mistake? No worries, Zesti will provide real time answers for you!',
                  icon: ChatBubbleLeftIcon,
              },
          ],
          howitworks: [
            {
                name: 'Get Video Audio',
                description: 'Users paste video links into Zesti and we capture the audio as text',
                icon: SpeakerWaveIcon,
            },
            {
                name: 'AI Transcription',
                description: 'AI turns the video audio into a recipe that is recognizable by everyone',
                icon: BookOpenIcon,
            },
            {
                name: 'Completed Recipe',
                description: 'Recipes are available on public pages or inside your own recipe book on Zesti',
                icon: EyeIcon,
            },
          ],
      }
  
      const features: Feature[] = FeatureTypes[type]
  
      return(
          <Container className={"animate-fadeIn"}>
              <div className="w-full max-w-7xl mx-auto space-y-4">
                  <div className="grid justify-center items-center text-center lg:text-left">
                      <p className="section-title-text-size font-semibold text-gray-700">
                      {titleStart}
                      <span className="primary-orange-text-gradient"> {titleMid} </span>
                      {titleEnd}
                      </p>
                  </div>
                  <Paragraph className="text-center text-gray-600">
                    {desc}
                  </Paragraph>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-12">
                      {features.map((feature) => (
                      <div key={feature.name} className="flex flex-col items-start p-6 rounded-3xl gap-y-2 bg-white orange-border-shadow">
                          <feature.icon className="h-12 w-12 bg-orange-100 p-2 rounded-2xl text-primary-main" aria-hidden="true" />
                          <div className="flex flex-col mt-2 gap-2">
                              <p className="text-xl font-semibold text-gray-800">{feature.name}</p>
                              <p className="text-base text-gray-600 flex-grow">{feature.description}</p>
                              { feature.href ? 
                              <InlineButton text={feature.linkName || ''} onClick={feature.href} isLink={false} className="text-left"/>
                              :
                              <div></div>
                              }
                          </div>
                      </div>
                      ))}
                  </div>
              </div>
          </Container>
      )
  }