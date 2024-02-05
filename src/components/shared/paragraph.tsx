import { TextProps } from "./interface"


export function Paragraph({className, children}: TextProps){
    return(
        <p className={`md:text-md lg:text-lg text-heading-3 ${className}`}>
            {children}
        </p>
    )
}