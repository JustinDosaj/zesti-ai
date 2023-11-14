import Link from "next/link"
import { DocumentPlusIcon } from "@heroicons/react/24/outline"

export interface Props{
    href:string,
    className?:string,
}

export function AddRecipeLink({href, className}:Props) {
    return(
        <Link href={href} className={`text-white bg-primary-main px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                    after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554]
                    hover:after:opacity-100 hover:after:scale-[2.5] ${className} after:bg-primary-alt`}>
            <span className="relative z-10 align-middle items-center inline-flex space-x-1">

                <p className="text-white text-lg">Add Recipe</p>
                <DocumentPlusIcon className="h-7 w-7 text-white"/>
            </span>
        </Link>
    )
}

