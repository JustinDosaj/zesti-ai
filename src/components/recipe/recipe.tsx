import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, PencilSquareIcon, XCircleIcon, CheckIcon  } from '@heroicons/react/20/solid'


function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

interface RecipePopOutProps {
    edit: boolean,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setEditingIngredientIndex: React.Dispatch<React.SetStateAction<number | null>>;
    index: number,
    role: string | null,
}

export function RecipePopOutMenu({edit, setEdit, setEditingIngredientIndex, index, role}: RecipePopOutProps) {

    const handleEditClick = () => {
        setEditingIngredientIndex(index)
    }

    if (role == 'essential' || role == 'premium')
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
                    <PencilSquareIcon className="text-gray-600 h-4 w-4"/>
                    <span className="text-sm text-gray-600">Edit</span>
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

interface EditRecipeProps {
    edit: boolean,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    ingredient: string,
    isEditing: boolean,
    setEditingIngredientIndex: React.Dispatch<React.SetStateAction<number | null>>;
    index: number,
    onSave: (index: number, newValue: string) => void,
}

export function EditRecipeInput({edit, setEdit, ingredient, isEditing, setEditingIngredientIndex, index, onSave}: EditRecipeProps) {

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
    edit: boolean,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setEditingInstructionIndex: React.Dispatch<React.SetStateAction<number | null>>;
    index: number,
    role: string | null,
}

export function InstructionPopOutMenu({edit, setEdit, setEditingInstructionIndex, index, role}: InstructionPopOutProps) {

    const handleEditClick = () => {
        setEditingInstructionIndex(index)
    }

    if (role == 'essential' || role == 'premium')
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
                    <PencilSquareIcon className="text-gray-600 h-4 w-4"/>
                    <span className="text-sm text-gray-600">Edit</span>
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
    edit: boolean,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    instruction: string,
    isEditing: boolean,
    setEditingIngredientIndex: React.Dispatch<React.SetStateAction<number | null>>;
    index: number,
    onSave: (index: number, newValue: string) => void,
}

export function EditInstructionInput({edit, setEdit, instruction, isEditing, setEditingIngredientIndex, index, onSave}: EditInstructionProps) {

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
