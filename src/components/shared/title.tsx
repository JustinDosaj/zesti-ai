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
    title: string,
    desc?: string,
    href?: any,
}

export function SharedPageTitle({title, desc}: SharedPageTitleProps) {
    return(
        <section className="pt-32">
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
                <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr to-primary from-primaryteal absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight
                    font-bold text-heading-1 text-black">
                    {title}
                    </h1>
                    <Paragraph className="mt-4 text-gray-600">
                        {desc}
                    </Paragraph>
                </div>
            </Container>
        </section>
    )
}

export function SharedListTitle({title}: SharedPageTitleProps) {
    return(
    <Container className="relative sm:flex justify-center items-center lg:flex-wrap gap-10 lg:gap-4 w-full animate-fadeIn">
        <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">{title}</h3>
    </Container>
    )
}

export function SharedViewAllTitle({title, href, desc}: SharedPageTitleProps) {
    return(
        <Container className="pt-32 animate-fadeIn">
        <div className="flex lg:relative justify-center items-center lg:flex-wrap gap-10 lg:gap-4 w-full">
            <div className="inline-flex items-center">
                <h3 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight font-bold text-heading-1 text-black text-center">{title}</h3>
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
        <Paragraph className="mt-4 text-center text-gray-600">
            {desc}
        </Paragraph>
    </Container>
    )
}