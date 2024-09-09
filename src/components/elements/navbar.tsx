import { Container } from "../shared/container"
import { useAuth } from "@/context/AuthContext"
import { Button } from "../shared/button"
import Link from "next/link"
import { TbHome, TbBook2, TbLibraryPlus, TbSearch, TbRefresh, TbUser, TbSend2, TbWallet} from "react-icons/tb";
import { DropDownMenuDesktop, DropDownMenuMobile } from "./menus"
import { useRouter } from "next/router"


export function Navbar() {
    
    const { user } = useAuth();
    const router = useRouter()
    const { query } = router;

    const navItemsDesktop = [
        { href: "/", text: "Home" },
        { href: "/tools", text: "Tools"},
        { href: "/about/pricing", text: "Pricing"},
        // Add more items as needed
    ];

    const desktopDropDownItems = [
        {
            href:"/add",
            text: "Add Recipe",
            icon: TbLibraryPlus ,
        },
        {
            href: "/tools/ai-recipe-generator",
            text: "AI Recipe Generator",
            icon: TbRefresh,
        },
        {
            href: "/search",
            text: "Search",
            icon: TbSearch,
        },
        {
            href: "/account",
            text: "Account Settings",
            icon: TbUser,
        },
    ]

    const desktopDropDownItemsLoggedOut = [
        {
            href:"/add",
            text: "Add Recipe",
            icon: TbLibraryPlus ,
        },
        {
            href: "/tools/ai-recipe-generator",
            text: "AI Recipe Generator",
            icon: TbRefresh,
        },
        {
            href: "/search",
            text: "Search",
            icon: TbSearch,
        },
    ]

    const navItemsMobileLoggedOut = [
        {
            href:"/",
            text:"Home",
            icon: TbHome,
        },
        {
            href:"/add",
            text: "Add Recipe",
            icon: TbLibraryPlus ,
        },
        {
            href: "/tools/ai-recipe-generator",
            text: "AI Recipe Generator",
            icon: TbRefresh,
        },
        {
            href: "/search",
            text: "Search",
            icon: TbSearch,
        },
        {
            href:"/about/pricing",
            text:"Pricing",
            icon: TbWallet,
        },
        {
            href:"/about/contact",
            text: "Contact",
            icon: TbSend2 ,
        },
    ]

    const navItemsLoggedInMobile = [
        {
            href:"/",
            text:"Home",
            icon: TbHome,
        },
        {
            href:"/my-recipes",
            text:"My Recipes",
            icon: TbBook2,
        },
        {
            href:"/add",
            text: "Add Recipe",
            icon: TbLibraryPlus ,
        },
        {
            href: "/search",
            text: "Search",
            icon: TbSearch,
        },
        {
            href: "/tools/ai-recipe-generator",
            text: "AI Recipe Generator",
            icon: TbRefresh,
        },
        {
            href: "/account",
            text: "Account Settings",
            icon: TbUser,
        },
    ]

    const loginClick = async () => {
        if (query.id && query.slug && !user) {
            router.push(`/auth/login?redirect=/recipes/${query.id}/${query.slug}`)
        } else if (user) {
            router.push('/my-recipes')
        } else {
            router.push('/auth/login')
        }
    }

    return(

    <header className="relative bg-white inset-x-0 top-0 z-50 py-6 w-full">
        <Container>
            <nav className="flex justify-between items-center">
                {/* Logo & Text -- Turns visible on screen size large */}
                <div className="hidden lg:flex justify-start w-1/3 ">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative overflow-hidden flex rounded-xl">
                            <img src="/images/Zesti-Logo-500x350.png" alt="Zesti Artificial Intelligence Recipe Helper Logo" width={125} height={100}/>
                        </div>
                    </Link>
                </div>
                <div className="hidden lg:flex justify-center w-1/3">
                    <ul className="hidden lg:flex items-center justify-center gap-x-10 text-xl">
                        {navItemsDesktop.map(item => {
                            return <Navitem key={item.text} {...item}/>
                        })}
                    </ul>
                </div>

                {/* Desktop menu only visible on large screens or bigger */}
                <div className="hidden lg:flex justify-end w-1/3">
                    <div className="inline-flex items-center space-x-4">
                        {user ?
                        <>
                            <Button buttonType="button" isLink={false} text={"My Recipes"} onClick={loginClick}/>
                            <DropDownMenuDesktop navItems={desktopDropDownItems} isHidden={!user}/>  
                        </>
                        :
                        <>
                            <Button buttonType="button" isLink={false}  text={"Login"} onClick={loginClick}/>
                            <DropDownMenuDesktop navItems={desktopDropDownItemsLoggedOut} isHidden={!user}/> 
                        </>
                        }
                    </div>

                </div>
                {!user ?
                    <div className="flex lg:hidden justify-between items-center w-full"> 
                        <DropDownMenuMobile navItems={navItemsMobileLoggedOut}/> 
                        <Button buttonType="button" isLink={false} onClick={loginClick} text={"Login"}/>
                    </div>
                : 
                    <div className="flex lg:hidden justify-between items-center w-full"> 
                        <DropDownMenuMobile navItems={navItemsLoggedInMobile}/> 
                        <Button buttonType="button" isLink={false} onClick={loginClick} text={"My Recipes"}/>
                    </div>
                }
            </nav>
        </Container>
    </header>

    )
}


interface NavItemProps {
    href: string,
    text: string,
}

function Navitem({href, text}: NavItemProps) {
    return(
    <li key={text}>
        <Link href={href} key={text} className="duration-300 font-medium ease-linear text-gray-700 hover:text-primary-main py-3">
            {text}
        </Link>
    </li>
    )
}