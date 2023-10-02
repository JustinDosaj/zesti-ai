export interface Props {
    className?:string,
    children?: React.ReactNode
}

export function Paragraph({className, children}: Props){
    return(
        <p className={`md:text-lg lg:text-xl text-heading-3 ${className}`}>
            {children}
        </p>
    )
}