import React, { useEffect, useState } from "react"
import { Button } from '../shared/button';
import { useRouter } from 'next/router';
import { ButtonLoader } from '../shared/loader';
import { TbLink, TbExternalLink, TbSearch, TbPlus } from "react-icons/tb";
import Link from 'next/link';
import { useLoading } from '@/context/loadingcontext';
import { useModal } from '@/context/modalcontext';
import { useAuth } from "@/context/AuthContext";
import { Notify } from '../shared/notify';
import { Paragraph } from "../shared/paragraph";

interface SearchProps {
    placeholder?: string;
    page?: "other" | "add" | "search";   
}

export function SearchOrAddRecipe({placeholder = 'Recipe URL or Search Recipes', page = "other"}: SearchProps) {

    const { setLoading, setProgress, isLoading } = useLoading()
    const [ url , setUrl ] = useState<string>("");
    const [ selectIcon, setSelectIcon ] = useState<"search" | "add" | "other">(page)
    const { stripeRole, user } = useAuth();
    const { openModal } = useModal();
    const router = useRouter();

    const onAddButtonClick = async (e: React.FormEvent) => {
        
        e.preventDefault();
        
        if (url.includes('tiktok.com') || url.includes('instagram.com')) {

            if (!user) {
                openModal("Login to Continue", "Please create an account to transcribe videos to recipes", "auth", false, stripeRole)
                return;
            }

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
                    
                    const randomIncrement = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
   
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

    useEffect(() => {
        if(url.includes('tiktok.com') || url.includes('instagram.com') || url == "" && page =="other") {
            setSelectIcon("add")
        } else {
            setSelectIcon("search")
        }
    },[url])

    return(
        <>
            <div className={`flex sm:flex-row flex-col gap-5 justify-center w-[350px] md:w-[450px]`}> {/* Also needs to be able to center for my recipe page */}
                <form onSubmit={onAddButtonClick} action="" method="POST" className="py-1 pl-5 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow
                border border-box-border bg-box-bg rounded-full ease-linear focus-within:bg-body  focus-within:border-primary">
                    { page == "search" ?
                        <TbSearch className="text-gray-600 w-8 h-8 lg:h-9 lg:w-9"/>
                    : page == "add" ?
                        <TbLink className="text-gray-600 w-8 h-8 lg:h-9 lg:w-9"/>
                    : selectIcon == "search" ?
                        <TbSearch className="text-gray-600 w-8 h-8 lg:h-9 lg:w-9"/>
                    :
                        <TbLink className="text-gray-600 w-8 h-8 lg:h-9 lg:w-9"/>
                    }
                    <input type="text" name="web-page" disabled={isLoading} value={url} placeholder={placeholder} className="text-base w-full text-gray-500 py-2 outline-none bg-transparent" onChange={(e) => setUrl(e.target.value)}/>
                    <Button buttonType="submit" text="" className={"min-w-max text-white text-sm lg:text-base"} isLink={false} isDisabled={isLoading} >
                        { !isLoading ?
                            <div>
                                { page == "search" ? 
                                    <TbSearch className="flex relative z-[5] h-5 w-5 text-white"/>
                                : page == "add" ?
                                    <TbPlus className="flex relative z-[5] h-5 w-5 text-white"/>
                                : selectIcon == "search" ?
                                    <TbSearch className="flex relative z-[5] h-5 w-5 text-white"/>
                                :
                                    <TbPlus className="flex relative z-[5] h-5 w-5 text-white"/>
                                }                               
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
                <TbExternalLink className="h-3 w-3"/>
            </div>
        </>
    )
}