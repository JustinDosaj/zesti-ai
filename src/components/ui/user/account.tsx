import { Container } from '@/components/shared/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/pages/api/auth/auth'
import { AccountTitleComponent, SimpleProfileComponent } from '../auth/account';

export function ProfilePageComponent() {

    const { user, stripeRole, logout } = useAuth()
    const router = useRouter();
    
    return (
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-0 xl:pb-24 w-[300px] md:w-[600px]"}>
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
                                    buttonName={"Start Free Trial"} 
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