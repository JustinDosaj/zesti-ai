import { VideoCameraIcon } from "@heroicons/react/20/solid"

export interface Props {
    tokens: number,
    className?:string,
}

export function TokenAmount({tokens, className}: Props) {
    return(
    <div className={`items-center inline-flex gap-1 text-white bg-primary-main px-4 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear space-x-1 ${className}`}>
        <VideoCameraIcon className="text-white h-5 w-5"/>
        <p className="font-bold text-lg">{tokens}</p>
    </div>
    )
}