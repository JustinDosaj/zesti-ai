import { useState } from 'react'
import { Container } from '../shared/container'
import { Switch } from '@headlessui/react'
import { useAuth } from '@/pages/api/auth/auth';
import { useRouter } from 'next/router';

function classNames(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
  }

export default function ProfilePageComponent() {

    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)
    const { user, stripeRole, logout } = useAuth()
    const router = useRouter()

    return (
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-36 animate-fadeIn pb-24"}>
        <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
            <main className="px-4 sm:px-6 lg:flex-auto lg:px-0 ">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <p className="mt-2 section-title-text-size font-bold tracking-tight text-gray-900">
                Account Settings
              </p>
            </div>
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Profile Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                        Basic information assosciated with your profile
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Email</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-700 text-sm lg:text-base">{user?.email}</div>
                                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                    onClick={() => logout()}>
                                    Logout
                                </button>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Subscription</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 capitalize text-sm lg:text-base">{stripeRole ? stripeRole : 'Base'}</div>
                                {stripeRole == 'premium' ? 
                                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                    onClick={() => {window.open(`${process.env.NEXT_PUBLIC_STRIPE_NO_CODE_PORATL}`)}}>
                                    Manage
                                </button>
                                :
                                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                    onClick={() => router.push('/pricing')}>
                                    Upgrade
                                </button>
                                }
                            </dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Other</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                        More links and information
                    </p>

                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div className="pt-6 flex justify-between items-center">
                        <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Affiliate Program</dt>
                        <dd className="mt-1 flex gap-x-6 sm:mt-0">
                            <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                onClick={() => {window.open(`https://zesti.getrewardful.com/signup`)}}>
                                Join or Manage
                            </button>
                        </dd>
                        </div>
                    </dl>
                </div>
            </div>
            </main>
        </div>
        </Container>
    )
}
