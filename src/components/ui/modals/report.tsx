"use client;"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { SendRecipeErrorReport } from '@/pages/api/firebase/functions'
import { useState } from 'react'

interface ModalProps {
  title: string,
  text: string,
  isOpen: any,
  setIsOpen: any,
  recipe_id: string,
  user_id: string | null,
}


export function ErrorReportModal({title, text, isOpen, setIsOpen, recipe_id, user_id}: ModalProps) {

  const cancelButtonRef = useRef(null)
  const [ message, setMessage ] = useState<string>('')

  const onButtonClick = async () => {
    await SendRecipeErrorReport(message, user_id, recipe_id)
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
                  <div className='border-red-600/50 mx-auto flex h-12 w-12 items-center justify-center border rounded-full'>
                    <ExclamationTriangleIcon className='text-red-600 h-8 w-8' aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-xl lg:text-2xl font-semibold leading-6 text-gray-900 capitalize">
                      {title}
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-base lg:text-base text-gray-600">
                        {text}
                      </p>
                    </div>
                  </div>
                </div>
                
                <textarea className="border w-full py-1 rounded-lg mt-4 pl-2 text-gray-700 text-base" 
                  placeholder="(Optional) Description of problem"
                  onChange={(e) => setMessage(e.target.value)}
                />
                  
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={onButtonClick}
                  >
                    { "Send Report" }
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