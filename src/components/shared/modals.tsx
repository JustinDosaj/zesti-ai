"use client;"
import { Dialog, Transition } from '@headlessui/react'
import { Notify } from './notify'
import React, { useState, Fragment, useRef } from 'react'
import AdSenseDisplay from '../tags/adsense'
import { CreatorSubmitLoader } from './loader'
import Link from 'next/link'
import { CreatorAddRecipeLinkComponent, CreatorAddRecipeTextComponent, CreatorResubmitRecipeTextComponent } from '../creator/manage'
import { handleCreatorTikTokURLSubmit } from '@/pages/api/handler/submit'
import { useAuth } from '@/pages/api/auth/auth'
import { deleteCreatorError, deleteCreatorPublicRecipe } from '@/pages/api/firebase/functions'
import { ModalResponseProps } from './interface'
import { classNames } from './classNames'


interface ModalProps {
  title: string,
  text: string,
  icon: any,
  iconColor: 'green' | 'red' | 'yellow',
  href: string,
  isOpen: any,
  setIsOpen: any,
  displayAd: boolean,
  role?: string | null,
  buttonName?: string,
}

export function ResponseModal({title, text, icon: Icon, href, isOpen, setIsOpen, displayAd, role, buttonName, iconColor}: ModalProps) {

  const cancelButtonRef = useRef(null)

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
                        `border-color-alt-green`
                        ,`mx-auto flex h-12 w-12 items-center justify-center border rounded-full`)}
                  >
                    <Icon className={classNames(
                      iconColor == 'red' ? 'text-red-500' : 
                      iconColor == 'green' ? 'text-color-alt-green' :
                      iconColor == 'yellow' ? 'text-yellow-400' :
                      'text-color-alt-green'
                      ,`h-8 w-8`)}
                    aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg lg:text-xl font-semibold leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm lg:text-base text-gray-600">
                        {text}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checking subscription and ad status before displaying or not displaying ad*/}
                <div className={role !== 'premium' && displayAd ? `py-4` : `hidden`}>
                  <AdSenseDisplay adSlot="9250004753" adFormat="rectangle" widthRes="false"/>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Link
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    href={`${href}`}
                    onClick={() => setIsOpen(false)}
                  >
                    { buttonName }
                  </Link>
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


// Specific modal for creator to input required information to upload recipe to page
export function CreatorAddRecipeModal({isOpen, setIsOpen}: ModalResponseProps) {


  const { creatorData, user } = useAuth()
  const cancelButtonRef = useRef(null)
  const [ rawText, setRawText ] = useState<string>('')
  const [ url, setUrl ] = useState<string>('')
  const [ loading , setLoading ] = useState<boolean>(false)

  async function onAddToRecipeClick() {
    setLoading(true)
    await handleCreatorTikTokURLSubmit({url, rawText, creatorData})
    setUrl('')
    setRawText('')
    Notify("Adding recipe to your page")
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="space-y-4 my-auto relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl sm:p-6">
                {/* Video Object */}
                <h2 className="text-center mt-3 text-lg text-gray-700 font-semibold">Add New Recipe</h2>
                <CreatorAddRecipeLinkComponent url={url} setUrl={setUrl}/>
                <CreatorAddRecipeTextComponent rawText={rawText} setRawText={setRawText}/>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {loading == true ? 
                  <div className="sm:col-start-2">
                    <CreatorSubmitLoader/>
                  </div>
                  :
                  <button
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt sm:col-start-2"
                    onClick={() => {onAddToRecipeClick()}}
                  >
                    {`Add to Creator Page`}
                  </button>
                  }
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {
                      setUrl('')
                      setRawText('')
                      setIsOpen(false)
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
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


interface CreatorResubmitRecipeProps {
  isResubmitOpen: boolean,
  setIsResubmitOpen: any,
  url: string,
  setUrl: any,
  recipe_id: string,
}

// Specific Modal for creator when resubmitting recipe
export function CreatorResubmitRecipeModal({isResubmitOpen, setIsResubmitOpen, url, setUrl, recipe_id}: CreatorResubmitRecipeProps) {


  const { creatorData, user } = useAuth()
  const [ rawText, setRawText ] = useState<string>('')
  const cancelButtonRef = useRef(null)
  const [ loading , setLoading ] = useState<boolean>(false)

  async function onAddToRecipeClick() {
    if(rawText.length < 1) {
      Notify("Ingredients & instructions cannot be left blank")
    } else {
      setLoading(true)
      await handleCreatorTikTokURLSubmit({url, rawText, creatorData})
      await deleteCreatorError(user?.uid, recipe_id)
      setRawText('')
      setUrl('')
      Notify("Adding recipe to your page")
      setLoading(false)
      setIsResubmitOpen(false)
    }
  }

  return(
  <Transition.Root show={isResubmitOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setIsResubmitOpen}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="space-y-4 my-auto relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl sm:p-6">
                {/* Video Object */}
                <h2 className="text-center mt-3 text-lg text-gray-700 font-semibold">Resubmit Recipe</h2>
                <CreatorResubmitRecipeTextComponent rawText={rawText} setRawText={setRawText}/>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {loading == true ?
                  <div className="sm:col-start-2">
                    <CreatorSubmitLoader/>
                  </div>
                  :
                  <button
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt sm:col-start-2"
                    onClick={() => {onAddToRecipeClick()}}
                  >
                    {`Add to Creator Page`}
                  </button>
                  }
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {
                      setRawText('')
                      setIsResubmitOpen(false)
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
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

interface DeleteConfirmationModalProps {
  isDeleteOpen: boolean,
  setIsDeleteOpen: any,
  recipe_id: string,
}

export function DeleteConfirmationModal({isDeleteOpen, setIsDeleteOpen, recipe_id}: DeleteConfirmationModalProps) {


  const { user } = useAuth()
  const cancelButtonRef = useRef(null)
  const [ loading, setLoading ] = useState<boolean>(false)

  const onConfirmDeleteClick = async () => {
    setLoading(true)
    await deleteCreatorPublicRecipe(user?.uid, recipe_id)
    setLoading(false)
    setIsDeleteOpen(false)
    Notify(`Recipe ID: ${recipe_id} Deleted`)
  }

  return(
  <Transition.Root show={isDeleteOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setIsDeleteOpen}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="space-y-8 my-auto relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl sm:p-6">
                {/* Video Object */}
                <h2 className="text-center mt-3 text-lg text-gray-700 font-semibold">Are you sure you want to continue?</h2>
                <div className="mt-8 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {loading == true ? 
                  <div className="sm:col-start-2">
                    <CreatorSubmitLoader/>
                  </div>
                  :
                  <button
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt sm:col-start-2"
                    onClick={onConfirmDeleteClick}
                  >
                    {`Confirm Delete`}
                  </button>
                  }
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {setIsDeleteOpen(false)}}
                    ref={cancelButtonRef}
                  >
                    Cancel
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