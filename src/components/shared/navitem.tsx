import Link from "next/link"

interface Props{
    href: string,
    text: string,
}

export function Navitem({href, text}: Props) {
    return(
    <li key={text}>
        <Link href={href} key={text} className="duration-300 font-medium ease-linear hover:text-primary-main py-3">
            {text}
        </Link>
    </li>
    )
}