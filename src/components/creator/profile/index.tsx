import React, { useState, useEffect, useRef } from 'react'
import { PageLoader } from '@/components/shared/loader'
import { Button } from '@/components/shared/button'
import { useAuth } from '@/pages/api/auth/auth'
import { saveBioDataToFireStore } from '@/pages/api/firebase/functions'
import { useRouter } from 'next/router'
import { Notify } from '@/components/shared/notify'
import { ExclamationTriangleIcon, LinkIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid"
import { Container } from '@/components/shared/container'
import { callGenerateCreatorPage } from '@/pages/api/handler/submit'
import { RecentTikTokVideosProps } from '@/components/shared/interface'
import useAccountStatus from '@/hooks/useAccountStatus'

export function CreatorPageComponent({creatorData}: any) {

    const { user, isLoading } = useAuth()
    
    const [ bio, setBio ] = useState<string>(creatorData?.bio_description ? creatorData.bio_description : '')
    const [ tiktok, setTikTok ] = useState<string>(creatorData?.profile_deep_link ? creatorData.profile_deep_link : '')
    const [ youtube, setYouTube ] = useState<string>(creatorData?.socials?.youtube_link ? creatorData.socials.youtube_link : '')
    const [ twitter, setTwitter ] = useState<string>(creatorData?.socials?.twitter_link ? creatorData.socials.twitter_link : '')
    const [ instagram, setInstagram ] = useState<string>(creatorData?.socials?.instagram_link ? creatorData.socials.instagram_link : '')
    const [ website, setWebsite ] = useState<string>(creatorData?.socials?.website_link ? creatorData.socials.website_link : '')
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
        setYouTube(creatorData?.socials?.youtube_link || '')
        setTwitter(creatorData?.socials?.twitter_link || '')
        setInstagram(creatorData?.socials?.instagram_link || '')
        setWebsite(creatorData?.socials?.website_link || '')
    }, [creatorData]);

    const saveBioData = async () => {

        setEdit(false)

        if (user) {
            const bioObject = {
                bio_description: bio,
                socials: 
                    {
                        instagram_link: instagram,
                        twitter_link: twitter,
                        youtube_link: youtube,
                        website_link: website,
                    },
            }

            await saveBioDataToFireStore(bioObject, user?.uid)
            Notify("Page information saved!")
        }
    }

    if (isLoading || !creatorData) return <PageLoader/>

    return(
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn mb-24"}>
            <div className="mx-auto max-w-2xl lg:flex lg:gap-x-16 lg:px-8 py-8 standard-component-border w-full">
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
                                <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Edit Creator Recipes</dt>
                                <dd className="mt-1 flex gap-x-6 sm:mt-0">
                                    <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                                        onClick={() => router.push(`/creator/edit/manage-recipes`)}>
                                        {"Manage Recipes"}
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
                                    <div className="inline-flex gap-2">
                                        <Button buttonType="button" className="font-semibold text-sm lg:text-base w-28" text="Save"
                                            onClick={saveBioData}>
                                        </Button>
                                        <Button buttonType="button" className="font-semibold text-sm lg:text-base w-28" text="Cancel"
                                            onClick={() => setEdit(false)}>
                                        </Button>
                                    </div>
                                    :
                                    <Button buttonType="button" className="font-semibold text-sm lg:text-base w-28" text="Edit"
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

export function RecentTikTokVideos({videoList, creatorData, setIsOpen, setUrl, setVideoObject, maxDisplayCount = 5, incrementCount = 5}: RecentTikTokVideosProps) {

    const [ displayCount, setDisplayCount ] = useState(maxDisplayCount)
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    
    const addRecipeToCreatorPage = async (id: string, item: any) => {
        
        const url = `https://www.tiktok.com/@${creatorData?.display_name}/video/${id}`
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
        <Container className={"mt-8 flex flex-grow flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
            <div className="mx-auto max-w-2xl lg:flex lg:gap-x-16 lg:px-8 py-8 standard-component-border w-full">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0 ">
                    <div className="mx-auto max-w-2xl space-y-10 lg:mx-0 lg:max-w-none">
                        <div>
                            <div className="inline-flex w-full justify-between items-center">
                                <div>
                                    <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Add Recipes from TikTok</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                                        Select from recent videos or add other recipe
                                    </p>
                                </div>
                                <Button buttonType="button" className="font-semibold text-sm lg:text-base inline-flex items-center" onClick={() => router.push('/creator/edit/manage-recipes')} text="">
                                    <span className="hidden">Add Recipe</span>
                                    <PlusIcon className="w-6 h-6"/>
                                </Button>
                            </div>
                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div ref={containerRef} className="animate-fadeIn w-full">
                                    {videoList?.videos?.slice(0, displayCount).map((item: any) => (
                                        <div key={item.title} className="group h-full">
                                            {/* Container for the image and the overlay icon */}
                                            <div className="relative p-4 border-b">
                                                {/* Image */}
                                                <div className="inline-flex items-center">
                                                    <img src={item.cover_image_url} className="h-[115px] w-[85px] rounded-xl" alt={item.title}/>
                                                    <div className="flex-grow ml-2 sm:ml-4">
                                                        <span className="text-sm lg:text-base text-gray-700">{item.title}</span>
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
                                    {!videoList?.videos?.length && (
                                        <div className="items-center mx-auto my-auto">
                                            <PageLoader/>
                                        </div>
                                    )}
                                </div>
                            </dl>
                        </div>
                    </div>
                </main>
            </div>
        </Container>
    )
}

export function CreatorProfileComponent({creatorData}: any) {

    const { isLoading, userData } = useAuth()
    const { accountStatus, loginWithTikTok } = useAccountStatus()
    const router = useRouter() 


    console.log("Check status: ,", accountStatus)

    const onGeneratePageClick = async () => {
        await callGenerateCreatorPage({userData, creatorData})
    }

    if(accountStatus == 'user' || null) return <div className="hidden"/>

    if (isLoading ) return <PageLoader/>

    return(
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-24"}>
            <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 py-8 w-full standard-component-border">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                        <CreatorTitleComponent title="Creator Page Settings" desc="Connect your Tiktok, setup an affiliate account & begin publishing recipes"/>
                            <dl className="mt-6 space-y-1 text-sm leading-6">
                                <PageLinkComponent accountStatus={accountStatus} display_url={creatorData?.display_url}/>
                                <ConnectTikTokComponent accountStatus={accountStatus} loginWithTikTok={loginWithTikTok}/>
                                <AffiliateProgramComponent accountStatus={accountStatus} display_url={creatorData?.display_url}/>
                                <GenerateOrViewPageComponent accountStatus={accountStatus} onGeneratePageClick={onGeneratePageClick} router={router}/>
                            </dl>
                        </div>
                    </div>
                </main>
            </div>
        </Container>
    )
}

interface CreatorPageComponents {
    title?: string,
    desc?: string,
    display_url?: string,
    accountStatus?: string,
    onGeneratePageClick?: any,
    router?: any,
    loginWithTikTok?: any,
    setAffiliateLink?: any,
    onAffiliateSave?: any,
    affiliateLink?: string,
}

function CreatorTitleComponent({title, desc}: CreatorPageComponents) {
    return(
    <>
        <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">{title}</h2>
        <p className=" text-sm leading-6 text-gray-500 lg:text-base">
            {desc}
        </p>
    </>
    )
}

function PageLinkComponent({display_url, accountStatus}:CreatorPageComponents) {

    if (accountStatus !== "creator") return;

    return(
    <>
        <div className="py-6 grid lg:flex justify-between items-center border-t border-gray-20">
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Page Link</dt>
            <dd className=" flex gap-x-6 sm:mt-0">
                <div className="text-gray-700 text-sm lg:text-base">{`https://www.zesti.ai?via=${display_url}`}</div>
            </dd>
        </div>
    </>
    )
}

function ConnectTikTokComponent({accountStatus, loginWithTikTok}: CreatorPageComponents) {
    

    if (accountStatus == 'creator_connect_tiktok' || accountStatus == 'creator_reconnect')  return (
        <dl className="py-6 divide-y text-sm leading-6">
            <div className="flex justify-between items-center">
                <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Connect Tiktok Account</dt>
                <dd className=" flex gap-x-6 sm:mt-0">
                    <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                        onClick={loginWithTikTok}>
                        {"Connect"}
                    </button>
                </dd>
            </div>
        </dl>
    )

    return (
        <div className="py-6 flex justify-between items-center divide-gray-100 border-t border-gray-200">
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Connect Tiktok Account</dt>
            <dd className=" flex gap-x-6 sm:mt-0">
                <div  className="font-semibold text-green-600 text-sm lg:text-base">
                    {"Connected"}
                </div>
            </dd>
        </div>
    )
}

function AffiliateProgramComponent({accountStatus, display_url}: CreatorPageComponents) {

    if (accountStatus !== 'creator_generate_page' && accountStatus !== 'creator') return;

    return(
    <>
        <div className="pt-6 flex justify-between items-center border-t border-gray-20">
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Affiliate Program</dt>
            <dd className=" flex gap-x-6 sm:mt-0">
                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                    onClick={() => {window.open(`https://zesti.promotekit.com/`)}}>
                    {accountStatus == 'creator_generate_page' ? "Setup" : "Manage"}
                </button>
                {/* TRACK AFFILIATE CODE INSIDE FIRESTORE THEN DISPLAY MANAGE AFFILIATE PROGRAM IF IT IS AVAILABLE*/}
            </dd>
        </div>
        <div className="flex space-x-1 items-center pb-6">
            <ExclamationTriangleIcon className="h-4 w-4 text-yellow-400"/>
            <p className="text-gray-500 text-xs lg:text-sm">{`Please set affiliate code to: ${display_url}`}</p>
        </div>
    </>
    )
}

function GenerateOrViewPageComponent({accountStatus, onGeneratePageClick, router}: CreatorPageComponents) {

    if (accountStatus == 'creator_generate_page') return (
        <div className={`pt-6 flex justify-between items-center border-t border-gray-20`}>
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Generate Your Page</dt>
            <dd className=" flex gap-x-6 sm:mt-0">
                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                    onClick={onGeneratePageClick}>
                    {"Create"}
                </button>
            </dd>
        </div>  
    )

    if (accountStatus == 'creator') return (
        <div className="py-6 flex justify-between items-center border-t border-gray-20">
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Make Page Changes</dt>
            <dd className=" flex gap-x-6 sm:mt-0">
                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                    onClick={() => router.push('/creator/edit')}>
                    {"Edit Page"}
                </button>
            </dd>
        </div>
    )

    return;
}
