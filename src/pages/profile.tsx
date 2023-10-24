import { Container } from "@/components/shared/container"
import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { Raleway } from 'next/font/google'
import { Button, AltButton } from "@/components/shared/button"
import { useAuth } from "./api/auth/auth"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { getSubscription, getUserData } from "./api/firebase/functions"

const raleway = Raleway({subsets: ['latin']})


export default function Profile() {

    const { user, logout, isLoading, stripeRole } = useAuth();
    const [onFirstLoad, setOnFirstLoad] = useState<boolean>(true)
    const [tokens, setTokens] = useState<number>(0)
    const router = useRouter();

    async function onFirstPageLoad() {
        const response = await getSubscription(user?.uid)
        const userData = await getUserData(user?.uid)
        setTokens(userData ? userData.tokens : 0)
        setOnFirstLoad(false)
      }
  
      useEffect( () => {
        if(user == null && isLoading == false) {
          router.push('/')
        } else if (user !== null && isLoading == false && onFirstLoad == true) {
          onFirstPageLoad()
        }
      }, [user, onFirstPageLoad])

    return(
    <>
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
     <Container className={" justify-center lg:gap-12 h-screen"}>
        <div className="lg:col-start-1 lg:row-end-1 mx-auto mt-36 w-full md:w-1/2">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <p className="mt-2 text-2xl md:text-4xl font-bold tracking-tight text-gray-900">
                Manage Profile
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                <div className="flex-auto pl-6 pt-6 ">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">Tokens Available</dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">{tokens}</dd>
                </div>
                <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Status</dt>
                    <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-base font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {stripeRole ? stripeRole : 'free'}
                    </dd>
                </div>
                </dl>
                <div className="grid grid-cols-1 md:grid-cols-2 space-x-0 md:space-x-4 space-y-2 md:space-y-0 mt-6 border-t px-6 py-6">
                    <AltButton buttonType="button" text="Manage" onClick={() => {window.open("https://billing.stripe.com/p/login/test_6oEeY05261fY7a8000")}}/>
                    <Button buttonType="button" text='Logout' onClick={() => logout()}/>
                </div>
            </div>
        </div>
     </Container>
     </main>
    </>
    )
}