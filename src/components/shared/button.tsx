import Link from "next/link"

export interface Props {
    text: string,
    className?:string,
    buttonType: "submit" | "button",
    children?: React.ReactNode,
    onClick?: any,
}

export interface LinkProps{
    href:string,
    text:string,
    className?:string,
}

export function InlineBtnLink({href, text, className}:LinkProps) {
    return(
        <a href={href} className={`text-primary-main underline hover:text-primary-alt ${className}`}>
            <span className={`relative z-10`}>
                {text}
            </span>
        </a>
    )
}

export function BtnLink({href, text, className}:LinkProps) {
    return(
        <Link href={href} className={`text-white bg-primary-main px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-200 ease-linear 
        hover:after:opacity-100 hover:bg-primary-alt ${className} `}>
            <span className={`relative z-10`}>
                {text}
            </span>
        </Link>
    )
}

export function Button({text, className, buttonType, children, onClick}: Props) {
        return(
        <>
            <button type={buttonType} onClick={onClick}
                className={`text-white bg-primary-main px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-200 ease-linear
                    hover:after:opacity-100 hover:bg-primary-alt ${className}`}>
                        <span className="relative z-10">{text}</span>
                        {children}
            </button>
        </>
        )
}

export function AltButton({text, className, buttonType, children, onClick}: Props) {
    return(
    <>
        <button type={buttonType} onClick={onClick}
            className={`text-black bg-white border-primary-main px-6 py-3 hover:text-white rounded-full outline-none relative overflow-hidden border duration-200 ease-linear hover:bg-primary-main
                hover:after:opacity-100 hover:after:scale-[2.5] ${className}`}>
                    <span className="relative z-10">{text}</span>
                    {children}
        </button>
    </>
    )
}

export function BoringButton({text, className, buttonType, children, onClick}: Props) {
    return(
    <>
        <button type={buttonType}  onClick={onClick}
            className={`text-black bg-white border-gray-900 px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear after
                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300  
                after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-gray-200
                hover:after:opacity-100 hover:after:scale-[2.5] ${className}`}>
                    <span className="relative z-10">{text}</span>
                    {children}
        </button>
    </>
    )
}
