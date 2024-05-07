import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth";
import { PublicRecipe } from "@/components/ui/recipe";
import React, { useEffect, useState } from 'react'
import GoogleTags from "@/components/tags/conversion";
import Head from "next/head";
import { Chatbox } from "@/components/chat/chatbox";
import { BookmarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { CheckForExistingRecipe, GetRecipeSnapshot } from "../api/firebase/functions";
import dynamic from "next/dynamic";

const raleway = Raleway({subsets: ['latin']})

const DynamicModal = dynamic(() => import('@/components/ui/modals/response').then((mod) => mod.ResponseModal), { ssr: false })

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { req, query, resolvedUrl } = context; 
    
    const id = query?.recipe_id as string
    
    let recipe = null;

    const recipeSnapshot = await GetRecipeSnapshot(id)

    if(recipeSnapshot.exists) {
        recipe = recipeSnapshot.data()
    }

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host
    const url = `${protocol}://${host}${resolvedUrl}`

    return {props: { recipe, url }}
}

const Recipe: React.FC = ({ recipe, url }: any) => {

    const { stripeRole, user } = useAuth();
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ isSaved, setIsSaved ] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if(user) { 
            CheckForExistingRecipe(recipe, user?.uid, setIsSaved) 
        }
    },[user, recipe?.data?.id])

    return(
    <>
        <Head>
            <title>{`${recipe?.name} | TikTok Recipe`}</title>
            <meta name="title" content={`${recipe?.name} | TikTok Recipe`}/>
            <meta name="description" content={`@${recipe?.data?.owner?.username} | ${recipe?.video_title?.slice(0, 200)}`}/>
            <meta property="og:title" content={`${recipe?.name} by ${recipe?.data?.owner?.username}`}/>
            <meta property="og:description" content={`${recipe?.video_title} from ${recipe?.data?.source}`}/>
            <meta property="og:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(recipe?.cover_image_url)}?alt=media`}/>
            <meta property="og:url" content={url}/>
            <meta property="twitter:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(recipe?.cover_image_url)}?alt=media`}/>
            <meta property="twitter:title" content={`${recipe?.name}`}/>
            <meta property="twitter:description" content={`Check out this TikTok recipe by @${recipe?.data?.owner?.username}`}/>
            <GoogleTags/>
        </Head>  
        <main className={`flex min-h-screen flex-col items-center p-2 bg-background w-screen pb-28 ${raleway.className}`}>
            <PublicRecipe recipe={recipe} setIsOpen={setIsOpen} role={stripeRole} isSaved={isSaved}/>
            <Chatbox role={stripeRole} recipe={recipe}/>
            <DynamicModal
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