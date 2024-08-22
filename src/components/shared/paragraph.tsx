import { classNames } from "./classNames"

interface TextProps {
    children?: React.ReactNode,
    className?: string,
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
}

export function Paragraph({className, children, size}: TextProps){

    return(
        <p className={classNames(
            size == 'xsmall' ? 'text-xs'
            : size == 'small' ? `text-sm` 
            : size == 'medium' ? `text-base` 
            : size == 'large' ? `text-lg`
            : size == 'xlarge' ? `text-xl`
            : `text-base lg:text-lg`, `text-gray-700 ${className}`)}>
            {children}
        </p>
    )
}