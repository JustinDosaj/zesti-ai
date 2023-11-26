"use client;"

import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { XMarkIcon, TrashIcon, UserCircleIcon, SquaresPlusIcon, UsersIcon, EnvelopeIcon, PaperAirplaneIcon, PlusIcon } from '@heroicons/react/20/solid'
import { deleteRecipe } from '@/pages/api/firebase/functions'
import { useAuth } from '@/pages/api/auth/auth'
import React, { useState } from 'react'
import { Button } from './button'


interface Props {
    isOpen: boolean,
    setIsOpen: any,
    success: boolean,
    message: any,
}

export function InputResponseModal({isOpen, setIsOpen, success, message}: Props) {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
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
                { success == true ? 
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-color-alt-green" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Transcription Started
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
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
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Link
                    className="inline-flex w-full justify-center rounded-md bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
    console.log("User and other: ", user?.uid, recipeId)
    setIsLoading(true)
    await deleteRecipe(user?.uid, recipeId)
    setIsLoading(false)
    setIsOpen(false)
  }

  return(
  <>
  <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setIsOpen}>
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <TrashIcon className="h-6 w-6 text-color-alt-red" aria-hidden="true" />
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
                    className="inline-flex w-full justify-center rounded-md bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt sm:col-start-2"
                    onClick={() => {setIsOpen(false)}}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setLoginPrompt}>
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
                    className="inline-flex w-full justify-center rounded-md bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    href="/login"
                    onClick={() => {setLoginPrompt(false)}}
                  >
                    Login or Sign up
                  </Link>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
      <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setIsOpen}>
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
                    <textarea
                        value={userInput}
                        onChange={(e) => {setUserInput(e.target.value)}}
                        className="text-gray-500 whitespace-normal w-full bg-gray-100 mt-2"
                    />
                  </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    className="inline-flex w-full justify-center rounded-md bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt sm:col-start-2"
                    onClick={() => {onAddToRecipeClick()}}
                  >
                    {`Add ${addType}`}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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

interface AdvancedControlsProps {
  isOptionsOpen: boolean,
  setIsOptionsOpen: any,
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: any,
}

export function AdvancedControlsModal({isOptionsOpen, setIsOptionsOpen, setUserInput, onSubmit} : AdvancedControlsProps) {

  const cancelButtonRef = useRef(null)
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [mealType, setMealType] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [servings, setServings] = useState('');
  const [skillLevel, setSkillLevel] = useState('');

  const handleAddIngredient = () => {
    if (ingredientInput) {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput('');
    }
  };
  
  // To remove an ingredient
  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleCloseModal = () => {
    setIngredients([])
    setIngredientInput('')
    setMealType('')
    setRecipeTime('')
    setServings('')
    setSkillLevel('')
    setIsOptionsOpen(false)
  }

  const handleAdvancedSubmit = () => {
    
    const userInputValue = `Ingredients: ${ingredients.join(', ')}, Meal Type: ${mealType}, Recipe Time: ${recipeTime} minutes, Servings: ${servings}, Skill Level: ${skillLevel}`;

    onSubmit(userInputValue)

    setIngredients([])
    setIngredientInput('')
    setMealType('')
    setRecipeTime('')
    setServings('')
    setSkillLevel('')
    setIsOptionsOpen(false)
  }

  return(
    <Transition.Root show={isOptionsOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setIsOptionsOpen}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                    <UserCircleIcon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      More Options
                    </Dialog.Title>
                    <p className="text-sm text-gray-500 p-4">
                      Enter the following information for more output control or leave sections blank to let Zesti get creative
                    </p>
                  </div>
                  {/*Form Adjust STARTS*/}
                  <div className="space-y-8 pb-8">
                    <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                        <input type="text" className="w-full py-2 outline-none bg-transparent text-gray-700"
                          value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()} placeholder="Add Ingredients"/>
                        <button className="min-w-max pr-4 pl-2 border-l border-box-border inline-flex" onClick={handleAddIngredient}>
                            <PlusIcon className="h-6 w-6 text-black"/>                                                             
                        </button>
                    </div>
                    <div className={ingredients.length > 0 ? `border-b pb-2 rounded items-center` : `hidden`}>
                      {ingredients.map((ingredient, index) => (
                        <div key={index} className="inline-flex border p-2 rounded-3xl mr-1 mb-1 text-gray-700">
                          {ingredient}
                          <button onClick={() => handleRemoveIngredient(index)}>
                            <XMarkIcon className="ml-1 h-5 w-5 text-red-600"/>
                          </button>
                        </div>
                      ))}
                    </div>
                      <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                        <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="p-2 w-full bg-transparent mr-2 text-gray-700 outline-none">
                          <option value="">Select Type</option>
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                          <option value="snack">Snack</option>
                        </select>
                      </div>
                      <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                        <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} className="p-2 w-full bg-transparent mr-2 rounded-xl text-gray-700 outline-none">
                          <option value="">Skill</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="expert">Expert</option>
                          <option value="professional">Professional</option>
                        </select>
                      </div>

                    <div className="flex justify-between space-x-4">
                      <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                        <input type="number" value={recipeTime} onChange={(e) => setRecipeTime(e.target.value)} placeholder="Time" className="p-2 w-full bg-transparent outline-none text-gray-700"/>
                      </div>
                      <div className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body focus-within:border-primary">
                        <input type="number" value={servings} onChange={(e) => setServings(e.target.value)} placeholder="Servings" className="p-2 w-full bg-transparent outline-none text-gray-700"/>
                      </div>
                    </div>
                  </div>
                  {/*Form Adjust END*/}
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={handleAdvancedSubmit}
                  >
                    Create Recipe
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={handleCloseModal}
                    ref={cancelButtonRef}
                  >
                    Exit/Reset
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