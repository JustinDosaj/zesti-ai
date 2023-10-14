import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import React, {useEffect, useState} from 'react'
import { useAuth } from "@/pages/api/auth/auth";
import { useRouter } from 'next/router';
import { getRecipe } from "@/pages/api/firebase/functions";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.recipe as string
    return {props: {id: id}}
}

  const projects = [
    { name: 'Graph API', initials: 'GA', href: '#', members: 16, bgColor: 'bg-pink-600' },
    { name: 'Component Design', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
    { name: 'Templates', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
    { name: 'React Components', initials: 'RC', href: '#', members: 8, bgColor: 'bg-green-500' },
  ]

function classNames(...classes: (string | undefined | null | false)[]): string {
return classes.filter(Boolean).join(' ');
}

const Recipe: React.FC = ({id}: any) => {

    const { user, isLoading } = useAuth();
    const [ onFirstLoad, setOnFirstLoad ] = useState<boolean>(true)
    const [obj, setObj] = useState<any>()
    const router = useRouter();

    useEffect( () => {
        if(user == null && isLoading == false) {
          router.push('/')
        } else if(user !== null && isLoading == false && onFirstLoad == true) {
            onFirstRecipeLoad()
        }
      }, [user])

    async function onFirstRecipeLoad(){
        const response = await getRecipe(user?.uid, id).then((res) => {
            setObj(JSON.parse(res?.data.message.content))
        })
        setOnFirstLoad(false)
    }  

    console.log("Object: ", obj)
    //let ingred = JSON.parse(obj.data.message.content)

    return(
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background mt-12${raleway.className}`}>
    <div className="my-auto">
      <h2 className="text-lg font-medium text-gray-500">Ingredients</h2>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {obj?.ingredients.map((ingred: any) => (
          <li key={ingred} className="col-span-1 flex rounded-md shadow-sm">
            <div className="bg-yellow-500 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white" >
         
            </div>
            <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="text-gray-500">{ingred}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
        </main>
    )
}

export default Recipe