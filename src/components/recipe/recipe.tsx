import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, PencilSquareIcon  } from '@heroicons/react/20/solid'


function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

interface RecipePopOutProps {
    edit: boolean,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setEditingIngredientIndex: React.Dispatch<React.SetStateAction<number | null>>;
    index: number
}

export function RecipePopOutMenu({edit, setEdit, setEditingIngredientIndex, index}: RecipePopOutProps) {

    const handleEditClick = () => {
        setEditingIngredientIndex(index)
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
    index: number
}

export function EditRecipeInput({edit, setEdit, ingredient, isEditing, setEditingIngredientIndex, index}: EditRecipeProps) {

    const [ input, setInput ] = useState<string>(ingredient)
    
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
                    className="text-gray-500 whitespace-normal"
                />
            </div>
        )
    }
}