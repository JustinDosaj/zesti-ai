import { BookOpenIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Container } from '../shared/container'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { EyeIcon } from '@heroicons/react/24/outline'


function classNames(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}


export function GridDisplay({data = [], user}: {data: any[], user: any}) {

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 w-screen mb-36"}>
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 p-4">
      {data.map((recipe: any, index: number) => {

        const desc = JSON.parse(recipe.data.message.content)          

        return (
        <li key={recipe.id} className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <div className="text-sm font-medium leading-6 text-gray-900">{desc.name}</div>
            <Menu as="div" className="relative ml-auto">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        View<span className="sr-only">, {desc.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit<span className="sr-only">, {desc.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Time</dt>
              <dd className="text-gray-700">
                <p>{`${desc.time} Minutes`}</p>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Servings</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{desc.servings}</div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Total Ingrediants</dt>
              <dd className="text-gray-700">
                <p>{`${desc.ingredients.length}`}</p>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Total Steps</dt>
              <dd className="text-gray-700">
                <p>{`${desc.instructions.length}`}</p>
              </dd>
            </div>
          </dl>
          <div className="bg-primary-main p-3 text-center inline-flex w-full justify-center text-white hover:bg-primary-alt">
            {<Link className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent text-sm font-semibold text-gray-900" 
              href={{pathname: `/dashboard/recipe/[recipeId]`,
                query: {recipeId: recipe.id}
              }}>
              <BookOpenIcon className="h-5 w-5 text-white" aria-hidden="true" />
              <p className="text-white">View Recipe</p>
            </Link>}
          </div>
        </li>
      )})}
    </ul>
    </Container>
    )
}



{/*recipe[index]?.complete == true ?
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {"Complete"}
                  </span>
                  :
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-green-600/20">
                    {"Processing"}
                  </span>
                  }

*/}