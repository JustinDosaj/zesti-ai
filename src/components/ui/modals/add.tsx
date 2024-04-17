"use client;"
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef } from 'react'
import { LinkIcon } from '@heroicons/react/20/solid'
import { useAuth } from '@/pages/api/auth/auth'
import { useState } from 'react'
import { handleUserSubmitRecipe } from '@/pages/api/handler/submit'
import { ButtonLoader, Loader } from '@/components/shared/loader'

interface ModalProps {
  title: string,
  text: string,
  icon: any,
  isOpen: any,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


export function AddModal({title, text, icon: Icon, isOpen, setIsOpen}: ModalProps) {

    const cancelButtonRef = useRef(null)

    const { user } = useAuth()
    const [ url, setUrl ] = useState<string>('')
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const onButtonClick = async () => {
        setIsLoading(true)
        await handleUserSubmitRecipe({url, setUrl, user})
        setIsLoading(false)
        setIsOpen(false)
        setUrl('')
    }

    return(
        <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setIsOpen}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:min-h-full">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 w-full">
                    <div>
                    <div className={'border-primary-main/50 mx-auto flex h-12 w-12 items-center justify-center border rounded-full'}>
                        <Icon className={'text-primary-main h-8 w-8'} aria-hidden="true" />
                    </div>
                    <div className="mt-1 text-center space-y-2">
                        <Dialog.Title as="h3" className="text-xl lg:text-2xl font-semibold leading-6 text-gray-900 capitalize">
                        {title}
                        </Dialog.Title>
                        <div className="">
                        <p className="text-sm lg:text-base text-gray-600">
                            {text}
                        </p>
                        </div>
                        <div className="pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                            <span className="min-w-max pr-2 border-r border-box-border">
                                <LinkIcon className="h-5 w-5 text-black"/>                                                             
                            </span>
                            <input type="text" onChange={(e) => setUrl(e.target.value)} required={true} name="FULLNAME" placeholder="https://www.tiktok.com/@britscookin/video/7290713603299331374" className="w-full py-2.5 outline-none bg-transparent text-gray-500 text-sm"/>
                        </div>
                    </div>
                    </div>

                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                        className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        onClick={onButtonClick}
                        disabled={isLoading}
                    >
                        {isLoading ? <ButtonLoader/> : "Add Recipe"}
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => {setIsOpen(false)}}
                        ref={cancelButtonRef}
                    >
                        Return
                    </button>
                    </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}