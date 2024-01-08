import React, { useState, useEffect } from 'react'
import { PageLoader } from '../shared/loader'
import { Button } from '../shared/button'
import { useAuth } from '@/pages/api/auth/auth'
import { saveAffiliateLink } from '@/pages/api/firebase/functions'
import { SparklesIcon, VideoCameraIcon, LinkIcon } from "@heroicons/react/20/solid"
import { saveBioDataToFireStore } from '@/pages/api/firebase/functions'
import { Container } from '../shared/container'
import Link from 'next/link'
import { handleCreatorTikTokURLSubmit } from '@/pages/api/handler/submit'

function classNames(...classes: (string | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

export function CreatorHomeComponent() {

    const { user, isLoading } = useAuth() 

    if (isLoading) return <PageLoader/>

    return(
        <div className="bg-yellow-200">
            <p className="text-xl text-gray-600">HOME</p>
            <p className="text-lg text-gray-600">Show links (view page, etc.)</p>
            <p className="text-lg text-gray-600">Show basic navigation options like add recipe or view page</p>
        </div>
    )
}

export function CreatorSettingsComponent({userData, creatorData}: any) {

    const { user, isLoading, loginWithTikTok, tikTokAccessToken } = useAuth()
    const [ affiliateLink, setAffiliateLink ] = useState<string>('')
    const [ edit, setEdit ] = useState<boolean>(false) 

    useEffect(() => {
        setAffiliateLink(userData?.affiliate_link)
    },[userData])

    if (isLoading) return <PageLoader/>

    return(
        <div>
            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Creator Page</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                Create recipes on TikTok? Easily showcase them for your users with Zesti
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
                            {tikTokAccessToken == null ? "Connect" : "Reconnect"}
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
                                console.log(affiliateLink)
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

    if (isLoading) return <PageLoader/>

    return(
        <div>
            <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">Your Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500 lg:text-base">
                View & edit what your viewers will see on your recipe page
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

export function RecentTikTokVideos({data, displayName}: any) {

    const { user, isLoading } = useAuth()
    const [ notify, setNotify ] = useState<boolean | null>(null)
    
    const addRecipeToCreatorPage = async (url_id: string) => {

        const url = `https://www.tiktok.com/@${displayName}/video/${url_id}`
        await handleCreatorTikTokURLSubmit({url, user, setNotify, url_id}).then((val) => {
            console.log(val)
        })
    
    }

    if (isLoading) return <PageLoader/>

    return(
        <div className="">
            {data?.videos?.map((item: any) => (
                <div className="space-y-4">
                    <div className="text-center section-title-text-size">Recent TikTok Videos</div>
                    <div className="inline-flex items-center space-x-4 border-gray-300 border rounded-r rounded-l">
                        <img src={item.cover_image_url} className="h-16 w-16 rounded-l" alt={""}/>
                        <span className="section-desc-text-size pr-4">{item.title}</span>
                        <button className="" onClick={() => addRecipeToCreatorPage(item.id)}>Add Recipe</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function CreatorTools({tiktokDisplayName}: any) {

    const stats = [
        { 
            id: 1, 
            name: 'Add Recipe', 
            icon: SparklesIcon, 
            colorType: 'green', 
            href: '/creator/add-recipe', 
            desc: "Create new recipes just for you",
            buttonText: 'Add Recipe', 
        },
        { 
            id: 2, 
            name: 'Edit Settings', 
            icon: VideoCameraIcon, 
            colorType: 'red', 
            href: '/tools/video', 
            desc: "Save recipes from YouTube or TikTok",
            buttonText: 'Temp', 
        },
        { 
            id: 3, 
            name: 'View Page', 
            icon: LinkIcon, 
            colorType: 'yellow', 
            href: `/${tiktokDisplayName}`, 
            desc: "Remove clutter from recipe websites",
            buttonText: 'View Your Page',
        },
      ]

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeIn"}>
    <div className="w-full">
      <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">Other Tools</h3>
      <dl className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
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