"use client;"
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef } from 'react'
import { classNames } from '@/components/shared/classNames'
import AdSenseDisplay from '@/components/tags/adsense'

interface ModalProps {
  title: string,
  text: string,
  icon: any,
  iconColor: 'green' | 'red' | 'yellow' | 'orange',
  modalFunction: () => void,
  isOpen: any,
  setIsOpen: any,
  displayAd: boolean,
  role?: string | null,
  buttonName?: string,
}


export function ResponseModal({title, text, icon: Icon, modalFunction, isOpen, setIsOpen, displayAd, role, buttonName, iconColor}: ModalProps) {

  const cancelButtonRef = useRef(null)

  const onButtonClick = () => {
    modalFunction()
    setIsOpen(false)
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className={classNames(
                        iconColor == 'red' ? 'border-red-500/50' :
                        iconColor == 'yellow' ? 'border-yellow-400/50' :
                        iconColor == 'green' ? 'border-color-alt-green/50' :
                        iconColor == 'orange' ? 'border-primary-main/50' :
                        `border-color-alt-green`
                        ,`mx-auto flex h-12 w-12 items-center justify-center border rounded-full`)}
                  >
                    <Icon className={classNames(
                      iconColor == 'red' ? 'text-red-500' : 
                      iconColor == 'green' ? 'text-color-alt-green' :
                      iconColor == 'yellow' ? 'text-yellow-400' :
                      iconColor == 'orange' ? 'text-primary-main' :
                      'text-color-alt-green'
                      ,`h-8 w-8`)}
                    aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-xl lg:text-2xl font-semibold leading-6 text-gray-900 capitalize">
                      {title}
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-sm lg:text-base text-gray-600">
                        {text}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checking subscription and ad status before displaying or not displaying ad*/}
                <div className={role !== 'premium' && displayAd ? `pt-6 pb-4` : `hidden`}>
                  <AdSenseDisplay adSlot="9250004753" adFormat="rectangle" widthRes="false"/>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={onButtonClick}
                  >
                    { buttonName }
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