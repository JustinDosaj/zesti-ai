import React, { useState, useEffect } from 'react'
import { PageLoader } from '@/components/shared/loader'
import { Button } from '@/components/shared/button'
import { useAuth } from '@/pages/api/auth/auth'
import { saveBioDataToFireStore } from '@/pages/api/firebase/functions'
import { useRouter } from 'next/router'
import { Notify } from '@/components/shared/notify'
import { Container } from '@/components/shared/container'
import { callGenerateCreatorPage } from '@/pages/api/handler/submit'
import { DocumentDuplicateIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/20/solid'
import useAccountStatus from '@/hooks/useAccountStatus'
import useCreatorDoc from '@/hooks/creator/useCreatorDoc'
import { AccountTitleComponent, SimpleProfileComponent } from '../auth/account'


export function CreatorSettingsComponent() {

    const { user, creatorData, isLoading } = useAuth()
    
    const [ bio, setBio ] = useState<string>(creatorData?.bio_description ? creatorData.bio_description : '')
    const [ tiktok, setTikTok ] = useState<string>(creatorData?.profile_deep_link ? creatorData.profile_deep_link : '')
    const [ youtube, setYouTube ] = useState<string>(creatorData?.socials?.youtube_link ? creatorData.socials.youtube_link : '')
    const [ twitter, setTwitter ] = useState<string>(creatorData?.socials?.twitter_link ? creatorData.socials.twitter_link : '')
    const [ instagram, setInstagram ] = useState<string>(creatorData?.socials?.instagram_link ? creatorData.socials.instagram_link : '')
    const [ website, setWebsite ] = useState<string>(creatorData?.socials?.website_link ? creatorData.socials.website_link : '')
    const { accountStatus, loginWithTikTok } = useAccountStatus()
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
        setBio(creatorData?.bio_description || '')
        setTikTok(creatorData?.profile_deep_link || '');
        setYouTube(creatorData?.socials?.youtube_link || '')
        setTwitter(creatorData?.socials?.twitter_link || '')
        setInstagram(creatorData?.socials?.instagram_link || '')
        setWebsite(creatorData?.socials?.website_link || '')

        if(!creatorData && !isLoading) { router.push('/account')}

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
                        <AccountTitleComponent title={"Edit Your Page"} desc={"Contribute to your recipe collection & add social media links to let users follow you on other platforms"}/>
                        <dl className="mt-6 space-y-6 text-sm leading-6 divide-y divide-gray-300">
                            <PageLinkComponent display_url={creatorData.display_url} accountStatus={accountStatus}/>
                            <SimpleProfileComponent title={"Page Name"} desc={creatorData?.display_name} onButtonClick={() => router.push(`/${creatorData?.display_url}`)} buttonName={"View Page"}/>
                            <SimpleProfileComponent title={"Recipe Collection"} onButtonClick={() => router.push(`/creator/edit/manage-recipes`)} buttonName={"Add/Remove/Edit"}/>
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
                                        <Button isLink={false} buttonType="button" className="font-semibold text-sm lg:text-base w-28" text="Save"
                                            onClick={saveBioData}>
                                        </Button>
                                        <Button isLink={false} buttonType="button" className="font-semibold text-sm lg:text-base w-28" text="Cancel"
                                            onClick={() => setEdit(false)}>
                                        </Button>
                                    </div>
                                    :
                                    <Button isLink={false} buttonType="button" className="font-semibold text-sm lg:text-base w-28" text="Edit"
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

export function CreatorProfileComponent() {

    const { creatorData, userData, user } = useAuth()
    const { hasPage } = useCreatorDoc(user?.uid)
    const { accountStatus, loginWithTikTok } = useAccountStatus()
    const [ isPageGenerating, setIsPageGenerating ] = useState<boolean>(false)
    const router = useRouter() 

    const onGeneratePageClick = async () => {
        setIsPageGenerating(true)
        await callGenerateCreatorPage({creatorData})
        setIsPageGenerating(false)
    }

    if(accountStatus == 'user' || null) return <div className="hidden"/>

    return(
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-24"}>
            <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 py-8 w-full standard-component-border">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                        <AccountTitleComponent title="Creator Information" desc="Connect your Tiktok, manage your affiliate account & edit your page"/>
                            <dl className="mt-6 space-y-6 text-sm leading-6 divide-y divide-gray-300">
                                <PageLinkComponent accountStatus={accountStatus} display_url={creatorData?.display_url}/>
                                <ConnectTikTokComponent userData={userData} accountStatus={accountStatus} loginWithTikTok={loginWithTikTok}/>
                                <SimpleProfileComponent buttonName={"Manage"} title={"Affiliate Program"} onButtonClick={() => {window.open(`https://zesti.promotekit.com/`)}}/>
                                <GenerateOrViewPageComponent onGeneratePageClick={onGeneratePageClick} isPageGenerating={isPageGenerating} router={router} hasPage={hasPage}/>
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
    isPageGenerating?: boolean,
    hasPage?: boolean,
    userData?: any,
    linkName?: string,
    linkHref?: string,
}

function PageLinkComponent({display_url, accountStatus}:CreatorPageComponents) {

    const [ isLinkCopied, setIsLinkCopied ] = useState<boolean>(false)

    if (accountStatus !== "creator") return;

    const copyToClipboard = async (text: any) => {
    if (navigator.clipboard) { // Modern async API
        try {
            await navigator.clipboard.writeText(text);
            setIsLinkCopied(true)
            Notify("Copied link to clipboard")
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    } 
};

    const urlToCopy = `https://www.zesti.ai?via=${display_url}`;

    return(
    <>
        <div className="pt-6 grid lg:flex justify-between items-center">
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Affiliate Link</dt>
            <dd className="flex items-center gap-x-6 sm:mt-0">
                <div className="text-gray-700 text-sm lg:text-base">{urlToCopy}</div>
                { isLinkCopied ?
                <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-600 cursor-pointer" onClick={() => copyToClipboard(urlToCopy)} aria-label="Copy link" />
                :
                <DocumentDuplicateIcon className="h-5 w-5 text-gray-400 cursor-pointer" onClick={() => copyToClipboard(urlToCopy)} aria-label="Copy link" />
                }
            </dd>
        </div>
    </>
    )
}

function ConnectTikTokComponent({userData, loginWithTikTok}: CreatorPageComponents) {
    

    if (userData?.tiktokAccessToken == null)  return (
        <dl className="pt-6 text-sm leading-6">
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
        <div className="pt-6 flex justify-between items-center divide-gray-100 border-t border-gray-200">
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Connect Tiktok Account</dt>
            <dd className=" flex gap-x-6 sm:mt-0">
                <div  className="font-semibold text-green-600 text-sm lg:text-base">
                    {"Connected"}
                </div>
            </dd>
        </div>
    )
}

function GenerateOrViewPageComponent({onGeneratePageClick, isPageGenerating, router, hasPage}: CreatorPageComponents) {

    if (!hasPage) return (
        <div className={`pt-6 flex justify-between items-center border-t border-gray-20`}>
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Create Your Page</dt>
            <dd className=" flex gap-x-6 sm:mt-0">
                { isPageGenerating == false ?
                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                    onClick={onGeneratePageClick}>
                    {"Create"}
                </button>
                :
                <button type="button" disabled={true} className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base animate-pulse"
                    onClick={onGeneratePageClick}>
                    {"Loading..."}
                </button>
                }
            </dd>
        </div>  
    )

    if (hasPage) return (
        <div className="pt-6 flex justify-between items-center border-t border-gray-20">
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Your Recipe Page</dt>
            <dd className=" flex gap-x-6 sm:mt-0">
                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                    onClick={() => router.push('/creator/edit/')}>
                    {"Edit/View"}
                </button>
            </dd>
        </div>
    )

    return;
}
