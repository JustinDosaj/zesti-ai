import React from 'react'
import { PageLoader } from '@/components/shared/loader'
import { PencilIcon, ComputerDesktopIcon, Cog6ToothIcon, PlusIcon } from "@heroicons/react/20/solid"
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
            href: tiktokDisplayName !== '' ? `/${tiktokDisplayName}` : `/creator/settings`, 
            desc: tiktokDisplayName !== '' ? "See how your page looks to viewers" : 'Setup your creator page by connecting tiktok',
            buttonText: tiktokDisplayName !== '' ? `View Your Page` : `Setup`,
        },
        { 
            id: 2, 
            name: 'Edit Creator Page', 
            icon: PencilIcon, 
            href: '/creator/page', 
            desc: "Make changes to your bio, social links and more",
            buttonText: 'Edit', 
        },
        { 
            id: 3, 
            name: 'Add Recipe', 
            icon: PlusIcon, 
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
                <div key={item.id} className="h-[175px] lg:h-[200px] grid grid-cols-1 overflow-hidden rounded-3xl pb-6 bg-white pt-6 border-2 sm:px-6 sm:pt-6 hover:shadow-xl hover:ease-in hover:duration-100">
                        <item.icon className="h-10 w-10 text-gray-700 mx-auto" aria-hidden="true" />
                        <p className="truncate text-lg font-semibold text-black text-center">{item.name}</p>
                        <p className="text-sm sm:text-base text-gray-900 text-center">{item.desc}</p>
                </div>
            </Link>
          </div>
        ))}
      </dl>
    </div>
    </Container>
    )
}