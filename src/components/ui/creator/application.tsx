import React from 'react'
import { Container } from '@/components/shared/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/pages/api/auth/auth'
import { AccountTitleComponent, SimpleProfileComponent } from '../auth/account';
import useRequireAuth from '@/hooks/user/useRequireAuth';

export function CreatorApplication() {

    const { user, userData } = useAuth()
    const router = useRouter();
    const require = useRequireAuth()


    return (
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-0 xl:pb-24"}>
            <div className="mx-auto max-w-2xl lg:flex lg:gap-x-16 lg:px-8 py-8 standard-component-border w-full">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                            <AccountTitleComponent title={"Creator Program Application"} desc={"Complete the following verification steps then submit your application"}/>
                            <dl className="mt-6 space-y-6 divide-y divide-gray-300 border-t border-gray-200 text-sm leading-6">
                                <ConnectTikTokComponent/>
                                { userData?.tiktok_is_verified == true && (
                                <>
                                    <SimpleProfileComponent
                                        onButtonClick={() => {window.open(`https://zesti.promotekit.com`)}} 
                                        title={"Create Affiliate Account"} 
                                        buttonName={"Setup"} 
                                    />
                                    <p className="pt-6 text-center text-sm lg:text-base"> {"After you create your affiliate account, you\n're finished! We appreciate your application and will respond within 2 business days."}</p>
                                </>
                                )
                                }
                            </dl>
                        </div>
                    </div>
                </main>
            </div>
        </Container>
    )
}

function ConnectTikTokComponent() {
    
    const { loginWithTikTok, userData, isLoading } = useAuth()

    if(!isLoading && userData?.tiktok_is_verified == true) return (
        <div className={''}>
            <dl className="space-y-6 text-sm leading-6">
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Verify TikTok Account</dt>
                    <dd className=" flex gap-x-6 sm:mt-0">
                        <p className="font-semibold text-green-600 hover:text-primary-alt text-sm lg:text-base">Verified</p>
                    </dd>
                </div>
            </dl>
        </div>
    )

    return(
        <div className={''}>
            <dl className="space-y-6 text-sm leading-6">
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Verify TikTok Account</dt>
                    <dd className=" flex gap-x-6 sm:mt-0">
                    <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={loginWithTikTok}>
                            Connect to TikTok
                        </button>
                    </dd>
                </div>
            </dl>
        </div>
    )
}