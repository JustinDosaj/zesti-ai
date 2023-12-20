import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon, VideoCameraIcon, PlusIcon, StarIcon, XMarkIcon, CheckIcon, XCircleIcon  } from '@heroicons/react/20/solid'
import { Container } from '../shared/container';
import { UpgradeToPremiumModal } from '../shared/modals';

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

interface IngredientPopOutMenuProps {
    setEditingIngredientIndex: React.Dispatch<React.SetStateAction<number | null>>;
    index: number,
    onSave: (index: number) => void,
    role: string | null,
    setPremiumPrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

export function IngredientPopOutMenu({setEditingIngredientIndex, index, onSave, role, setPremiumPrompt}: IngredientPopOutMenuProps) {

    const handleEditClick = () => {
        if(role == 'premium') {
            setEditingIngredientIndex(index)
        }
        else { setPremiumPrompt(true) }
    }

    const handleConfirmDeleteClick = () => {
        if(role == 'premium') {
            onSave(index)
        }
        else { setPremiumPrompt(true) }
    }
  
    return(
    <>
    <Menu as="div" className="relative ml-auto">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
            {({ active }) => (
                <button
                    onClick={handleEditClick}
                    className={classNames(
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900 w-full'
                    )}
                    >
                    <div className="flex items-center gap-x-2">
                        {role == 'premium' ? <PencilSquareIcon className="text-gray-600 h-4 w-4"/> : <StarIcon className="text-yellow-400 h-4 w-4"/>}
                        <span className="text-sm text-gray-600">Edit</span>
                    </div>
                </button>
            )}
            </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <button
                        onClick={handleConfirmDeleteClick}
                        className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900 w-full'
                        )}
                        >
                        <div className="flex items-center gap-x-2">
                            <TrashIcon className="text-color-alt-red h-4 w-4"/>
                            <span className="text-sm text-gray-600">Delete</span>
                        </div>
                    </button>
                )}
                </Menu.Item>
            </Menu.Items>
        </Transition>
    </Menu>
    </>
    )
}

interface EditIngredientProps {
    ingredient: string,
    isEditing: boolean,
    setEditingIngredientIndex: React.Dispatch<React.SetStateAction<number | null>>;
    index: number,
    onSave: (index: number, newValue: string) => void,
}

export function EditIngredientInput({ingredient, isEditing, setEditingIngredientIndex, index, onSave,}: EditIngredientProps) {

    const [ input, setInput ] = useState<string>(ingredient)

        // Handles the cancel button action
        const handleCancel = () => {
            setInput(ingredient); // Reset the input to the original ingredient
            setEditingIngredientIndex(null); // Exit editing mode
        };
    
        // Handles the save button action
        const handleSave = () => {
            onSave(index, input); // Call the onSave function passed from the parent component
            setEditingIngredientIndex(null); // Exit editing mode
        };
    
    if (!isEditing) {
        return(
            <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="text-gray-500 overflow-ellipsis whitespace-normal">{ingredient}</p>
            </div>
        )
    }
    else {
        return(
            <div className="flex-1 truncate px-4 py-2 text-sm">
                <textarea
                    value={input}
                    onChange={(e) => {setInput(e.target.value)}}
                    className="text-gray-500 whitespace-normal w-full"
                />
                <div className="flex justify-start space-x-2 mt-2">
                    <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded inline-flex items-center">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="bg-primary-main hover:bg-primary-alt text-white font-semibold py-1 px-3 rounded inline-flex items-center">
                        Save
                    </button>
                </div>
            </div>
        )
    }
}

interface InstructionPopOutProps {
    setEditingInstructionIndex: React.Dispatch<React.SetStateAction<number | null>>
    index: number,
    onSave: (index: number) => void,
    role: string | null,
    setPremiumPrompt: React.Dispatch<React.SetStateAction<boolean>>
}

