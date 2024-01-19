import React, { useState, useEffect, useRef } from 'react'
import { PageLoader } from '@/components/shared/loader'
import { Button } from '@/components/shared/button'
import { useAuth } from '@/pages/api/auth/auth'
import { saveBioDataToFireStore } from '@/pages/api/firebase/functions'
import { useRouter } from 'next/router'
import { Notify } from '@/components/shared/notify'
import { PlusCircleIcon } from "@heroicons/react/20/solid"
import { Container } from '@/components/shared/container'

export function CreatorPageComponent({creatorData}: any) {

    const { user, isLoading } = useAuth()
    const [ bio, setBio ] = useState<string>(creatorData?.bio_description ? creatorData.bio_description : '')
    const [ tiktok, setTikTok ] = useState<string>(creatorData?.profile_deep_link ? creatorData.profile_deep_link : '')
    const [ youtube, setYouTube ] = useState<string>(creatorData?.youtube_link ? creatorData.youtube_link : '')
    const [ twitter, setTwitter ] = useState<string>(creatorData?.twitter_link ? creatorData.twitter_link : '')
    const [ instagram, setInstagram ] = useState<string>(creatorData?.instagram_link ? creatorData.instagram_link : '')
    const [ website, setWebsite ] = useState<string>(creatorData?.website_link ? creatorData.website_link : '')
    const [ edit, setEdit ] = useState<boolean>(false)
    const router = useRouter()

    let socialLinks = [
        { name: 'Tiktok', value: tiktok, function: setTikTok},
        { name: 'YouTube', value: youtube, function: setYouTube},
        { name: 'Twitter/X', value: twitter, function: setTwitter},
        { name: 'Instagram', value: instagram, function: setInstagram},
        { name: 'Website', value: website, function: setWebsite},
    ]

    useEffect(() => {
        setBio(creatorData?.bio_description)
        setTikTok(creatorData?.profile_deep_link || '');
        setYouTube(creatorData?.youtube_link || '')
        setTwitter(creatorData?.twitter_link || '')
        setInstagram(creatorData?.instagram_link || '')
        setWebsite(creatorData?.website_link || '')


    }, [creatorData]);

    const saveBioData = async () => {

        setEdit(false)

        if (user) {
            const bioObject = {
                bio_description: bio,
                instagram_link: instagram,
                twitter_link: twitter,
                youtube_link: youtube,
                website_link: website,
            }

            await saveBioDataToFireStore(bioObject, user?.uid)
            Notify("Page information saved!")
        }
    }

    if (isLoading || !creatorData) return <PageLoader/>

    return(
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
            <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 py-8 standard-component-border">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0 ">
                    <div className="mx-auto max-w-2xl space-y-10 lg:mx-0 lg:max-w-none">
                        <div>
                        <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Basic Profile Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                            Basic information assosciated with your profile
                        </p>
                        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                            <div className="pt-6 flex justify-between items-center">
                                <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Name</dt>
                                <dd className="mt-1 flex gap-x-6 sm:mt-0">
                                    <div className="text-gray-700 text-sm lg:text-base capitalize">{creatorData?.display_name}</div>
                                </dd>
                                <dd className="mt-1 flex gap-x-6 sm:mt-0">
                                    <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                        onClick={() => router.push(`/${creatorData?.display_url}`)}>
                                        {"View Page"}
                                    </button>
                                </dd>
                            </div>
                            <div className="pt-6 flex justify-between items-center">
                                <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Add/Remove/Edit Recipes</dt>
                                <dd className="mt-1 flex gap-x-6 sm:mt-0">
                                    <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                        onClick={() => router.push(`/${creatorData?.display_url}`)}>
                                        {"Edit Recipes"}
                                    </button>
                                </dd>
                            </div>
                            <div className="pt-6 justify-between items-center">
                                <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Biography</dt>
                                <textarea className="border border-gray-300 p-2 rounded-3xl font-semibold text-gray-700 w-full sm:flex-none sm:pr-6 mt-4"
                                    disabled={!edit} 
                                    placeholder={creatorData?.bio_description}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                            {socialLinks.map((social) => (
                                <div key={social.name} className="pt-6 flex justify-between items-center">
                                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">{social.name}</dt>
                                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                                        <input className="border border-gray-300 p-2 rounded-3xl font-semibold text-gray-700 sm:w-64 sm:flex-none sm:pr-6"
                                            disabled={!edit} 
                                            placeholder={social.value}
                                            value={social.value}
                                            onChange={(e) => social.function(e.target.value)}
                                        />
                                        {/* TRACK AFFILIATE CODE INSIDE FIRESTORE THEN DISPLAY MANAGE AFFILIATE PROGRAM IF IT IS AVAILABLE*/}
                                    </dd>
                                </div>
                            ))

                            }
                            <div className="pt-6 flex justify-end items-center">
                                <dd className="mt-1 flex gap-x-6 sm:mt-0">
                                    { edit == true ?
                                    <Button buttonType="button" className="font-semibold text-sm lg:text-base" text="Save"
                                        onClick={saveBioData}>
                                    </Button>
                                    :
                                    <Button buttonType="button" className="font-semibold text-sm lg:text-base" text="Edit"
                                        onClick={() => setEdit(true)}>
                                    </Button>
                                    }
                                    {/* TRACK AFFILIATE CODE INSIDE FIRESTORE THEN DISPLAY MANAGE AFFILIATE PROGRAM IF IT IS AVAILABLE*/}
                                </dd>
                            </div>
                        </dl>
                        </div>
                    </div>
                </main>
            </div>
        </Container>
    )
}

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
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
            <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 py-8 standard-component-border">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0 ">
                    <div className="mx-auto max-w-2xl space-y-10 lg:mx-0 lg:max-w-none">
                        <div>
                            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Recent Tiktok Videos</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                                Add recipe to your page from your recent videos
                            </p>
                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div ref={containerRef} className="animate-fadeIn f-full overflow-y-scroll">
                                    {videoList?.videos?.slice(0, displayCount).map((item: any) => (
                                        <div key={item.title} className="group h-full max-w-[500px]">
                                            {/* Container for the image and the overlay icon */}
                                            <div className="relative p-4 border-b">
                                                {/* Image */}
                                                <div className="inline-flex items-center">
                                                    <img src={item.cover_image_url} className="h-[136px] w-[96px] rounded-xl" alt={item.title}/>
                                                    <div className="flex-grow ml-2 sm:ml-4">
                                                        <span className="section-desc-text-size">{item.title}</span>
                                                    </div>
                                                </div>
                                                {/* Overlay Icon */}
                                                <button
                                                    className="hover:animate-fadeInExtraFast absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100"
                                                    onClick={() => addRecipeToCreatorPage(item.id, item)}
                                                    >
                                                    <PlusCircleIcon className="text-white h-10 w-10 hover:text-gray-300"/>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </dl>
                        </div>
                    </div>
                </main>
            </div>
        </Container>
    )
}
