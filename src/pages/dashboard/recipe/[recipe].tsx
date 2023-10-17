import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { VideoCameraIcon } from '@heroicons/react/20/solid'
import React, {useEffect, useState} from 'react'
import { useAuth } from "@/pages/api/auth/auth";
import { useRouter } from 'next/router';
import { getRecipe } from "@/pages/api/firebase/functions";
import { Container } from "@/components/shared/container";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.recipe as string
    return {props: {id: id}}
}

function classNames(...classes: (string | undefined | null | false)[]): string {
return classes.filter(Boolean).join(' ');
}

const Recipe: React.FC = ({id}: any) => {

    const { user, isLoading } = useAuth();
    const [ onFirstLoad, setOnFirstLoad ] = useState<boolean>(true)
    const [obj, setObj] = useState<any>([])
    const [url, setUrl] = useState('')
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
            setUrl(res?.url)
        })
        setOnFirstLoad(false)
    }  

    return(
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background mt-12${raleway.className}`}>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-36"}>
       <div className="bg-white py-5 border w-full rounded-lg p-4 md:p-12">
        <div className="md:flex">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="gap-x-3 text-xl font-semibold text-gray-900 grid space-y-2 sm:inline-flex">
                {obj?.name}
                <div className="mt-1 space-y-2 sm:inline-flex sm:mt-0 sm:space-y-0 gap-x-2 text-center">
                  { obj.time == null ? 
                  <p></p>
                  :
                  <p className="bg-green-500 rounded-xl text-white text-sm p-1">{`${obj?.time} Minutes`}</p> 
                  }
                  { obj.servings == null ? 
                  <p></p>
                  :
                  <p className="bg-green-500 rounded-xl text-white text-sm p-1">{`${obj?.servings} Servings`}</p>
                  }
                </div>
            </div>

            <p className="text-gray-500">
              {`${obj?.description}`}
            </p>
          </div>
            <button onClick={() => window.open(url)}
              className="text-primary-main underline mt-2 md:mt-0"
            >
              <div className="inline-flex gap-x-2">
                <VideoCameraIcon className="h-6 w-6"/>
                <p className="">Video Link</p>
                </div>
            </button>
        </div>
      </div>
      </Container>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-36"}>
        <div className="my-auto overflow-hidden w-full">
          <h2 className="text-lg font-medium text-gray-500">Ingredients {`(${obj?.ingredients?.length})`}</h2>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {obj?.ingredients?.map((ingred: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-hidden w-full">
                  <div className="bg-yellow-500 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-md text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <p className="text-gray-500 overflow-ellipsis whitespace-normal">{ingred}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-36 mb-36"}>
        <div className="my-auto overflow-hidden w-full">
          <h2 className="text-lg font-medium text-gray-500">Instructions {`(${obj?.instructions?.length})`}</h2>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
            {obj?.instructions?.map((instruct: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-hidden w-full">
                  <div className="bg-green-600 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-medium text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <p className="text-gray-500 overflow-ellipsis whitespace-normal">{instruct}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
    )
}

export default Recipe