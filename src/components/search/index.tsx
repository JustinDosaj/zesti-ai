import { ExclamationTriangleIcon, LinkIcon } from '@heroicons/react/24/outline'
import React, { useState } from "react"
import { Button } from '../shared/button';
import { useRouter } from 'next/router';
import { handleUserSubmitRecipe } from '@/pages/api/handler/submit';

interface AddRecipeProps {
    align?: 'start' | 'center' | 'end',
}

export function AddRecipe({align}: AddRecipeProps) {

    const [ url , setUrl ] = useState<string>("");
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const router = useRouter();

    const onAddButtonClick = async () => {
        if(url.includes('tiktok.com')) {
            setIsLoading(true)

            const response = await handleUserSubmitRecipe({url, setUrl})
            if (response.uniqueId && response.uniqueId !== '') { router.push(`/recipe/${response.uniqueId}`)}
            
            // Clean up
            setIsLoading(false)
            setUrl('')
        } else {
            router.push({
                pathname: '/search',
                query: { q: encodeURIComponent(url)} 
            })
        }
    }

    return(
        <>
            <div className={`flex sm:flex-row flex-col gap-5 w-[325px] lg:w-[500px] justify-${align}`}> {/* Also needs to be able to center for my recipe page */}
                <form action="" method="POST" className="py-1 pl-6 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                    <LinkIcon className="text-gray-600 w-7 h-7 lg:h-10 lg:w-10"/>
                    <input type="text" name="web-page" value={url} placeholder="Recipe Link or Search Keywords" className="text-sm lg:text-base w-full text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                    <Button buttonType="button" text="" className={"min-w-max text-white"} isLink={false}  
                        onClick={onAddButtonClick}>                              
                        <span className="hidden sm:flex relative z-[5]">
                            Submit
                        </span>
                        <span className="flex sm:hidden relative z-[5]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>                                      
                        </span>
                    </Button>
                </form>
            </div>
            <div className={`inline-flex justify-${align} text-sm text-gray-500 items-center gap-1`}>
                <ExclamationTriangleIcon className="w-4 h-4 text-yellow-400"/>    
                <span>Recipes can only be added if they have instructions in the voiceover or title</span>
            </div>
        </>
    )
}