export function InstructionPopOutMenu({setEditingInstructionIndex, index, onSave, role, setPremiumPrompt}: InstructionPopOutProps) {

    const handleEditClick = () => {
        if(role == 'premium') {
            setEditingInstructionIndex(index)
        } else { setPremiumPrompt(true) }
    }

    const handleConfirmDeleteClick = () => {
        if(role == 'premium') {
            onSave(index)
        } else { setPremiumPrompt(true) }
    }

    return(
    <>
    <Menu as="div" className="relative ml-auto">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
            {({ active }) => (
            <button
                onClick={handleEditClick}
                className={classNames(
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900 w-full'
                )}
                >
                <div className="flex items-center gap-x-2">
                    {role == 'premium' ? <PencilSquareIcon className="text-gray-600 h-4 w-4"/> : <StarIcon className="text-yellow-400 h-4 w-4"/>}
                    <span className="text-sm text-gray-600">Edit</span>
                </div>
            </button>
            )}
            </Menu.Item>
            <Menu.Item>
            {({ active }) => (
            <button
                onClick={handleConfirmDeleteClick}
                className={classNames(
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900 w-full'
                )}
                >
                <div className="flex items-center gap-x-2">
                    <TrashIcon className="text-color-alt-red h-4 w-4"/>
                    <span className="text-sm text-gray-600">Delete</span>
                </div>
            </button>
            )}
            </Menu.Item>
        </Menu.Items>
        </Transition>
    </Menu>
    </>
    )
}

interface EditInstructionProps {
    instruction: string,
    isEditing: boolean,
    setEditingIngredientIndex: React.Dispatch<React.SetStateAction<number | null>>;
    index: number,
    onSave: (index: number, newValue: string) => void,
}

export function EditInstructionInput({instruction, isEditing, setEditingIngredientIndex, index, onSave}: EditInstructionProps) {

    const [ input, setInput ] = useState<string>(instruction)

        // Handles the cancel button action
        const handleCancel = () => {
            setInput(instruction); // Reset the input to the original ingredient
            setEditingIngredientIndex(null); // Exit editing mode
        };
    
        // Handles the save button action
        const handleSave = () => {
            onSave(index, input); // Call the onSave function passed from the parent component
            setEditingIngredientIndex(null); // Exit editing mode
        };
    
    if (!isEditing) {
        return(
            <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="text-gray-500 overflow-ellipsis whitespace-normal">{instruction}</p>
            </div>
        )
    }
    else {
        return(
            <div className="flex-1 truncate px-4 py-2 text-sm">
                <textarea
                    value={input}
                    onChange={(e) => {setInput(e.target.value)}}
                    className="text-gray-500 whitespace-normal w-full"
                />
                <div className="flex justify-start space-x-2 mt-2">
                    <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded inline-flex items-center">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="bg-primary-main hover:bg-primary-alt text-white font-semibold py-1 px-3 rounded inline-flex items-center">
                        Save
                    </button>
                </div>
            </div>
        )
    }
}

interface RecipeTitleProps {
    recipe: any,
    url: string,
    handleSaveTitle: (newValue: string) => Promise<void>,
    role: string | null,
}

