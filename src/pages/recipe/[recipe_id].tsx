import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth";
import { PageLoader } from "@/components/shared/loader";
import { PublicRecipe } from "@/components/ui/recipe";
import React, { useState } from 'react'
import GoogleTags from "@/components/tags/conversion";
import Head from "next/head";
import Breadcrumbs from "@/components/shared/breadcrumb";
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import { Chatbox } from "@/components/chat/chatbox";
import { ResponseModal } from "@/components/ui/modals/response";
import { BookmarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import useRecipe from "@/hooks/useRecipe";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const id = context.query?.recipe_id as string
    return {props: { id }}
}

const Recipe: React.FC = ({id}: any) => {

    useSetBreadcrumbs()
    const { stripeRole } = useAuth();
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const { recipe, isLoadingRecipe } = useRecipe(id)
    const router = useRouter()

    if(isLoadingRecipe) return <PageLoader/>

    return(
    <>
        <Head>
            <title>{`${recipe?.name} | TikTok Recipe`}</title>
            <meta name="title" content={`${recipe?.name} | TikTok Recipe`}/>
            <meta name="description" content={`@${recipe?.data?.owner?.username} | ${recipe?.video_title.slice(0, 200)}`}/>
            <meta property="og:title" content={`${recipe?.name} by ${recipe?.data?.owner?.username}`}/>
            <meta property="og:description" content={`${recipe?.video_title} from ${recipe?.data?.source}`}/>
            <meta property="og:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(recipe?.cover_image_url)}?alt=media`}/>
            <meta property="og:url" content={`${recipe?.name} by ${recipe?.data?.owner?.username}`}/>
            <meta property="twitter:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(recipe?.cover_image_url)}?alt=media`}/>
            <meta property="twitter:card" content={`${recipe?.name} by ${recipe?.data?.owner?.username}`}/>
            <meta property="twitter:title" content="Twitter link preview title"/>
            <GoogleTags/>
        </Head>  
        <main className={`flex min-h-screen flex-col items-center p-2 bg-background w-screen pb-28 ${raleway.className}`}>
            <Breadcrumbs/>
            <PublicRecipe recipe={recipe} setIsOpen={setIsOpen} role={stripeRole}/>
            <Chatbox role={stripeRole} recipe={recipe}/>
            <ResponseModal
              title={`${recipe.name} Saved!`}
              text={`You can view the it by visiting your saved recipe page!`}
              icon={BookmarkIcon}
              iconColor={'orange'}
              modalFunction={() => router.push('/my-recipes')}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              displayAd={true}
              role={stripeRole}
              buttonName={"My Recipes"}
            />
    
        </main>
    </>
    )
}

export default Recipe