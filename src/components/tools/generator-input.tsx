import React from "react"
import { Container } from '../shared/container';
import { useState } from "react";
import { Button } from "../shared/button";
import { useLoading } from "@/context/loadingcontext";
import { FiRefreshCw } from "react-icons/fi";
import { ButtonLoader } from "../shared/loader";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Notify } from "../shared/notify";
import { useModal } from '@/context/modalcontext';

export function GeneratorInput() {

    const [ gptMessage, setGptMessage ] = useState<string>("");
    const { stripeRole } = useAuth();
    const { setLoading, setProgress, isLoading } = useLoading()
    const { openModal } = useModal();
    const router = useRouter();

    const onAddButtonClick = async (e: React.FormEvent) => {
        
        e.preventDefault();

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


            const handleUserSubmitRecipe = (await import('@/pages/api/handler/generate')).handleUserGenerateRecipe
            const response = await handleUserSubmitRecipe({gptMessage}).then((response: any) => {
                setProgress(100)
                clearInterval(interval)
                return response
            }).finally(() => {
                setLoading(false)
                clearInterval(interval)
            })

            const { id, success, slug } = response

            if (id && id !== '' &&  success == true) {
                    router.push(`/ai-recipes/${id}/${slug}`)
            }

            setGptMessage('')
    }

    return(
        <Container className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center"> {/* Center aligned like your design example */}
                <form onSubmit={onAddButtonClick} action="" method="POST" className="py-1 pl-6 w-full max-w-md pr-1 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow border border-box-border bg-box-bg rounded-full ease-linear">             
                    <input type="text" name="web-page" disabled={isLoading} value={gptMessage} placeholder={"Describe recipe"} className="text-base w-full text-gray-500 py-2 outline-none bg-transparent" onChange={(e) => setGptMessage(e.target.value)}/>       
                    <Button buttonType="submit" text="" className={"min-w-max text-white text-sm lg:text-base"} isLink={false} isDisabled={isLoading} >
                        { !isLoading ? 
                            <FiRefreshCw className="flex relative z-[5] h-5 w-5 text-white"/>
                        :
                            <ButtonLoader/>
                        }
                    </Button>
                </form>
            </div>
        </Container>
    )
}