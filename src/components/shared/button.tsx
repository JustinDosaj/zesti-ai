import Link from "next/link"

interface ButtonProps {
    text: string,
    className?: string,
    buttonType?: 'submit' | 'button',
    children?: React.ReactNode,
    onClick?: any,
    isLink: boolean,
    href?: string,
    isDisabled?:boolean,
}


export function InlineButton({text, className, href, isLink, onClick}: ButtonProps) {
    if (isLink) return(
        <Link href={href!} className={`text-primary-main underline hover:text-primary-alt ${className}`}>
            <span className={`relative z-10`}>
                {text}
            </span>
        </Link>
    )

    else return (
        <button 
            className={`text-primary-main underline hover:text-primary-alt ${className}`}
            type="button"
            onClick={onClick}
        >
            <span className={`relative z-10`}>
                {text}
            </span>
        </button>
    )
}

export function Button({text, className, buttonType, children, onClick, isLink, href, isDisabled}: ButtonProps) {
    
    if (!isLink && onClick && buttonType) return (
        <button type={buttonType} onClick={onClick} disabled={isDisabled}
            className={`text-white bg-primary-main px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-200 ease-linear
                hover:after:opacity-100 hover:bg-primary-alt font-semibold ${className}`}>
                    <span className="relative z-10 text-base">{text}</span>
                    {children}
        </button>
    )

    if(!isLink && buttonType) return (
        <button type={buttonType} onClick={onClick} disabled={isDisabled}
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

