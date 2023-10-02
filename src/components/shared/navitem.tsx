interface Props{
    href: string,
    text: string,
}

export function Navitem({href, text}: Props) {
    return(
    <li key={text}>
        <a href={href} className="duration-300 font-medium ease-linear hover:text-primary-main py-3">
            {text}
        </a>
    </li>
    )
}