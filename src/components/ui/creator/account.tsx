import React, { useState, useEffect } from 'react'
import { PageLoader } from '@/components/shared/loader'
import { Button } from '@/components/shared/button'
import { useAuth } from '@/pages/api/auth/auth'
import { saveBioDataToFireStore, updateNotificationSettings, uploadCreatorPageImage } from '@/pages/api/firebase/functions'
import { useRouter } from 'next/router'
import { Notify } from '@/components/shared/notify'
import { Container } from '@/components/shared/container'
import { DocumentDuplicateIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/20/solid'
import { AccountTitleComponent, SimpleProfileComponent } from '../auth/account'
import { SwitchComponent } from '@/components/shared/switch'


export function CreatorSettingsComponent() {

    const { user, creatorData, isLoading, userData } = useAuth()
    const [ bio, setBio ] = useState<string>(creatorData?.bio_description ? creatorData.bio_description : '')
    const [ tiktok, setTikTok ] = useState<string>(creatorData?.socials?.tiktok?.link ? creatorData?.socials?.tiktok?.link : '')
    const [ youtube, setYouTube ] = useState<string>(creatorData?.socials?.youtube?.link ? creatorData.socials.youtube?.link : '')
    const [ twitter, setTwitter ] = useState<string>(creatorData?.socials?.twitter?.link ? creatorData.socials.twitter?.link : '')
    const [ instagram, setInstagram ] = useState<string>(creatorData?.socials?.instagram?.link ? creatorData.socials.instagram?.link : '')
    const [ website, setWebsite ] = useState<string>(creatorData?.socials?.website?.link ? creatorData.socials.website?.link : '')
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
        setTikTok(creatorData?.socials?.tiktok?.link || '');
        setYouTube(creatorData?.socials?.youtube?.link || '')
        setTwitter(creatorData?.socials?.twitter?.link || '')
        setInstagram(creatorData?.socials?.instagram?.link || '')
        setWebsite(creatorData?.socials?.website?.link || '')

        if(!creatorData && !isLoading) { router.push('/account')}

    }, [creatorData]);

    const saveBioData = async () => {

        setEdit(false)

        if (user) {
            const bioObject = {
                bio_description: bio,
                socials: {
                    instagram: {
                        link: instagram,
                    },
                    twitter: {
                        link: twitter,
                    },
                    youtube: {
                        link: youtube,
                    },
                    website: {
                        link: website,
                    },
                },
            }

            await saveBioDataToFireStore(bioObject, user?.uid)
            Notify("Creator page updated!")
        }
    }

    const handleImageSelect = async (event: any) => {
        const file = event.target.files[0]
        
        if(!user) {return;} // temporary
        
        if(file) {
            if(file.size > 1024 * 1024) {
                alert("File size should not exceed 1MB")
                return;
            }

            const img = new Image();
            img.src = URL.createObjectURL(file)
            img.onload = async () => {
                const width = img.naturalWidth
                const height = img.naturalHeight

                URL.revokeObjectURL(img.src)

                if(width !== height || width > 250 || height > 250) {
                    alert("Only 1:1 ratio images (max 250x250) are accepted")
                }

                await uploadCreatorPageImage(file, user?.uid)
                console.log(`Correct File Format: ${file}`)
            }
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
                            <PageLinkComponent affiliate_code={creatorData.affiliate_code} accountStatus={userData?.account_status}/>
                            <SimpleProfileComponent title={"Page Name"} desc={creatorData?.display_name} onButtonClick={() => router.push(`/${creatorData?.affiliate_code}`)} buttonName={"View Page"}/>
                            <div className="pt-6 flex items-center justify-between border-gray-200">
                                <dt className="grid grid-cols-1 font-semibold text-gray-900 sm:w-64 sm:flex-none pr-6 text-sm lg:text-base">
                                    <span>Page Image</span>
                                    <span className="text-xs text-gray-500">{"(Max: 250x250 px)"}</span>
                                </dt>
                                <dd className="flex flex-col gap-y-2 space-x-6 sm:flex-row items-center">
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/png, image/jpeg*"
                                        onChange={handleImageSelect}
                                        className="sr-only hidden" // Hide the actual input
                                    />
                                    <img
                                        src={creatorData.page_image || '/images/page-image-placeholder.png'}
                                        alt="Profile Picture"
                                        height={75}
                                        width={75}
                                        className="rounded-xl"
                                    />
                                    <label htmlFor="file-upload" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base cursor-pointer">
                                        Update Image
                                    </label>
                                </dd>
                            </div>
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
    const router = useRouter()

    if(userData?.account_status == 'user' || null) return <div className="hidden"/>

    return(
        <Container className={"mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-24"}>
            <div className="mx-auto max-w-2xl lg:flex lg:gap-x-16 lg:px-8 py-8 w-full standard-component-border">
                <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                        <AccountTitleComponent title="Creator Information" desc="Connect your Tiktok, manage your affiliate account & edit your page"/>
                            <dl className="mt-6 space-y-6 text-sm leading-6 divide-y divide-gray-300 border-t border-gray-200">
                                <PageLinkComponent accountStatus={userData?.account_status} affiliate_code={creatorData?.affiliate_code}/>
                                <SimpleProfileComponent buttonName={"Manage"} title={"Affiliate Program"} onButtonClick={() => {window.open(`https://zesti.promotekit.com/`)}}/>
                                <SimpleProfileComponent
                                    onButtonClick={() => router.push('/creator/edit/')}
                                    title={"Recipe Collection"}
                                    buttonName={"Edit/View"}
                                />
                                <CreatorNotificationComponent isOn={userData?.settings?.notifications?.active} userId={user?.uid}/>
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
    affiliate_code?: string,
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

function PageLinkComponent({affiliate_code, accountStatus}:CreatorPageComponents) {

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

    const urlToCopy = `https://www.zesti.ai?via=${affiliate_code}`;

    return(
        <div className="pt-6 grid lg:flex justify-between items-center">
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">
                <span>Affiliate Link</span>
            </dt>
            <dd className="flex items-center gap-x-6 sm:mt-0">
                <div className="text-gray-700 text-sm lg:text-base">{urlToCopy}</div>
                { isLinkCopied ?
                <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-600 cursor-pointer" onClick={() => copyToClipboard(urlToCopy)} aria-label="Copy link" />
                :
                <DocumentDuplicateIcon className="h-5 w-5 text-gray-400 cursor-pointer" onClick={() => copyToClipboard(urlToCopy)} aria-label="Copy link" />
                }
            </dd>
        </div>
    )
}

interface NotifyProps {
    isOn?: boolean,
    userId?: string,
}

function CreatorNotificationComponent({isOn, userId}: NotifyProps) {

    return (
        <div className="pt-6 flex justify-between items-center border-t border-gray-200">
            <dt className="font-semibold text-gray-900 sm:w-64 sm:flex-none sm:pr-6 text-sm lg:text-base">Notifications</dt>
            <dd className="flex gap-x-6 sm:mt-0">
                {/* Container for the switch */}
                <SwitchComponent isOn={isOn} handleToggle={() => updateNotificationSettings(userId, isOn)}/>
            </dd>
        </div>
    );
}
