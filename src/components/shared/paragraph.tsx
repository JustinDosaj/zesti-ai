export interface Props {
    className?:string,
    children?: React.ReactNode
}

export function Paragraph({className, children}: Props){
    return(
        <p className={`md:text-md lg:text-lg text-heading-3 ${className}`}>
            {children}
        </p>
    )
}