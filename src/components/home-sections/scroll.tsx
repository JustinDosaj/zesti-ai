import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid"
import Image from "next/image";

export function ToolExamples() {

    return(
        <>
            <div className="flex flex-col lg:flex-row justify-center text-center lg:items-center w-full gap-8">
                <div className="flex flex-col gap-6">
                    <p className="text-4xl lg:text-5xl font-semibold text-gray-800">
                        How Our Members Use
                    <span className="primary-orange-text-gradient"> Zesti </span>
                    </p>
                    <p className="section-desc-text-size text-gray-600 w-full">
                        Click on any of the example below of people using Zesti to instantly save YouTube & TikTok videos or create unique AI recipes!
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Testimonial cards */}
            <TestimonialCard
                name="Fluffy Blueberry Muffins"
                source="YouTube"
                desc="This delicious blueberry muffin recipe was converted from a YouTube video to an easy-to-read recipe by one of our members"
                imageSrc="/images/stock-food/fresh-muffins.jpg"
                href="/about/demos/youtube"
            />
            <TestimonialCard
                name="French Toast Recipe"
                source="AI Generated"
                desc="Check out this simple French Toast recipe, created by Zesti AI"
                imageSrc="/images/stock-food/french-toast.jpg"
                href="/about/demos/creative"
            />
            <TestimonialCard
                name="Hawaiian Roll Garlic Bread"
                source="Tiktok"
                desc="Tiktok is full of cooking ideas, which is why Zesti makes it easy to instantly save the recipes!"
                imageSrc="/images/stock-food/Hawaiian-Roll.jpg"
                href="/about/demos/tiktok"
            />
            </div>
        </>
    )
}

export function DashboardExample() {
    return(
        <>
        <div className="flex flex-col lg:flex-row justify-center text-center lg:items-center w-full gap-8">
            <div className="flex flex-col gap-6">
                <p className="text-4xl lg:text-5xl font-semibold text-gray-800">
                How 
                <span className="text-orange-600"> Zesti </span>
                Works
                </p>
                <p className="section-desc-text-size text-gray-600 w-full">
                    Click on any of the example below of people using Zesti to instantly save YouTube & TikTok videos or create unique AI recipes!
                </p>
            </div>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              src="/images/dashdeskcap.JPG"
              alt="Ingredient and Instruction Screenshot for Recipe"
              className="mb-[-4%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 hidden sm:block"
              width={2432}
              height={1442}
            />
            <Image
              src="/images/mobdashcap.JPG"
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
      </>
    )
}

export function Scroller({onRightScrollClick, onLeftScrollClick, scrollPage}: any) {
    return(
        <div className="flex items-center justify-center w-full mt-8 space-x-4">
            <button onClick={() => onLeftScrollClick()} type="button"><ChevronLeftIcon className="h-10 w-10 home-page-scroll-btn" /></button>
            <p className="text-base font-bold text-gray-600">{scrollPage} / 1</p>
            <button onClick={() => onRightScrollClick()} type="button"><ChevronRightIcon className="h-10 w-10 home-page-scroll-btn" /></button>
        </div>
    )
}

function TestimonialCard({ name, source, desc, imageSrc, href }: any) {
    return (
      <button onClick={() => window.open(href)} className="flex flex-col items-start bg-white hover:bg-gray-200 hover:duration-200 p-4 rounded-3xl shadow-lg">
        <Image src={imageSrc} alt="Profile" height={1000} width={1000} className="w-24 h-24 rounded-lg mb-4 object-fit" />
        <p className="text-2xl font-medium text-gray-800 mb-2">{name}</p>
        <p className="inline-flex text-sm font-medium text-gray-600 mb-4 space-x-1">
            <span className="">Source:</span>
            <span className="text-primary-main">{source}</span>
        </p>
        <p className="text-base text-gray-700 text-left">{desc}</p>
      </button>
    );
}