export function RecipeTitle({recipe, url, handleSaveTitle, role}: RecipeTitleProps) {

    const [ editMode, setEditMode ] = useState<boolean>(false)
    const [ newTitle, setNewTitle ] = useState<string>(recipe?.name)

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-36 animate-fadeInFast"}>
        <div className="bg-white py-5 border w-full rounded-3xl p-4 md:p-12">
            <div className="md:flex md:space-x-4">
                <div className="min-w-0 flex-1 space-y-4 xs:space-y-3">
                    <div className="flex justify-center xs:justify-start space-x-2">
                        {editMode == false ?
                            <div className="grid grid-cols-1 xs:inline-flex items-center gap-x-2 flex-wrap xs:flex-nowrap text-center xs:text-left gap-y-1 xs:space-y-0">
                                <span className="text-2xl font-semibold text-gray-900">
                                    {recipe?.name}
                                </span>
                                <button onClick={() => {setEditMode(true)}} className="inline-flex items-center gap-x-1 text-sm mx-auto text-gray-600 hover:text-gray-500">
                                    <PencilSquareIcon className="h-5 w-5 cursor-pointer" />
                                    <p className="xs:hidden">Edit Recipe Name</p>
                                </button>
                            </div>
                        :
                            <div className="inline-flex items-center gap-x-2 flex-wrap text-center space-y-1 xs:space-y-0">
                                <input
                                    value={newTitle}
                                    onChange={(e) => {setNewTitle(e.target.value)}}
                                    className="w-full sm:w-[500px] p-1 text-center font-semibold text-xl border rounded-3xl border-gray-700 text-gray-600"
                                    placeholder={recipe?.name}
                                />
                                <div className="mx-auto items-center inline-flex space-x-3">
                                    <CheckIcon onClick={() => {
                                        handleSaveTitle(newTitle)
                                        setEditMode(false)
                                    }} 
                                        className="h-6 w-6 cursor-pointer text-green-600 hover:text-gray-500" />
                                    <XMarkIcon onClick={() => {setEditMode(false)}} className="h-7 w-7 cursor-pointer text-red-600 hover:text-gray-500" />
                                </div>
                            </div>
                        }
                    </div>
                    <div className="grid grid-cols-2 xs:inline-flex gap-x-2 text-center">
                        {recipe.time != null && (
                        <p className="bg-green-600 rounded-3xl text-white text-sm p-1 md:p-1.5">{`${recipe?.time} Minutes`}</p>
                        )}
                        {recipe.servings != null && (
                        <p className="bg-green-600 rounded-3xl text-white text-sm p-1 md:p-1.5">{`${recipe?.servings} Servings`}</p>
                        )}
                    </div>
                    <p className="text-gray-500 text-center sm:text-left">
                        {`${recipe?.description}`}
                    </p>
                </div>
                { url !== '' ?
                    <button onClick={() => window.open(url)}
                    className="mt-4 md:mt-0 inline-flex text-primary-main h-fit border-primary-main border rounded-lg p-2 transition bg-white hover:text-white hover:bg-primary-main"
                    >
                    <div className="flex gap-x-2">
                        <VideoCameraIcon className="h-6 w-6"/>
                        <p>Original Recipe</p>
                        </div>
                    </button>
                    :
                    <div></div>
                }
            </div>
        </div>
    </Container>
    )
}

interface IngredientListProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAddType: React.Dispatch<React.SetStateAction<string>>;
    recipe: any,
    editingIngredientIndex: number | null,
    setEditingIngredientIndex: React.Dispatch<React.SetStateAction<number | null>>
    handleDeleteIngredient: (index: number) => Promise<void>;
    handleSaveIngredient: (index: number, newValue: string) => Promise<void>;
    role: string | null,
}

