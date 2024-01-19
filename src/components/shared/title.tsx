import { Container } from "./container"
import { Paragraph } from "./paragraph"
import { ChevronDoubleLeftIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
export interface Props {
    children?: React.ReactNode,
    className?:string,
}

export function Title({children, className}: Props) {
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


// IN USE
export function SharedHomeSectionTitle({titleBlack, titleOrange, desc}: SharedPageTitleProps) {
    return(
    <>
        <h1 className="text-4xl lg:text-5xl font-semibold text-gray-800 text-center animate-fadeIn">
            <span>{titleBlack}</span> 
            <span className="primary-orange-text-gradient"> {titleOrange} </span>
        </h1>
        <p className="section-desc-text-size text-gray-600 w-full text-center mt-3 animate-fadeIn">
            {desc}
        </p>
    </>
    )
}

