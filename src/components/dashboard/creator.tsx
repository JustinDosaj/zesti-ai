import React, { useState, useEffect } from 'react'
import { PageLoader, RecipeListLoader } from '../shared/loader'
import { Button } from '../shared/button'
import { useAuth } from '@/pages/api/auth/auth'
import { saveAffiliateLink } from '@/pages/api/firebase/functions'
import { SparklesIcon, VideoCameraIcon, LinkIcon, PlusCircleIcon, PencilIcon, ComputerDesktopIcon, Cog6ToothIcon } from "@heroicons/react/20/solid"
import { saveBioDataToFireStore } from '@/pages/api/firebase/functions'
import { Container } from '../shared/container'
import { Paragraph } from '../shared/paragraph'
import Link from 'next/link'

function classNames(...classes: (string | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

export function CreatorSettingsComponent({userData, creatorData}: any) {

    const { user, isLoading, loginWithTikTok, tikTokAccessToken } = useAuth()
    const [ affiliateLink, setAffiliateLink ] = useState<string>('')
    const [ edit, setEdit ] = useState<boolean>(false) 

    useEffect(() => {
        setAffiliateLink(creatorData?.affiliate_link)
    },[creatorData])

    if (isLoading || !userData || !creatorData) return <PageLoader/>

    if (!tikTokAccessToken) return (
        <div>
            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Creator Page</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                Please connect your tiktok to create your page
            </p>
            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Email</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <div className="text-gray-700 text-sm lg:text-base">{user?.email}</div>
                        {/* *CHANGE TO SOMETHING ELSE AFTER FIRST TIKTOK CONNECTION --> OPTION TO RECONNECT OR CHANGE ACCOUNTS WILL DELETE CURRENT PAGE
                            *POSSIBLE REQUIRE TIKTOK ACCOUNT AUTHROIZATION BEFORE APPLICATION SUBMISSION TO ENSURE WE KNOW THIS PERSON OWNS A TIKTOK 
                        */}
                    </dd>
                </div>
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Connect Tiktok Account</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={loginWithTikTok}>
                            {"Connect"}
                        </button>
                        {/* *CHANGE TO SOMETHING ELSE AFTER FIRST TIKTOK CONNECTION --> OPTION TO RECONNECT OR CHANGE ACCOUNTS WILL DELETE CURRENT PAGE
                            *POSSIBLE REQUIRE TIKTOK ACCOUNT AUTHROIZATION BEFORE APPLICATION SUBMISSION TO ENSURE WE KNOW THIS PERSON OWNS A TIKTOK 
                        */}
                    </dd>
                </div>
            </dl>
        </div>
    )

    return(
        <div>
            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Creator Page</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                Get page link, affilaite code & more
            </p>
            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Email</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <div className="text-gray-700 text-sm lg:text-base">{user?.email}</div>
                        {/* *CHANGE TO SOMETHING ELSE AFTER FIRST TIKTOK CONNECTION --> OPTION TO RECONNECT OR CHANGE ACCOUNTS WILL DELETE CURRENT PAGE
                            *POSSIBLE REQUIRE TIKTOK ACCOUNT AUTHROIZATION BEFORE APPLICATION SUBMISSION TO ENSURE WE KNOW THIS PERSON OWNS A TIKTOK 
                        */}
                    </dd>
                </div>
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Page Link</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <div className="text-gray-700 text-sm lg:text-base">{`https://www.zesti.ai/${creatorData?.display_name}`}</div>
                        {/* *CHANGE TO SOMETHING ELSE AFTER FIRST TIKTOK CONNECTION --> OPTION TO RECONNECT OR CHANGE ACCOUNTS WILL DELETE CURRENT PAGE
                            *POSSIBLE REQUIRE TIKTOK ACCOUNT AUTHROIZATION BEFORE APPLICATION SUBMISSION TO ENSURE WE KNOW THIS PERSON OWNS A TIKTOK 
                        */}
                    </dd>
                </div>
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Connect Tiktok Account</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={loginWithTikTok}>
                            {"Reconnect"}
                        </button>
                        {/* *CHANGE TO SOMETHING ELSE AFTER FIRST TIKTOK CONNECTION --> OPTION TO RECONNECT OR CHANGE ACCOUNTS WILL DELETE CURRENT PAGE
                            *POSSIBLE REQUIRE TIKTOK ACCOUNT AUTHROIZATION BEFORE APPLICATION SUBMISSION TO ENSURE WE KNOW THIS PERSON OWNS A TIKTOK 
                        */}
                    </dd>
                </div>
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Affiliate Program</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        { affiliateLink !== '' ?
                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={() => {window.open(`https://zesti.promotekit.com/`)}}>
                            Manage
                        </button>
                        :
                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={() => {window.open(`https://zesti.promotekit.com/`)}}>
                            Setup
                        </button>
                        }
                        {/* TRACK AFFILIATE CODE INSIDE FIRESTORE THEN DISPLAY MANAGE AFFILIATE PROGRAM IF IT IS AVAILABLE*/}
                    </dd>
                </div>
                <div className="pt-6 flex justify-between items-center">
                    <input className="border border-gray-300 p-2 rounded-3xl w-3/4 font-semibold text-gray-700 sm:w-64 sm:flex-none sm:pr-6" 
                        placeholder="Copy & Paste Affiliate Link Here"
                        disabled={!edit}
                        value={affiliateLink}
                        onChange={(val: any) => setAffiliateLink(val.target.value)}
                    />
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        { edit == false ? 
                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={() => setEdit(true)}>
                            {"Edit"}
                        </button>
                        :
                        <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                            onClick={() => {
                                saveAffiliateLink(affiliateLink, user?.uid!)
                                setEdit(false)
                                }}>
                            {"Save"}
                        </button>
                        }
                        {/* TRACK AFFILIATE CODE INSIDE FIRESTORE THEN DISPLAY MANAGE AFFILIATE PROGRAM IF IT IS AVAILABLE*/}
                    </dd>
                </div>
            </dl>
        </div>
    )
}

export function CreatorProfileComponent({creatorData}: any) {

    const { user, isLoading } = useAuth()
    const [ bio, setBio ] = useState<string>(creatorData?.bio_description ? creatorData.bio_description : '')
    const [ tiktok, setTikTok ] = useState<string>(creatorData?.profile_deep_link ? creatorData.profile_deep_link : '')
    const [ youtube, setYouTube ] = useState<string>(creatorData?.youtube_link ? creatorData.youtube_link : '')
    const [ twitter, setTwitter ] = useState<string>(creatorData?.twitter_link ? creatorData.twitter_link : '')
    const [ instagram, setInstagram ] = useState<string>(creatorData?.instagram_link ? creatorData.instagram_link : '')
    const [ website, setWebsite ] = useState<string>(creatorData?.website_link ? creatorData.website_link : '')
    const [ edit, setEdit ] = useState<boolean>(false)
    const [ saving, setSaving ] = useState<boolean>(false)

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
        setSaving(true)

        if (user) {
            const bioObject = {
                bio_description: bio,
                instagram_link: instagram,
                twitter_link: twitter,
                youtube_link: youtube,
                website_link: website,
            }

            const res = await saveBioDataToFireStore(bioObject, user?.uid)
        }
    }

    if (isLoading || !creatorData) return <PageLoader/>

    return(
        <div className="animate-fadeIn">
            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Your Creator Page</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                Add more information to your creator page
            </p>
            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 flex justify-between items-center">
                    <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Display Name</dt>
                    <dd className="mt-1 flex gap-x-6 sm:mt-0">
                        <div className="text-gray-700 text-sm lg:text-base">{creatorData?.display_name}</div>
                        {/* *CHANGE TO SOMETHING ELSE AFTER FIRST TIKTOK CONNECTION --> OPTION TO RECONNECT OR CHANGE ACCOUNTS WILL DELETE CURRENT PAGE
                            *POSSIBLE REQUIRE TIKTOK ACCOUNT AUTHROIZATION BEFORE APPLICATION SUBMISSION TO ENSURE WE KNOW THIS PERSON OWNS A TIKTOK 
                        */}
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
                            <input className="border border-gray-300 p-2 rounded-3xl w-3/4 font-semibold text-gray-700 sm:w-64 sm:flex-none sm:pr-6"
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
    )
}

export function CreatorTools({tiktokDisplayName}: any) {

    const stats = [
        { 
            id: 1, 
            name: tiktokDisplayName !== '' ? 'View Page' : 'Setup Page', 
            icon: tiktokDisplayName !== '' ? ComputerDesktopIcon : Cog6ToothIcon, 
            colorType: 'yellow', 
            href: tiktokDisplayName !== '' ? `/${tiktokDisplayName}` : `/creator/settings`, 
            desc: tiktokDisplayName !== '' ? "See what your page looks like to others" : 'Setup your creator page by connecting tiktok',
            buttonText: tiktokDisplayName !== '' ? `View Your Page` : `Setup`,
        },
        { 
            id: 2, 
            name: 'Edit Creator Page', 
            icon: PencilIcon, 
            colorType: 'red', 
            href: '/creator/page', 
            desc: "Make changes to your bio, social links and more",
            buttonText: 'Edit', 
        },
        { 
            id: 3, 
            name: 'Add Recipe', 
            icon: ComputerDesktopIcon, 
            colorType: 'green', 
            href: '/creator/add-recipe', 
            desc: "Quickly showcase readilbe recipes for your users",
            buttonText: 'Add Recipe', 
        },
      ]
    
      if (!tiktokDisplayName) return <PageLoader/>

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
    <div className="w-full">
      <dl className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-1 xl:grid-cols-3">
        {stats.map((item) => (
        <div key={item.id}>
            <Link href={item.href} className="">
                <div
                    key={item.id}
                    className="relative overflow-hidden rounded-3xl bg-white px-4 pb-12 pt-5 orange-border-shadow sm:px-6 sm:pt-6 hover:bg-gray-200 hover:ease-in hover:duration-100"
                >
                    <dt>
                    <div className={classNames(item.colorType == 'green' ? 'bg-color-alt-green bg-opacity-80' : item.colorType == 'yellow' ? 'bg-yellow-400' : item.colorType == 'red' ? 'bg-red-400' : 'bg-color-alt-green bg-opacity-80', `absolute rounded-xl p-3`)}>
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-lg font-semibold text-black">{item.name}</p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-sm sm:text-base text-gray-900">{item.desc}</p>
                    <div className="flex justify-center absolute inset-x-0 bottom-0 bg-gray-150 px-4 py-4 sm:px-6">
                        <div className="flex justify-center font-medium cursor-pointer text-white bg-gray-900 w-full text-sm p-2 rounded-3xl hover:bg-gray-700 hover:ease-in hover:duration-100">
                            {item.buttonText}<span className="sr-only"> {item.name} stats</span>
                        </div>
                    </div>
                    </dd>
                </div>
            </Link>
          </div>
        ))}
      </dl>
    </div>
    </Container>
    )
}

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

interface CreatorDashboardTitleProps {
    title: string,
    desc?: string,
    href?: any,
    img?: any,
}

export function CreatorDashboardTitle({title, desc}: CreatorDashboardTitleProps) {
    return(
            <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
                <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr to-primary from-primaryteal absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
                <div className="relative flex flex-col items-center text-center lg:py-7 xl:py-8 lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                    <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight
                    font-bold text-heading-1 text-black capitalize">
                    {title}
                    </h1>
                    <Paragraph className="mt-4 text-gray-600">
                        {desc}
                    </Paragraph>
                </div>
            </Container>
    )
}