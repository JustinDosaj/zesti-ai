import Link from "next/link"

export interface Props{
    href:string,
    text:string,
    className?:string,
}

export function BtnLink({href, text, className}:Props) {
    return(
        <Link href={href} className={`text-white bg-primary-main px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-200 ease-linear 
        hover:after:opacity-100 hover:bg-primary-alt ${className} `}>
            <span className={`relative z-10`}>
                {text}
            </span>
        </Link>
    )
}

