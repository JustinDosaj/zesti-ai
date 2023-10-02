export interface Props{
    href:string,
    text:string,
    className?:string,
}

export function InlineBtnLink({href, text, className}:Props) {
    return(
        <a href={href} className={`text-primary-main underline hover:text-primary-alt ${className}`}>
            <span className={`relative z-10`}>
                {text}
            </span>
        </a>
    )
}

