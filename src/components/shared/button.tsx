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

interface ButtonProps {
    text: string,
    className?: string,
    buttonType?: 'submit' | 'button',
    children?: React.ReactNode,
    onClick?: any,
    isLink: boolean,
    href?: string,
}


/*export function InlineBtnLink({href, text, className}:LinkProps) {
    return(
        <a href={href} className={`text-primary-main underline hover:text-primary-alt ${className}`}>
            <span className={`relative z-10`}>
                {text}
            </span>
        </a>
    )
}*/


export function InlineButton({text, className, buttonType, children, onClick, isLink, href}: ButtonProps) {
    return(
        <Link href={href!} className={`text-primary-main underline hover:text-primary-alt ${className}`}>
            <span className={`relative z-10`}>
                {text}
            </span>
        </Link>
    )
}


export function Button({text, className, buttonType, children, onClick, isLink, href}: ButtonProps) {
    
    if (!isLink && onClick && buttonType) return (
        <button type={buttonType} onClick={onClick}
            className={`text-white bg-primary-main px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-200 ease-linear
                hover:after:opacity-100 hover:bg-primary-alt ${className}`}>
                    <span className="relative z-10">{text}</span>
                    {children}
        </button>
    )

    if (isLink && href) return (
        <Link href={href!} className={`text-white bg-primary-main px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-200 ease-linear 
            hover:after:opacity-100 hover:bg-primary-alt ${className} `}>
            <span className={`relative z-10`}>
                {text}
            </span>
        </Link>
    )

    return <div>error</div>
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
