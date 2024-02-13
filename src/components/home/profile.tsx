import React from 'react'
import { Container } from '../shared/container'
import { useRouter } from 'next/router';
import { PageLoader } from '@/components/shared/loader';
import { useAuth } from '@/pages/api/auth/auth'
import useAccountStatus from '@/hooks/useAccountStatus';

export function ProfilePageComponent() {

    const { user, stripeRole, logout, userData, loginWithTikTok } = useAuth()
    const { accountStatus } = useAccountStatus()
    const router = useRouter();

    return (
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-0 xl:pb-24"}>
            <div className="mx-auto max-w-2xl lg:flex lg:gap-x-16 lg:px-8 py-8 standard-component-border w-full">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0 ">
                    <div className="mx-auto max-w-2xl space-y-10 lg:mx-0 lg:max-w-none">
                        <div>
                            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Basic Profile Information</h2>
                            <p className=" text-sm leading-6 text-gray-500 lg:text-base">
                                Basic information assosciated with your profile
                            </p>

                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div className="pt-6 sm:flex">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Email</dt>
                                    <dd className=" flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-700 text-sm lg:text-base">{user?.email}</div>
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={() => logout()}>
                                            Logout
                                        </button>
                                    </dd>
                                </div>
                                <div className="pt-6 sm:flex">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Subscription</dt>
                                    <dd className=" flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-900 capitalize text-sm lg:text-base">{stripeRole ? stripeRole : 'Base'}</div>
                                        {stripeRole == 'premium' ? 
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={() => {window.open(`${process.env.NEXT_PUBLIC_STRIPE_NO_CODE_PORATL}`)}}>
                                            Manage
                                        </button>
                                        :
                                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                            onClick={() => router.push('/about/pricing')}>
                                            Upgrade
                                        </button>
                                        }
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div>
                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div className="pt-6 flex justify-between items-center">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Monthly Usage Remaining</dt>
                                    <dd className=" flex gap-x-6 sm:mt-0">
                                        <div className="text-gray-700 text-sm lg:text-base">{userData?.tokens}</div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        {user && userData?.tiktokAccessToken && accountStatus !== 'creator' ? 
                        <div className={accountStatus == 'creator' ? 'hidden' : 'block'}>
                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
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
                        <div className={accountStatus == 'creator' ? 'hidden' : 'block'}>
                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
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
                    </div>
                </main>
            </div>
        </Container>
    )
}

