import React from 'react'
import { Container } from '@/components/shared/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/pages/api/auth/auth'
import { AccountTitleComponent, SimpleProfileComponent } from '../auth/account';

export function ProfilePageComponent() {

    const { user, stripeRole, logout, userData, loginWithTikTok } = useAuth()
    const router = useRouter();

    return (
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-0 xl:pb-24"}>
            <div className="mx-auto max-w-2xl lg:flex lg:gap-x-16 lg:px-8 py-8 standard-component-border w-full">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
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
                                <SimpleProfileComponent title={"Monthly Usage Remaining"} desc={userData?.tokens} buttonName={''}/>
                                {user && userData?.tiktokAccessToken && userData?.account_status !== 'creator' ? 
                                    <div className={userData?.account_status == 'creator' ? 'hidden' : 'block'}>
                                        <dl className="space-y-6 text-sm leading-6">
                                            <div className="pt-6 flex justify-between items-center">
                                                <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Join Creator Program</dt>
                                                <dd className=" flex gap-x-6 sm:mt-0">
                                                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                                        onClick={() => router.push('https://zesti.promotekit.com')}>
                                                        Apply
                                                    </button>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                    :
                                    <div className={userData?.account_status == 'creator' ? 'hidden' : 'block'}>
                                        <dl className="space-y-6 text-sm leading-6">
                                            <div className="pt-6 flex justify-between items-center">
                                                <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Join Creator Program</dt>
                                                <dd className=" flex gap-x-6 sm:mt-0">
                                                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                                        onClick={loginWithTikTok}>
                                                        Connect TikTok
                                                    </button>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                }
                            </dl>
                            
                        </div>
                        
                    </div>
                </main>
            </div>
        </Container>
    )
}