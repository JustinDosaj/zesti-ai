import { LinkIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from 'react';
import { Notify } from "@/components/shared/notify";

export function CreatorAddRecipeLinkComponent({url, setUrl}: any) {

    const [ message, setMessage ] = useState<string>('')
    const [ notify, setNotify ] = useState<boolean | null>(null)

    useEffect(() => {
        if (notify == true) {
            Notify(message)
            setNotify(false)
        }
    },[notify])


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
                <span className="text-gray-600">Enter ingredient & instruction information if not available in video audio</span>
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