export function IngredientList({setIsOpen, setAddType, recipe, editingIngredientIndex, setEditingIngredientIndex, handleDeleteIngredient, handleSaveIngredient, role}: IngredientListProps) {

    const [premiumPrompt, setPremiumPrompt] = useState<boolean>(false)

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 animate-fadeInFast"}>
        <UpgradeToPremiumModal premiumPrompt={premiumPrompt} setPremiumPrompt={setPremiumPrompt}/>
        <div className="my-auto w-full bg-white py-5 border rounded-3xl p-4 md:p-12">
          <div className="flex pt-4 pb-4 justify-between items-center">
            <h2 className="text-lg sm:text-xl font-medium text-gray-500">Ingredients {`(${recipe?.ingredients?.length})`}</h2>
            { role == 'premium' ? 
            <button className="hidden xs:inline-flex space-x-1 add-ingredient-instuction-btn" onClick={() => {
              setIsOpen(true)
              setAddType('ingredient')
            }}>
              <PlusIcon className="text-gray-700 h-4 w-4"/>
              <span className="text-gray-700">Add Ingredient</span>
            </button>
            :
            <button className="hidden xs:inline-flex add-ingredient-instuction-btn" onClick={() => {
                setPremiumPrompt(true)
              }}>
                <StarIcon className="text-yellow-400 h-4 w-4"/>
                <span className="text-gray-700">Add Ingredient</span>
            </button>
            }
          </div>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 capitalize">
            {recipe?.ingredients?.map((ingred: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-visible w-full">
                  <div className="bg-green-600 flex w-16 flex-shrink-0 items-center justify-center rounded-l-xl font-md text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-xl border-b border-r border-t border-gray-200 bg-white min-h-[4rem]">
                    <EditIngredientInput ingredient={ingred} isEditing={editingIngredientIndex === index} setEditingIngredientIndex={setEditingIngredientIndex} index={index} onSave={handleSaveIngredient}/>
                    <IngredientPopOutMenu setEditingIngredientIndex={setEditingIngredientIndex} index={index} onSave={handleDeleteIngredient} role={role} setPremiumPrompt={setPremiumPrompt}/>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="xs:hidden flex pt-4 pb-4 justify-end">
            { role == 'premium' ? 
            <button className="inline-flex space-x-1 add-ingredient-instuction-btn" onClick={() => {
                setIsOpen(true)
                setAddType('ingredient')
            }}>
              <PlusIcon className="text-gray-700 h-4 w-4"/>
              <span className="text-sm text-gray-700">Add Ingredient</span>
            </button>
            :
            <button className="inline-flex space-x-1 add-ingredient-instuction-btn" onClick={() => {
                setPremiumPrompt(true)
              }}>
                <StarIcon className="text-yellow-400 h-4 w-4"/>
                <span className="text-sm text-gray-700">Add Ingredient</span>
            </button>
            }
          </div>
        </div>
    </Container>
    )
}

interface InstructionListProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAddType: React.Dispatch<React.SetStateAction<string>>;
    recipe: any,
    editingInstructionIndex: number | null,
    setEditingInstructionIndex: React.Dispatch<React.SetStateAction<number | null>>
    handleDeleteInstruction: (index: number) => Promise<void>;
    handleSaveInstruction: (index: number, newValue: string) => Promise<void>;
    role: string | null,
}

export function InstructionList({setIsOpen, setAddType, recipe, editingInstructionIndex, setEditingInstructionIndex, handleDeleteInstruction, handleSaveInstruction, role}: InstructionListProps) {

    const [premiumPrompt, setPremiumPrompt] = useState<boolean>(false)
    
    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 animate-fadeInFast"}>
        <UpgradeToPremiumModal premiumPrompt={premiumPrompt} setPremiumPrompt={setPremiumPrompt}/>
        <div className="my-auto bg-white py-5 border w-full rounded-3xl p-4 md:p-12 ">
          <div className="flex pt-4 pb-4 justify-between items-center">
            <h2 className="text-lg sm:text-xl font-medium text-gray-500">Instructions {`(${recipe?.instructions?.length})`}</h2>
            {role == 'premium' ? 
            <button className="hidden xs:inline-flex space-x-1 add-ingredient-instuction-btn" onClick={() => {
              setIsOpen(true)
              setAddType('instruction')
            }}>
              <PlusIcon className="text-gray-700 h-4 w-4"/>
              <span className="text-gray-700">Add Instruction</span>
            </button>
            :
            <button className="hidden xs:inline-flex space-x-1 add-ingredient-instuction-btn" onClick={() => {
                setPremiumPrompt(true)
              }}>
                <StarIcon className="text-yellow-400 h-4 w-4"/>
                <span className="text-gray-700">Add Ingredient</span>
            </button>
            }
          </div>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
            {recipe?.instructions?.map((instruct: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-visible w-full">
                  <div className="bg-[#F05B60] flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-medium text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-xl border-b border-r border-t border-gray-200 bg-white min-h-[4rem]">
                      <EditInstructionInput instruction={instruct} isEditing={editingInstructionIndex === index} setEditingIngredientIndex={setEditingInstructionIndex} index={index} onSave={handleSaveInstruction}/>
                      <InstructionPopOutMenu setEditingInstructionIndex={setEditingInstructionIndex} index={index} onSave={handleDeleteInstruction} role={role} setPremiumPrompt={setPremiumPrompt}/>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="xs:hidden flex pt-4 pb-4 justify-end">
            {role == 'premium' ? 
            <button className="inline-flex space-x-1 add-ingredient-instuction-btn" onClick={() => {
              setIsOpen(true)
              setAddType('instruction')
            }}>
              <PlusIcon className="text-gray-700 h-4 w-4"/>
              <span className="text-gray-700 text-sm">Add Instruction</span>
            </button>
            :
            <button className="inline-flex space-x-1 add-ingredient-instuction-btn" onClick={() => {
                setPremiumPrompt(true)
              }}>
                <StarIcon className="text-yellow-400 h-4 w-4"/>
                <span className="text-gray-700 text-sm">Add Ingredient</span>
            </button>
            }
          </div>
        </div>
    </Container>
    )
}
