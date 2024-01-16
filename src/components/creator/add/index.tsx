"use client;"
import React, { useState, useEffect, useRef } from 'react'
import { RecipeListLoader } from '@/components/shared/loader'
import { useAuth } from '@/pages/api/auth/auth'
import { PlusCircleIcon } from "@heroicons/react/20/solid"
import { CreatorDashboardTitleSmall } from '../dashboard'

interface RecentTikTokVideos {
    videoList: any,
    displayName: string,
    setIsOpen: any,
    setUrlId?: any,
    setUrl: any,
    setVideoObject: any,
    maxDisplayCount?: number,
    incrementCount?: number,
}

export function RecentTikTokVideos({videoList, displayName, setIsOpen, setUrl, setVideoObject, maxDisplayCount = 5, incrementCount = 5}: RecentTikTokVideos) {

    const [ displayCount, setDisplayCount ] = useState(maxDisplayCount)
    const containerRef = useRef<HTMLDivElement>(null);
    
    const addRecipeToCreatorPage = async (id: string, item: any) => {
        
        const url = `https://www.tiktok.com/@${displayName}/video/${id}`
        setUrl(url)
        setIsOpen(true)
        setVideoObject(item)
    
    }

    const handleLoadMore = () => {
        setDisplayCount((prevCount: number) => prevCount + incrementCount)
    }

    const handleScroll = () => {
        if (!containerRef.current) {
            return;
        }
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) { // 5px threshold
            handleLoadMore();
        }
    };

    useEffect(() => {
        const currentContainer = containerRef.current;
        if (currentContainer) {
            currentContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (currentContainer) {
                currentContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [displayCount, videoList]);

    return(
        <div className="grid justify-center border rounded-3xl">
            <CreatorDashboardTitleSmall title={"Recent TikTok Videos"} desc="Select from your recently uploaded videos"/>
            {!videoList?.videos ?
            <div className="mt-36 w-full"> 
                <RecipeListLoader/>
            </div>
            : 
            <div ref={containerRef} className="animate-fadeIn h-[500px] overflow-y-scroll p-4">
                {videoList?.videos?.slice(0, displayCount).map((item: any) => (
                    <div key={item.title} className="mt-5 group">
                        {/* Container for the image and the overlay icon */}
                        <div className="relative p-4 border rounded-3xl">
                            {/* Image */}
                            <div className="inline-flex items-center">
                                <img src={item.cover_image_url} className="h-[136px] w-[96px] rounded-xl" alt={item.title}/>
                                <div className="flex-grow ml-2 sm:ml-4">
                                    <span className="section-desc-text-size">{item.title}</span>
                                </div>
                            </div>
                            {/* Overlay Icon */}
                            <button
                                className="hover:animate-fadeInExtraFast absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-3xl"
                                onClick={() => addRecipeToCreatorPage(item.id, item)}
                                >
                                <PlusCircleIcon className="text-white h-10 w-10 hover:text-gray-300"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            }
        </div>
    )
}
