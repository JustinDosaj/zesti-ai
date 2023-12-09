import { Container } from "../shared/container"
import { ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid"

export function ToolExamples() {

    return(
        <>
            <div className="flex flex-col lg:flex-row justify-center text-center lg:items-center w-full gap-8">
            <div className="flex flex-col gap-6">
                <p className="text-5xl font-semibold text-gray-800">
                What Are People <br />
                Saying <span className="text-orange-600">About Us</span>
                </p>
                <p className="text-base text-gray-600 w-full lg:w-96">
                We are very happy if you are satisfied with our service and products, let's read pure reviews from customers who bought our products.
                </p>
            </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-start items-start gap-8 mt-8 p-4 lg:p-8">
            {/* Testimonial cards */}
            <TestimonialCard
                name="Selena Gomz"
                age="22 Years"
                comment="The salad is fresh!!! Don't ask about the sauce again, it's really delicious, it's going to be routine. I recommend this salad to all of you guys! because they really take care of the quality."
                imageSrc="container.png"
            />
            <TestimonialCard
                name="David Ken"
                age="24 Years"
                comment="The salad is fresh!!! Don't ask about the sauce again, it's really delicious, it's going to be routine. I recommend this salad to all of you guys! because they really take care of the quality."
                imageSrc="container-2.png"
            />
            <TestimonialCard
                name="Jennifer Sina"
                age="21 Years"
                comment="The salad is fresh!!! Don't ask about the sauce again, it's really delicious, it's going to be routine. I recommend this salad to all of you guys! because they really take care of the quality."
                imageSrc="container-3.png"
            />
            </div>
        </>
    )
}

export function Scroller({onRightScrollClick, onLeftScrollClick, scrollPage}: any) {
    return(
        <div className="flex items-center justify-center w-full mt-8 space-x-4">
            <button onClick={() => onLeftScrollClick()} type="button"><ChevronLeftIcon className="h-10 w-10 home-page-scroll-btn" /></button>
            <p className="text-base font-bold text-gray-600">{scrollPage} / 3</p>
            <button onClick={() => onRightScrollClick()} type="button"><ChevronRightIcon className="h-10 w-10 home-page-scroll-btn" /></button>
        </div>
    )
}

function TestimonialCard({ name, age, comment, imageSrc }: any) {
    return (
      <div className="flex flex-col items-start bg-white p-4 rounded-3xl shadow-lg">
        <img src={imageSrc} alt="Profile" className="w-24 h-24 rounded-lg mb-4" />
        <p className="text-2xl font-medium text-gray-800 mb-2">{name}</p>
        <p className="text-sm font-medium text-gray-600 mb-4">{age}</p>
        <p className="text-base text-gray-700">{comment}</p>
      </div>
    );
  }