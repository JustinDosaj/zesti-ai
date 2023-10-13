import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'

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

export function GridDisplay({data}: any) {

    return(
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {data.map((recipe: any) => {

        let output = "{\"name\": \"Super Crispy Chicken Tenders\", \"ingredients\": [\"4 chicken breasts, boneless, skinless\", \"1 cup buttermilk\", \"1 teaspoon hot sauce\", \"2 large eggs, beaten\", \"2 cups flour\", \"2 1/2 teaspoons salt\", \"3/4 teaspoon pepper\", \"1/8 teaspoon paprika\", \"1/8 teaspoon garlic powder\", \"1/8 teaspoon baking powder\", \"vegetable oil, for frying\"], \"instructions\": [\"Cut the chicken breasts into four tenders each and soak them in a bowl with the buttermilk and hot sauce for 30 minutes.\", \"Add the eggs to one bowl and the flour and spices to a second bowl.\", \"Dip each piece of chicken from the buttermilk bowl to the flour mixture.\", \"Dip it into the eggs then back into the flour mixture.\", \"Shake excess flour gently off and put the chicken onto a baking sheet.\", \"Repeat with all the pieces.\", \"Heat the oil (three inches deep) in a dutch oven on medium high heat to 350 degrees.\", \"Fry the chicken in small batches for 5-7 minutes or until golden brown.\"], \"recommendations\": [\"You can add texas pete hot sauce and season the buttermilk mixture with the same spices that go to the flour for added flavor.\", \"Consider using drumstick or wings with this recipe.\", \"The egg step makes the chicken even crispier.\"]}"
        let cleanedOutput = output.replace(/\\\"/g, '\"');

        console.log(cleanedOutput)

        return(
          <li key={recipe.url} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{"temp"}</h3>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {"temp"}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">{"temp title"}</p>
              </div>
            </div>
          </li>
        )})}
      </ul>
    )
}