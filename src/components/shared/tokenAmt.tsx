export interface Props {
    tokens: number,
}

export function TokenAmount({tokens}: Props) {
    return(
    <div className="text-white bg-primary-main px-4 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear">
        {tokens}
    </div>
    )
}