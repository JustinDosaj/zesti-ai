import { Container } from "@/components/shared/container"
import { ArrowDownTrayIcon, EyeIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/router"
import { db } from "@/pages/api/firebase/firebase"
import { useAuth } from "@/pages/api/auth/auth"
import { Notify } from '@/components/shared/notify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface CreatorRecipeProps {
    recipe: any,
    url?: string,
    setLoginPrompt?: any
}

export function CreatorRecipeTitle({recipe, url, setLoginPrompt}: CreatorRecipeProps) {

    return(
    <Container className={"flex flex-col gap-6 animate-fadeInFast alternate-orange-bg mt-36 rounded-3xl md:w-[599px] p-8 mb-16"}>
        <div className="grid justify-center items-center">
            <span className="section-desc-title-size text-center">{recipe.name}</span>
            <p className="text-center text-gray-500 text-sm">{recipe.title}</p>
        </div>
        <CreatorRecipeLinks recipe={recipe} setLoginPrompt={setLoginPrompt}/>
        <div className="space-y-2">
            <h2 className="section-desc-text-size font-semibold">Ingredients ({recipe.ingredients.length})</h2>
            <ul className="space-y-2 list-disc pl-6">
                {recipe?.ingredients?.map((ingredient: any, index: number) => (
                <li key={index} className="col-span-1 rounded-xl">
                    <div className="flex rounded-md overflow-visible w-full">
                        <div className="flex ml-5 mr-1.5 flex-shrink-0 items-center justify-center font-md text-gray-900 text-sm md:text-base">
                            {ingredient}
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
        <div className="space-y-2">
            <h2 className="section-desc-text-size font-semibold">Instructions ({recipe.instructions.length})</h2>
            <ul className="list-decimal pl-5">
                {recipe?.instructions?.map((instruction: any, index: number) => (
                    <li key={index} className="col-span-1 rounded-xl">
                        <div className="flex rounded-md overflow-wrap w-full">
                            <div className="flex w-fit ml-5 mr-1.5 flex-shrink-0 items-center justify-center font-md text-gray-900 text-sm md:text-base">
                                {instruction}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </Container>
    )
}

export function CreatorRecipeLinks({recipe, setLoginPrompt}: any) {

    const router = useRouter()
    const { isLoading, user } = useAuth()

    const navigation = [
        { 
            name: recipe.owner_display_name,
            onClick: () => router.push(`/${recipe.owner_display_name}`),
            icon: EyeIcon,
        },
        { 
            name: `See Video`,
            onClick: () => window.open(recipe.url),
            icon: (props: any) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    {...props}
                    className="h-3 w-3 md:h-4 md:w-4">
                    <path
                        fill="currentColor"
                        d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
            ),
        },
        { 
            name: 'Save',
            onClick: async () => {
                if (user && !isLoading) {
                    const userRef = db.collection('users').doc(user?.uid).collection('recipes').doc(recipe.id)
                    await userRef.set(recipe).then((val: any) => {
                        Notify("Recipe saved to your dashboard")
                    })
                } else {
                    setLoginPrompt(true)
                }
            },
            icon: ArrowDownTrayIcon,
        },
    ]

    return(
    <div className="flex justify-evenly">
        {navigation.map((nav: any) => (
            <button key={nav.name} onClick={nav.onClick} className="text-gray-700 hover:text-gray-500 inline-flex space-x-2 items-center justify-center">
                <nav.icon className="h-4 w-4 md:h-5 md:w-5"/>
                <p className="capitalize text-sm lg:text-base text-left">{nav.name}</p>
            </button>
        ))}
    </div>
    )
}