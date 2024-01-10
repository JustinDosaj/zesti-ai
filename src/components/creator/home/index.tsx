import React from 'react'
import { PageLoader } from '@/components/shared/loader'
import { PencilIcon, ComputerDesktopIcon, Cog6ToothIcon } from "@heroicons/react/20/solid"
import { Container } from '@/components/shared/container'
import Link from 'next/link'

function classNames(...classes: (string | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

export function CreatorTools({tiktokDisplayName}: any) {

    const stats = [
        { 
            id: 1, 
            name: tiktokDisplayName !== '' ? 'View Page' : 'Setup Page', 
            icon: tiktokDisplayName !== '' ? ComputerDesktopIcon : Cog6ToothIcon, 
            colorType: 'yellow', 
            href: tiktokDisplayName !== '' ? `/${tiktokDisplayName}` : `/creator/settings`, 
            desc: tiktokDisplayName !== '' ? "See what your page looks like to others" : 'Setup your creator page by connecting tiktok',
            buttonText: tiktokDisplayName !== '' ? `View Your Page` : `Setup`,
        },
        { 
            id: 2, 
            name: 'Edit Creator Page', 
            icon: PencilIcon, 
            colorType: 'red', 
            href: '/creator/page', 
            desc: "Make changes to your bio, social links and more",
            buttonText: 'Edit', 
        },
        { 
            id: 3, 
            name: 'Add Recipe', 
            icon: ComputerDesktopIcon, 
            colorType: 'green', 
            href: '/creator/add-recipe', 
            desc: "Quickly showcase readilbe recipes for your users",
            buttonText: 'Add Recipe', 
        },
      ]
    
      if (!tiktokDisplayName) return <PageLoader/>

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
    <div className="w-full">
      <dl className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-1 xl:grid-cols-3">
        {stats.map((item) => (
        <div key={item.id}>
            <Link href={item.href} className="">
                <div
                    key={item.id}
                    className="relative overflow-hidden rounded-3xl bg-white px-4 pb-12 pt-5 orange-border-shadow sm:px-6 sm:pt-6 hover:bg-gray-200 hover:ease-in hover:duration-100"
                >
                    <dt>
                    <div className={classNames(item.colorType == 'green' ? 'bg-color-alt-green bg-opacity-80' : item.colorType == 'yellow' ? 'bg-yellow-400' : item.colorType == 'red' ? 'bg-red-400' : 'bg-color-alt-green bg-opacity-80', `absolute rounded-xl p-3`)}>
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-lg font-semibold text-black">{item.name}</p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-sm sm:text-base text-gray-900">{item.desc}</p>
                    <div className="flex justify-center absolute inset-x-0 bottom-0 bg-gray-150 px-4 py-4 sm:px-6">
                        <div className="flex justify-center font-medium cursor-pointer text-white bg-gray-900 w-full text-sm p-2 rounded-3xl hover:bg-gray-700 hover:ease-in hover:duration-100">
                            {item.buttonText}<span className="sr-only"> {item.name} stats</span>
                        </div>
                    </div>
                    </dd>
                </div>
            </Link>
          </div>
        ))}
      </dl>
    </div>
    </Container>
    )
}