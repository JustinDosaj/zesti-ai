export interface Props {
    children?: React.ReactNode,
}

export function GroupFooterNav({children}: Props) {
    return(
        <div className="grid md:grid-cols-2 gap-8 h-max">
            {children}
        </div>
    )
}