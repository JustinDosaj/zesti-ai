import { Container } from "../shared/container"
import { Navitem } from "../shared/navitem"
import { Button } from "../shared/button"
import { useAuth } from "@/pages/api/auth/auth"
import { db } from "@/pages/api/firebase/firebase"

const navItems = [
    {
        href:"/",
        text:"Home",
    },
    {
        href:"/pricing",
        text:"Pricing",
    },
]

const navItemsLoggedIn = [
    {
        href:"/",
        text:"Home",
    },
    {
        href:"/pricing",
        text:"Pricing",
    },
    {
        href: "/dashboard",
        text: "Dashboard",
        isDashboard: true,
    }
]


export function Navbar({_user}: any) {
    
    const { user, login, logout, auth, isLoading } = useAuth();

    return(
    <>
    <header className="absolute inset-x-0 top-0 z-50 py-6">
        <Container>
            <nav className="w-full flex justify-between relative">
                <div className="min-w-max inline-flex relative">
                    <a href="/" className="relative flex items-center gap-3">
                        <div className="relative w-8 h-8 overflow-hidden flex rounded-xl">
                            <img src="/logos/gradient-logo-only-transparent.png"/>
                        </div>
                        <div className="inline-flex text-lg font-semibold text-heading-1">
                            Zesti.ai
                        </div>
                    </a>
                </div>
                <div data-nav-overlay aria-hidden="true" className="fixed hidden inset-0 lg:!hidden bg-box-bg bg-opacity-50 backdrop-filter backdrop-blur-xl"></div>
                <div data-navbar className="flex h-0 overflow-hidden lg:!h-auto lg:scale-y-100 duration-300 ease-linear flex-col gap-y-6 gap-x-4 lg:flex-row w-full lg:justify-between lg:items-center absolute lg:relative top-full lg:top-0 bg-body lg:bg-transparent border-x border-x-box-border lg:border-x-0">
                    <ul className="border-t border-box-border lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-lg text-heading-2 w-full lg:justify-center lg:items-center">
                    {
                        user !== null ? 
                        navItemsLoggedIn.map(item=> {
                            return <Navitem {...item}/>
                        })
                        :
                        navItems.map(item=>{
                            return <Navitem {...item}/>
                        })
                    }
                    </ul>

                    <div className="lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b border-box-bg lg:border-0 px-6 lg:px-0">
                        { user ?
                        <div>
                        <Button buttonType="button" text='Logout' className="flex justify-center w-full sm:w-max" onClick={() => logout()}/>
                        <Button buttonType="button" text='Edit Sub' className="flex justify-center w-full sm:w-max" onClick={() => window.open("https://billing.stripe.com/p/login/test_6oEeY05261fY7a8000")}/>
                        </div>
                        :
                        <Button buttonType="button" text='Login' className="flex justify-center w-full sm:w-max" onClick={() => login()}/>
                        }
                    </div>
                </div>
            </nav>
        </Container>
    </header>
    </>
    )
}