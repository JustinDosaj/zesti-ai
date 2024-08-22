interface TextProps {
    children?: React.ReactNode,
    className?:string,
}

export function Title({children, className}: TextProps) {
    return(
        <h1 className={`text-heading-1 font-semibold text-4xl lg:text-5xl text-gray-700 ${className}`}>
            {children}
        </h1>
    )
}
