export interface Props {
    title: string,
    navItems: {
        itemText:string,
        itemLink:string
    }[]
}

export function FooterNav({title, navItems}: Props) {
 return(
    <nav className="space-y-6 ">
        <h2 className="capitalze font-semibold text-heading-1 text-xl">
            {title}
        </h2>
        <ul className="space-y-3 md:text-lg text-heading-3">
            {navItems.map(({itemText, itemLink}: any)=>(
                <li key={itemLink}>
                    <a href={itemLink} className="transition hover:text-primary-main">
                        {itemText}
                    </a>
                </li>
            ))

            }
        </ul>
    </nav>
 )
}