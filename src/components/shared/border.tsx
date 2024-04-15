

interface BorderProps {
    className?: string,
    width?: string,
}

export function HorizontalBorder({className, width}: BorderProps) {
    return (
        <div className={`border-t border-gray-300 m-12 ${className}`} style={{ width: width }} />
    )

}