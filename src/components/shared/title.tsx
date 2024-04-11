import { Container } from "./container"
import { ChevronDoubleLeftIcon } from "@heroicons/react/20/solid"
import { Paragraph } from "./paragraph"
import Link from "next/link"

interface TextProps {
    children?: React.ReactNode,
    className?:string,
}

export function Title({children, className}: TextProps) {
    return(
        <h1 className={`text-heading-1 font-semibold text-4xl lg:text-5xl ${className}`}>
            {children}
        </h1>
    )
}

interface SharedPageTitleProps {
    title?: string,
    desc?: string,
    href?: any,
    titleBlack?: string,
    titleOrange?: string,
    className?: any
}


export function SharedViewAllTitle({title, href, desc}: SharedPageTitleProps) {
    return(
        <Container className="animate-fadeIn">
            <div className="flex lg:relative justify-center items-center lg:flex-wrap gap-10 lg:gap-4 w-full">
                <div className="inline-flex items-center">
                    <h3 className="text-4xl lg:text-5xl font-semibold text-gray-800 text-center">{title}</h3>
                    <div className="absolute left-0">
                        <Link href={href} passHref className="hover:bg-primary-dark text-gray-700 hover:text-gray-500 font-semibold py-2 px-4 lg:px-0">
                            <span className="inline-flex items-center mt-2 gap-x-1.5 px-0 sm:px-4 md:px-8 lg:px-0">
                                <ChevronDoubleLeftIcon className="h-7 w-7 lg:h-5 lg:w-5"/>
                                <span className="hidden lg:block underline">Back to Dashboard</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <p className="section-desc-text-size text-gray-600 w-full text-center mt-3">
                {desc}
            </p>
        </Container>
    )
}


interface TitleProps {
    titleBlack?: string,
    titleOrange?: string,
    showImage?: boolean,
    imageHref?: string,
    imageAlt?: string,
    desc?: string,
}

export function TitleSection({titleBlack, titleOrange, desc, showImage, imageHref, imageAlt}: TitleProps) {
    return(
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
            <div className="relative flex flex-col items-center text-center lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                {showImage && (
                    <img src={imageHref || '/images/page-image-placeholder.png'} alt={imageAlt} className="rounded-3xl h-[75px] w-[75px] sm:h-[100px] sm:w-[100px]"/>
                )}
                <div className="items-center inline-flex mt-2">
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight font-semibold text-heading-1 text-gray-700 capitalize">
                        <span>{titleBlack}</span> 
                        <span className="primary-orange-text-gradient"> {titleOrange} </span>
                    </h1>
                </div>
                <Paragraph className="mt-2 text-gray-600">
                        {desc || ''}
                </Paragraph>
            </div>
        </Container>
    )
}

export function SharedSectionHeadingTitle({title, className}: SharedPageTitleProps) {
    return(
        <h3 className={`text-center text-2xl font-semibold text-gray-700 ${className}`}>{title}</h3>
    )
}

