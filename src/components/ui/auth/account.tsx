import { Container } from '@/components/shared/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export function AccountComponent() {

    const { user, stripeRole, logout } = useAuth()
    const router = useRouter();
    
    return (
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-0 xl:pb-24 w-[300px] md:w-[600px] mx-auto"}>
            <div className="mx-auto max-w-2xl lg:flex lg:gap-x-16 lg:px-8 py-8 standard-component-border w-full ">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div className="">
                            <AccountTitleComponent title={"Basic Profile Information"} desc={"Manage account and access basic information"}/>
                            <dl className="mt-6 space-y-6 divide-y divide-gray-300 border-t border-gray-200 text-sm leading-6">
                                <SimpleProfileComponent 
                                    onButtonClick={() => logout()} 
                                    title={"Email"} 
                                    desc={user?.email} 
                                    buttonName="Logout"
                                />
                                {stripeRole == 'premium' ? // If premium -> manage account; if free -> CTA
                                <SimpleProfileComponent
                                    onButtonClick={() => {window.open(`${process.env.NEXT_PUBLIC_STRIPE_NO_CODE_PORATL}`)}} 
                                    title={"Subscription"} 
                                    buttonName={"Manage"} 
                                    desc={stripeRole}  
                                />
                                :
                                <SimpleProfileComponent 
                                    onButtonClick={() => router.push('/about/pricing')}
                                    title={"Subscription"} 
                                    buttonName={"Remove Ads"} 
                                />
                                }
                            </dl>
                        </div>
                    </div>
                </main>
            </div>
        </Container>
    )
}

interface AccountPageComponents {
    title?: string,
    desc?: string,
}

export function AccountTitleComponent({title, desc}: AccountPageComponents) {
    return(
    <>
        <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">{title}</h2>
        <p className=" text-sm leading-6 text-gray-500 lg:text-base">
            {desc}
        </p>
    </>
    )
}

interface ProfileProps {
    buttonName?: string,
    onButtonClick?: () => void,
    desc?: any,
    title?: string,
}

export function SimpleProfileComponent({onButtonClick, buttonName, title, desc}: ProfileProps) {
    
    return(
        <div className="pt-6 flex justify-between items-center border-gray-200">
            <dt className="grid grid-cols-1 sm:w-12 sm:flex-none pr-6 text-sm lg:text-base">
                <span className="text-gray-900 font-semibold">{title}</span>
                <span className="text-gray-700 text-sm lg:text-base">{desc}</span>
            </dt>
            <dd className={`mt-1 flex gap-x-6 sm:mt-0 ${!buttonName ? `hidden` : ``}`}>
                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                    onClick={onButtonClick}>
                    {buttonName}
                </button>
            </dd>
        </div>
    )
}
