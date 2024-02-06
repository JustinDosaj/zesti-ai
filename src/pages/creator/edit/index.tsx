
import { SharedHomeSectionTitle } from "@/components/shared/title";
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { useAuth } from "@/pages/api/auth/auth";
import { PromoteKitTag } from '@/components/tags/headertags';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { Raleway } from "next/font/google";
import { CreatorPageComponent } from "@/components/creator/profile";
import Breadcrumbs from "@/components/shared/breadcrumb";
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import { PageLoader } from "@/components/shared/loader";
import useCreatorStatus from "@/hooks/creator/useCreatorStatus";
import useRequireAuth from "@/hooks/user/useRequireAuth";

const raleway = Raleway({subsets: ['latin']})

export default function Page() {

  useSetBreadcrumbs()
  const { user, userData, creatorData, isLoading } = useAuth();
  const { require } = useRequireAuth(user, isLoading)
  const { creatorStage } = useCreatorStatus(userData, isLoading)
  
  return (
    <>
        <Head>
            <title>Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator</title>
            <meta name="title" content="Zesti | Save Tiktok & Youtube Recipes | AI Recipe Generator"/>
            <meta name="description" content="Easily save & edit recipes found from cooking youtube & tiktok videos. Plus chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
            <GoogleTags/>
            <PromoteKitTag/>
        </Head>
        <main className={`flex min-h-screen flex-col items-center bg-background w-screen ${raleway.className}`}>
            <Breadcrumbs/>
            <SharedHomeSectionTitle titleBlack="Creator Settings" desc="Add more information to your creator pages"/>
            <CreatorPageComponent creatorData={creatorData}/>
        </main>
    </>
  )
}
