interface Props{
    className?:string,
    children?: React.ReactNode
}

export function Container({className, children}:Props) {
    return(
        <div className={`mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-14 lg:px-5 ${className}`}>
            {children}
        </div>
    )
}

export function RecipeContainer({className, children}:Props) {
    return(
        <div className={`flex flex-col gap-8 mb-16 mx-auto w-full lg:max-w-3xl px-4 sm:px-8 md:px-14 lg:px-5 mt-2 lg:mt-8 animate-fadeIn ${className}`}>
            {children}
        </div>
    )
}