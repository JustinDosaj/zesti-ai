import React, { useState, useEffect } from 'react'
import { PageLoader } from '@/components/shared/loader'
import { Button } from '@/components/shared/button'
import { useAuth } from '@/pages/api/auth/auth'
import { saveBioDataToFireStore } from '@/pages/api/firebase/functions'


function classNames(...classes: (string | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
  }

export function CreatorPageComponent({creatorData}: any) {

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