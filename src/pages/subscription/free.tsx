import Link from 'next/link'
import { Raleway } from 'next/font/google'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Title } from '@/components/shared/title'
import { Button } from '@/components/shared/button'
import { useAuth } from '../api/auth/auth'
import { createFreeCheckoutSession } from '../api/stripe/stripeFree'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Loader } from '@/components/shared/loader'
const raleway = Raleway({subsets: ['latin']})

const features = [
    {
    name: 'Save Recipes',
    description: 'Save cooking videos by entering the link and receiving a easy-to-read text recipe',
    },
  {
    name: '3 Recipes Per Month',
    description: 'Transcribe 3 cooking videos to text recipes each month',
  },
  {
    name: '10 Minute Videos',
    description: 'Free Zesti gets to upload videos with a max length of 30 minutes for each video-to-text',
  },

]

export default function Essential() {
    
    const { user, stripeRole } = useAuth()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const router = useRouter();

    const FreeClick = async () => {
        setIsLoading(true);
        await createFreeCheckoutSession(user?.uid)
        setIsLoading(false)
    }

  return (
    <>
    <Head>
        <title>Zesti AI Free | Save Cooking Videos as Text Recipes | $0 </title>
        <meta name="description" content="Subscribe to Zesti Free to gain no cost access to save cooking videos as text recipes. Try for free. No credit card required."/>
    </Head>
    <div className="bg-white">
    {/* Header */}
    <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        {/* Background */}
        <div
        className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        aria-hidden="true"
        >
        <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
            clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
        />
        </div>

        {/* Header section */}
        <div className="px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
            <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight font-bold text-heading-1 mt-6">     
                <span className="text-black">Zesti</span>       
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2">Free</span>
            </h1>
            <div className="mt-6 text-lg leading-8 text-gray-700">
                Zesti Free is our no cost, free-to-use subscription model that lets users who are unsure explore the platform with no commitment 
            </div>
            <div className="mt-6 space-x-1 text-base">
                <span className="text-gray-500">Curious about results? Check out this</span>
                <Link href="/demo" className="underline text-primary-main hover:text-primary-alt font-bold">example</Link>
            </div>
        </div>
        </div>

        {/* Description Section */}
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-primary-main">Free</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What You Get</p>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                    Our free to use model comes with the least features but will let you explore some basic features Zesti offers
                    </p>
                </div>
                <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
                    {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                        <dt className="font-semibold text-gray-900">
                        <CheckIcon className="absolute left-0 top-1 h-5 w-5 text-color-alt-green" aria-hidden="true" />
                        {feature.name}
                        </dt>
                        <dd className="mt-2">{feature.description}</dd>
                    </div>
                    ))}
                </dl>
                </div>
            </div>
        </div>
        <div className="border w-full lg:w-1/2 rounded-2xl border-gray-300 mb-12">
            <div className="px-6 py-20 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <Title className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Get Started with
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-main from-20% via-primary via-30% to-color-alt-red pl-2 pr-2">Zesti</span>
                    </Title>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                    Try Zesti for free or check out our other models if you need more
                </p>
                {user ? 
                <div className="inline-flex mt-10 space-x-6 items-center justify-center">
                    { (isLoading == false) ?
                    <Button buttonType="button" onClick={() => router.push("/pricing")} text="Upgrade" className="text-center"/>
                    : 
                    <Loader/>
                    }
                    <button type="button" onClick={FreeClick} className="text-sm font-semibold leading-6 text-primary-main hover:text-primary-alt">
                        Try for Free <span aria-hidden="true">→</span>
                    </button>
                </div>
                : (stripeRole == 'premium' || stripeRole == 'essential' || stripeRole == 'base' || stripeRole == 'free') ?
                <div className="mt-10 space-x-6 items-center justify-center">
                    <Button buttonType="button" onClick={() => router.push("/dashboard")} text="Go to Dashboard" className="mt-4 text-center"/>
                </div>
                :
                <div className="mt-10 space-x-6 items-center justify-center">
                    <Button buttonType="button" onClick={() => router.push("/login")} text="Get Started" className="mt-4 text-center"/>
                    <Link href="/login" className="text-sm font-semibold leading-6 text-primary-main hover:text-primary-alt">
                    Sign Up <span aria-hidden="true">→</span>
                    </Link>
                </div>
                }
                </div>
            </div>
        </div>
    </main>
    </div>
    </>
  )
}
