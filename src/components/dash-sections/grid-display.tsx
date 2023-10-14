import { BookOpenIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Container } from '../shared/container'

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]

export function GridDisplay({data, user}: {data: any, user: any}) {

  console.log(data)
    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {data.map((recipe: any, index: any) => {
        const desc = JSON.parse(recipe[index].data.message.content)
        return(
          <li key={recipe.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{desc.name}</h3>
                  {recipe[index]?.complete == true ?
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {"Complete"}
                  </span>
                  :
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-green-600/20">
                    {"Processing"}
                  </span>
                  }
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">{`${desc.time} Minutes`}</p>
                <p className="mt-1 text-sm text-gray-500 w-full">{`${desc.description} Minutes`}</p>
              </div>
            </div>
            <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="-ml-px flex w-0 flex-1 bg-primary-main rounded-b-2xl">

                {<Link className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900" 
                  href={{pathname: `/dashboard/recipe/[recipeId]`,
                    query: {recipeId: recipe[index].id}
                  }}>
                  <BookOpenIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  View Recipe
                </Link>}
              </div>
            </div>
          </div>
          </li>
        )})}
      </ul>
    </Container>
    )
}