"use client;"
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { XMarkIcon, TrashIcon, UserCircleIcon, SquaresPlusIcon, StarIcon, ExclamationCircleIcon, VideoCameraIcon } from '@heroicons/react/20/solid'
import { deleteRecipe } from '@/pages/api/firebase/functions'
import { useAuth } from '@/pages/api/auth/auth'
import React, { useState } from 'react'
import AdSenseDisplay from '../tags/adsense'

interface InputResponseProps {
    isOpen: boolean,
    setIsOpen: any,
    success: boolean,
    message: any,
    role: any,
}

export function InputResponseModal({isOpen, setIsOpen, success, message, role}: InputResponseProps) {

  const cancelButtonRef = useRef(null)

  return (
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
                { success == true ? 
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-color-alt-green" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg lg:text-xl font-semibold leading-6 text-gray-900">
                      Preparing Recipe
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm lg:text-base text-gray-600">
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
                :
                <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <XMarkIcon className="h-6 w-6 text-color-alt-red" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Transcription Failed
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        {message}
                        </p>
                    </div>
                    </div>
                </div>
                }
                { role !== 'premium' ?
                <div className="py-4">
                  <AdSenseDisplay adSlot="9250004753" adFormat="rectangle" widthRes="false"/>
                </div>
                :
                <div className="hidden"/>
                }
                {success == true ?
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Link
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    href="/dashboard/recipebook"
                    onClick={() => setIsOpen(false)}
                  >
                    Go to Recipes
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
                :
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Link
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    Go to Dashboard
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
              }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

interface DeleteProps {
  isOpen: boolean,
  setIsOpen: any,
  recipeId: any,
}

export function DeleteConfirmationModal({isOpen, setIsOpen, recipeId}: DeleteProps) {

  const cancelButtonRef = useRef(null)
  const { user } = useAuth()
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  async function  onClick() {
    setIsLoading(true)
    await deleteRecipe(user?.uid, recipeId)
    setIsLoading(false)
    setIsOpen(false)
  }

  return(
  <>
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
              <Dialog.Panel className="relative w-screen transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Deleting Recipe
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to continue?
                      </p>
                    </div>
                  </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt sm:col-start-2"
                    onClick={() => {setIsOpen(false)}}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => onClick()}
                    ref={cancelButtonRef}
                  >
                    Confirm Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  </>
  )
}

interface LoginProps {
  loginPrompt: boolean,
  setLoginPrompt: any,
}

export function NotLoggedInModal({loginPrompt, setLoginPrompt}: LoginProps) {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={loginPrompt} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setLoginPrompt}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                    <UserCircleIcon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Please Login to Continue
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Follow the login or sign up link to create an account
                      </p>
                    </div>
                  </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Link
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    href="/login"
                    onClick={() => {setLoginPrompt(false)}}
                  >
                    Login or Sign up
                  </Link>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {setLoginPrompt(false)}}
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

interface AddProps {
  isOpen: boolean,
  setIsOpen: any,
  addType: string,
  onSubmit: any,
}

