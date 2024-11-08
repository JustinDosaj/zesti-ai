import { TbMenu2 } from "react-icons/tb";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from "next/link"

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function DropDownMenuMobile({navItems}: any) {

    return(
        <Menu as="div" className={`relative inline-block text-left lg:invisible mt-3`}>
            <div>
                <Menu.Button className="flex items-center rounded-full text-black hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <TbMenu2 className="h-8 w-8" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >   
                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">

                        {navItems.map((item: any)=> (
                            <Menu.Item key={item.text}>
                            {({ active }) => (
                                <Link
                                href={item.href}
                                className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                )}
                                >
                                    <span className="inline-flex gap-x-2 items-center">
                                        <item.icon className="h-5 w-5 text-primary-main"/>
                                        {item.text}
                                    </span>
                                </Link>
                                
                            )}
                            </Menu.Item>
                        ))}
                            
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export function DropDownMenuDesktop({navItems}: any) {
    return(
    <Menu as="div" className="relative">
        <Menu.Button as="div" className="flex items-center cursor-pointer">
            <TbMenu2 className="w-9 h-9 text-gray-500 hover:text-gray-300" />
        </Menu.Button>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 mt-4 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                {navItems.map((item: any, index: number) => (
                    <Menu.Item key={index}>
                        {({ active }) => (
                            <Link href={item.href}
                                className={`${
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex items-center px-4 py-2 text-sm`}
                            >
                                <span className="inline-flex gap-x-2 items-center">
                                    <item.icon className="h-5 w-5 text-primary-main"/>
                                    {item.text}
                                </span>
                            </Link>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Transition>
    </Menu>
    )
}