import React, { useState } from "react"
import { Button } from '../shared/button';
import { useRouter } from 'next/router';
import { ButtonLoader } from '../shared/loader';
import { ArrowTopRightOnSquareIcon, LinkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useLoading } from '@/context/loadingcontext';
import { useModal } from '@/context/modalcontext';
import { useAuth } from "@/context/AuthContext";
import { Notify } from '../shared/notify';
import { Paragraph } from "../shared/paragraph";

interface AddRecipeProps {
    align?: 'start' | 'center' | 'end',
}

export function SearchOrAddRecipe({align}: AddRecipeProps) {

    const { setLoading, setProgress, isLoading } = useLoading()
    const [ url , setUrl ] = useState<string>("");
    const { stripeRole } = useAuth();
    const { openModal } = useModal();
    const router = useRouter();

    const onAddButtonClick = async (e: React.FormEvent) => {
        
        e.preventDefault();
        
        if (url.includes('tiktok.com') || url.includes('instagram.com')) {

            setLoading(true)
            setProgress(0)

            if (stripeRole == 'premium') { Notify("Processing recipe, this may take a few moments") }
            else { openModal("Recipe Submitted", "Processing recipe, this should only take a few moments.", "info", true, stripeRole) }

            const interval = setInterval(() => {
                setProgress((prev: number) => {
                    
                    if(prev >= 99) {
                        clearInterval(interval)
                        return 99
                    }
                    else if (prev >= 90) {
                        return prev + 1;
                    }
                    
                    const randomIncrement = Math.floor(Math.random() * (9 - 5 + 1)) + 5;
   
                    if (randomIncrement + prev > 99) { return 99 }
    
                    return prev + randomIncrement;
    
                });
            }, 1000);


            const handleUserSubmitRecipe = (await import('@/pages/api/handler/submit')).handleUserSubmitRecipe
            const response = await handleUserSubmitRecipe({url}).then((response: any) => {
                setProgress(100)
                clearInterval(interval)
                return response
            }).finally(() => {
                setLoading(false)
                clearInterval(interval)
            })

            const { uniqueId, success, albumIdList, source, slug } = response

            if (uniqueId && uniqueId !== '' &&  success == true) {
                    router.push(`/recipes/${uniqueId}/${slug}`)
            }

        } else {
            router.push({
                pathname: '/search',
                query: { q: encodeURIComponent(url)} 
            })
        }

        setUrl('')
    }

    return(
        <>
            <div className={`flex sm:flex-row flex-col gap-5 justify-center lg:justify-${align} w-[350px] md:w-[450px]`}> {/* Also needs to be able to center for my recipe page */}
                <form onSubmit={onAddButtonClick} action="" method="POST" className="py-1 pl-6 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                    <LinkIcon className="text-gray-600 w-7 h-7 lg:h-9 lg:w-9"/>
                    <input type="text" name="web-page" disabled={isLoading} value={url} placeholder="Recipe URL or Keyword" className="text-base w-full text-gray-500 py-3 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                    <Button buttonType="submit" text="" className={"min-w-max text-white text-sm lg:text-base"} isLink={false} isDisabled={isLoading} >
                        { !isLoading ?
                            <div>                               
                                <span className="hidden sm:flex relative z-[5] font-semibold">
                                    {"Submit"}
                                </span>
                                <span className="flex sm:hidden relative z-[5]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>                                      
                                </span>
                            </div>
                            :
                            <ButtonLoader/>
                        }
                    </Button>
                </form>
            </div>
            <div className="inline-flex justify-center lg:justify-start lg:pl-4 items-center text-xs text-gray-500 space-x-1">
                <Paragraph size="xsmall">Results may vary.</Paragraph>
                <Link href="/about/faq" className="underline">Learn More</Link>
                <ArrowTopRightOnSquareIcon className="h-3 w-3"/>
            </div>
        </>
    )
}