export function AddToRecipeModal({isOpen, setIsOpen, addType, onSubmit}: AddProps) {

  const cancelButtonRef = useRef(null)
  const [userInput, setUserInput] = useState<string>('')

  async function onAddToRecipeClick() {
    onSubmit(userInput)
    setUserInput('')
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
              <Dialog.Panel className="my-auto relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <SquaresPlusIcon className="h-6 w-6 text-color-alt-green" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5 ">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 capitalize">
                      {`Add ${addType}`}
                    </Dialog.Title>
                    <span className="text-sm">{`Enter new ${addType} below`}</span>
                    <input
                        value={userInput}
                        onChange={(e) => {setUserInput(e.target.value)}}
                        className="text-gray-500 whitespace-normal w-full bg-gray-100 mt-2 p-2 rounded-lg"
                        placeholder={`Enter ${addType} here then click add`}
                    />
                  </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt sm:col-start-2"
                    onClick={() => {onAddToRecipeClick()}}
                  >
                    {`Add ${addType}`}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {
                      setUserInput('')
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


interface UpgradeToPremiumProps {
  premiumPrompt: boolean,
  setPremiumPrompt: any,
}

export function UpgradeToPremiumModal({premiumPrompt, setPremiumPrompt}: UpgradeToPremiumProps) {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={premiumPrompt} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setPremiumPrompt}>
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

        <div className="fixed inset-0 z-25 w-screen overflow-y-auto">
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
              <Dialog.Panel className="w-full relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    {/*<Image className=" mx-auto" priority={true} src="/images/zesti-logos/Zesti-Premium-2.png" width={125} height={125} alt="Zesti Premium Logo" />*/}
                    <StarIcon className="h-16 w-16 mx-auto items-center text-yellow-400 bg-yellow-400/20 m-2 p-2 rounded-full"/>
                  <div className="text-center sm:mt-5">
                    <Dialog.Title as="h3" className="mt-3 sm:mt-0 text-lg sm:text-xl font-semibold leading-6 text-gray-900">
                      This Feature Requires Zesti Premium
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Try Free for 7-Days. Cancel anytime.
                      </p>
                    </div>
                  </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Link
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    href="/pricing"
                    onClick={() => {setPremiumPrompt(false)}}
                  >
                    Start Trial
                  </Link>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {setPremiumPrompt(false)}}
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

interface CreatorAddRecipeProps {
  isOpen: boolean,
  setIsOpen: any,
  onSubmit?: any,
  addRecipe: any,
  setRawText: any,
  rawText: string,
  videoObject: any,
}

export function CreatorAddRecipeModal({isOpen, setIsOpen, addRecipe, setRawText, rawText, videoObject}: CreatorAddRecipeProps) {


  const cancelButtonRef = useRef(null)
  const [ userInput, setUserInput ] = useState<string>('')
  const [ isChecked, setIsChecked ] = useState<boolean>(false)

  async function onAddToRecipeClick() {
    //onSubmit(userInput)
    setIsOpen(false)
    addRecipe()
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
              <Dialog.Panel className="space-y-4 my-auto relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-main/20">
                    <VideoCameraIcon className="h-6 w-6 text-primary-main" aria-hidden="true" />
                  </div>
                <div className="mt-3 text-center sm:mt-5 ">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {`Add this recipe to your page?`}
                    </Dialog.Title>
                </div>

                {/* Video Object */}
                <div className="inline-flex items-center space-x-4 border-gray-300 border rounded-r-xl rounded-l-xl mt-2">
                    <img src={videoObject?.cover_image_url} className="h-16 w-16 rounded-l-xl" alt={""}/>
                    <span className="text-sm lg:text-base pr-4">{videoObject?.title}</span>
                </div>

                {/* Checkbox */}
                <div>
                  <div className="items-center inline-flex gap-2">
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={() => setIsChecked(!isChecked)}
                      className="h-5 w-5 accent-gray-600"
                    />
                    <label className="text-gray-600">Check here if video does not contain audible instructions</label>
                  </div>
                  <textarea
                          value={rawText}
                          onChange={(e) => {setRawText(e.target.value)}}
                          className={isChecked == true ? `text-gray-500 whitespace-normal w-full bg-gray-100 mt-2 p-2 rounded-lg text-sm` : `hidden`}
                          placeholder={`Enter the ingredients & instructions for recipe`}
                      />
                  <div className={isChecked == true ? `inline-flex items-center space-x-2` : `hidden`}>
                    <ExclamationCircleIcon className="h-4 w-4 text-white rounded-3xl bg-yellow-400"/>
                    <p className="text-xs text-gray-600">Do not worry about being organized, Zesti will structure the recipe for you</p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    className="inline-flex w-full justify-center rounded-3xl bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt sm:col-start-2"
                    onClick={() => {onAddToRecipeClick()}}
                  >
                    {`Submit`}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {
                      setUserInput('')
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