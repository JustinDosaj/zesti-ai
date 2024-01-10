import React, { useState } from 'react'
import { RecipeListLoader } from '@/components/shared/loader'
import { Button } from '@/components/shared/button'
import { useAuth } from '@/pages/api/auth/auth'
import { PlusCircleIcon } from "@heroicons/react/20/solid"
import { CreatorDashboardTitle } from '../dashboard'

export function RecentTikTokVideos({data, displayName, setIsOpen, setUrlId, setUrl, setVideoObject}: any) {

    const { user, isLoading } = useAuth()
    const [ notify, setNotify ] = useState<boolean | null>(null)
    
    const addRecipeToCreatorPage = async (url_id: string, item: any) => {
        
        const url = `https://www.tiktok.com/@${displayName}/video/${url_id}`
        setUrlId(url_id)
        setUrl(url)
        setIsOpen(true)
        setVideoObject(item)
    
    }


    return(
        <div className="grid justify-center">
        
        <CreatorDashboardTitle title={"Recent TikTok Videos"} desc="Click the plus icon next to the video to add it to your creator page"/>
        {!data?.videos ?
        <div className="mt-36"> 
            <RecipeListLoader/>
        </div>
        : 
        <div className="animate-fadeIn">
            {data?.videos?.map((item: any) => (
                <div key={item.title} className="mt-5">
                    {/* Use flexbox for the container */}
                    <div className="flex items-center justify-start space-x-2 sm:space-x-4 border-gray-300 border rounded-r-xl rounded-l-xl p-3 sm:p-4">
                        {/* Image */}
                        <img src={item.cover_image_url} className="h-[136px] w-[96px] rounded-xl" alt={item.title}/>
                        
                        {/* Title Wrapper - flex-grow ensures it takes up available space */}
                        <div className="flex-grow">
                            <span className="section-desc-text-size">{item.title}</span>
                        </div>
                        
                        {/* Button */}
                        <button className="" onClick={() => addRecipeToCreatorPage(item.id, item)}>
                            <PlusCircleIcon className="text-primary-main h-10 w-10 hover:text-primary-alt"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
        }
        <Button buttonType="button" text="View All" className="w-fit mx-auto mt-5"/>
    </div>
    )
}
