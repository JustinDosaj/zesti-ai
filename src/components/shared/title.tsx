import { Container } from "./container"
import { Paragraph } from "./paragraph"


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


interface TitleProps {
    titleBlack?: string,
    titleOrange?: string,
    showImage?: boolean,
    imageHref?: string,
    imageAlt?: string,
    desc?: string,
    className?: string,
}

export function TitleSection({titleBlack, titleOrange, desc, showImage, imageHref, imageAlt, className}: TitleProps) {
    return(
        <Container className={`flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn ${className} mt-36`}>
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

