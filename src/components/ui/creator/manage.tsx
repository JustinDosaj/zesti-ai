import { useAuth } from '@/pages/api/auth/auth';
import { TrashIcon, ArrowPathIcon, LinkIcon, ExclamationCircleIcon, EyeIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import React, { useState } from "react"
import { Button } from '@/components/shared/button';
import { Container } from '@/components/shared/container';
import { deleteCreatorError } from '@/pages/api/firebase/functions';
import { Notify } from '@/components/shared/notify';
import { useRouter } from 'next/router';
import { ManageRecipesSearch } from '@/components/search';


export function CreatorAddRecipeLinkComponent({url, setUrl}: any) {

    return(
    <div className="grid items-center mt-2 space-y-2">
        <div className="inline-flex gap-1">
            <span className="text-gray-700 font-semibold text-left">Step 1:</span>
            <span className="text-gray-600">Copy & Paste Video Link</span>
        </div>
        <div className="gap-5 w-full justify-center mt-1">
            <form action="" method="POST" className="py-1 pl-6 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
            border border-box-border bg-box-bg rounded-lg ease-linear focus-within:bg-body  focus-within:border-primary">
                <LinkIcon className="text-gray-600 h-6 w-6"/>
                <input type="text" name="web-page" value={url} placeholder="Paste Your TikTok Video Link" className="w-full text-gray-500 py-2 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
            </form>
        </div>
    </div>
    )
}

export function CreatorAddRecipeTextComponent({rawText, setRawText}: any) {
    return(
        <div className="pt-6">
            <div className="grid text-left">
                <span className="text-gray-700 font-semibold text-left">Step 2:</span>
                <span className="text-gray-600">Enter ingredients & instructions if not available in video audio</span>
            </div>
            <textarea
                value={rawText}
                onChange={(e) => {setRawText(e.target.value)}}
                className={`text-gray-500 whitespace-normal w-full bg-gray-100 mt-2 p-2 rounded-lg text-sm h-36`}
                placeholder={`Enter the ingredients & instructions for recipe`}
            />
            <div className={`inline-flex items-center space-x-2`}>
            <ExclamationCircleIcon className="h-4 w-4 text-white rounded-3xl bg-yellow-400"/>
            <p className="text-xs text-gray-600">Do not worry about being organized, Zesti will structure the recipe for you</p>
            </div>
      </div>
    )
}

export function CreatorResubmitRecipeTextComponent({rawText, setRawText}: any) {
    return(
        <div className="pt-6">
            <div className="grid text-left">
                <span className="text-gray-700 font-semibold text-left">Step 1:</span>
                <span className="text-gray-600">Please enter ingredients & instructions for the recipe and try submitting again</span>
            </div>
            <textarea
                value={rawText}
                onChange={(e) => {setRawText(e.target.value)}}
                className={`text-gray-500 whitespace-normal w-full bg-gray-100 mt-2 p-2 rounded-lg text-sm h-36`}
                placeholder={`Enter the ingredients & instructions for recipe`}
            />
            <div className={`inline-flex items-center space-x-2`}>
            <ExclamationCircleIcon className="h-4 w-4 text-white rounded-3xl bg-yellow-400"/>
            <p className="text-xs text-gray-600">Do not worry about being organized, Zesti will structure the recipe for you</p>
            </div>
      </div>
    )
}

export function ManageRecipesList({errorData, publicData, setIsCreatorModalOpen, setIsResubmitOpen, setUrl, setRecipeId, setIsOpen}: any) {

    const [ view, setView ] = useState<string>('public')
    const { creatorData, user } = useAuth();
    const router = useRouter()

    const onResubmitClick = async (url: string, recipe_id: string) => {
        setUrl(url)
        setRecipeId(recipe_id)
        setIsResubmitOpen(true)
    }

    const onPublicRecipeDelete = async (recipe_id: string) => {
        setRecipeId(recipe_id)
        setIsOpen(true)
    }

    const onDeleteFromErrorsClick = async (recipe_id: string) => {
        await deleteCreatorError(user?.uid, recipe_id)
        Notify("Removed recipe from errors")
    }

    const onViewSelect = async (currentView: string) => {
        if(currentView == 'errors') {
            errorData.length > 0 ? setView(currentView) : setView('public')
        } else if (currentView == 'public') {
            setView(currentView)
        }
    }

    return (
    <Container className="grid justify-center w-full max-w-6xl mx-auto mt-6 pb-24 animate-fadeIn">
        <div className="p-6 bg-white rounded-3xl border shadow mt-2 w-[325px] xs:w-[400px] sm:w-[500px] md:w-[750px]">
            <div className="flex justify-end">
            <Button isLink={false} buttonType="button" text="Add New Recipe" onClick={() => setIsCreatorModalOpen(true)}/>
            </div>
            <ManageRecipesSearch creatorData={creatorData}/>
            <div className="flex sm:justify-start gap-4 mt-4">
                <button onClick={() => onViewSelect('public')} className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-700 font-semibold px-4 rounded py-1 sm:py-2 sm:text-base">
                    {`Public (${publicData.length})`}
                </button>
                <button onClick={() => onViewSelect('errors')} className={errorData.length > 0 ? `bg-red-600 hover:bg-red-300 text-white font-semibold px-4 py-1 sm:py-2 rounded text-sm sm:text-base` : `bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold py-1 sm:py-2 sm:text-base px-4 rounded`}>
                    {`Errors (${errorData.length})`}
                </button>
            </div>
            <div className="mt-6 w-full">
                {view == 'errors' ? 
                errorData.map((item: any) => (
                    <div key={item.id} className="group relative border border-gray-200 p-2 rounded-2xl hover:bg-gray-100 w-full mt-4">
                        <div className="flex">
                            <div className="flex-none w-24 relative mr-1 md:mr-4 p-1">
                                <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} alt={item.name} className="rounded-lg" />
                            </div>
                            <div className="grid justify-between p-1.5">
                                <div className="">
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-700">{item.title ? item.title : "Error"}</h2>
                                </div>
                                <div className="flex justify-start gap-x-4 w-fit items-end">
                                    <button onClick={() => onResubmitClick(item.url, item.id)}>
                                        <div className="text-white hover:bg-yellow-400 p-1 bg-yellow-500 rounded flex items-center justify-center w-fit">
                                            <ArrowPathIcon className="h-4 w-4 lg:h-6 lg:w-6" />
                                        </div>
                                    </button>
                                    <button onClick={() => onDeleteFromErrorsClick(item.id)}>
                                        <div className="text-white hover:bg-red-500 p-1 bg-red-600 rounded flex items-center justify-center w-fit">
                                            <TrashIcon className="h-4 w-4 lg:h-6 lg:w-6" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                : view == 'public' ? 
                    publicData.map((item: any) => (
                        <div key={item.id} className="group relative border border-gray-200 p-2 rounded-2xl hover:bg-gray-100 w-full mt-4">
                            <div className="flex">
                                <div className="flex-none w-24 relative md:mr-4 p-1">
                                    <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} alt={item.name} className="rounded-lg" />
                                </div>
                                <div className="grid ml-1 justify-between p-1.5">
                                    <div className="">
                                        <h2 className="text-base sm:text-lg font-semibold text-gray-700">{item.name}</h2>
                                        <p className="text-gray-600 text-xs sm:text-sm lg:text-base">{item.id}</p>
                                    </div>
                                    <div className="flex justify-start gap-x-4 w-fit items-end">
                                        <button onClick={() => router.push(`/${creatorData?.display_url}/${item.id}`)}>
                                            <div className="text-white hover:bg-green-500 p-1 bg-green-600 rounded  flex items-center justify-center w-fit">
                                                <EyeIcon className="h-4 w-4 lg:h-6 lg:w-6" />
                                            </div>
                                        </button>
                                        <button onClick={() => router.push(`/${creatorData?.display_url}/${item.id}`)}>
                                            <div className="text-white hover:bg-yellow-400 p-1 bg-yellow-500 rounded flex items-center justify-center w-fit">
                                                <PencilSquareIcon className="h-4 w-4 lg:h-6 lg:w-6" />
                                            </div>
                                        </button>
                                        <button onClick={() => onPublicRecipeDelete(item.id)}>
                                            <div className="text-white hover:bg-red-500 p-1 bg-red-600 rounded flex items-center justify-center w-fit">
                                                <TrashIcon className="h-4 w-4 lg:h-6 lg:w-6" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                :
                <></>
                }
        </div>
      </div>
    </Container>
    );
}


