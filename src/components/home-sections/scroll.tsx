import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid"
import Image from "next/image";

export function ToolExamples() {

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Testimonial cards */}
            <TestimonialCard
                name="Fluffy Blueberry Muffins"
                source="YouTube"
                desc="Fluffy and moist blueberry muffins loaded with a ton of blueberries, topped with a simple and delicious brown sugar streusel."
                imageSrc="/images/stock-people/blue-shirt.jpg"
                href="/about/demos/youtube"
            />
            <TestimonialCard
                name="French Toast Recipe"
                source="AI Generated"
                desc="Keep it simple with a 20-minute classic golden brown French toast recipe made with bread, eggs, milk, and a hint of cinnamon."
                imageSrc="/images/stock-people/smiley-man.jpg"
                href="/about/demos/creative"
            />
            <TestimonialCard
                name="Hawaiian Roll Garlic Bread"
                source="Tiktok"
                desc="A ridiculously good and addictive garlic bread made with Hawaiian rolls, stuffed with a flavorful garlic butter mixture, topped with melty mozzarella cheese."
                imageSrc="/images/stock-people/smiley-woman-couch.jpg"
                href="/about/demos/tiktok"
            />
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