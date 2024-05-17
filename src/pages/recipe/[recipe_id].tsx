import { GetServerSideProps } from "next";
import { useAuth } from "@/pages/api/auth/auth";
import { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import Head from "next/head";

const DynamicModal = dynamic(() => import('@/components/ui/modals/response').then((mod) => mod.ResponseModal), { ssr: false })
const ErrorReportModal = dynamic(() => import('@/components/ui/modals/report').then((mod) => mod.ErrorReportModal), { ssr: false })
const Chatbox = dynamic(() => import('@/components/chat/chatbox').then((mod) => mod.Chatbox), { ssr: false });
const PublicRecipe = dynamic(() => import('@/components/ui/recipe').then((mod) => mod.PublicRecipe), { ssr: false });

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { req, query, resolvedUrl } = context; 
    
    const id = query?.recipe_id as string

    const GetRecipeSnapshot = (await (import ('../api/firebase/functions'))).GetRecipeSnapshot
    const recipeSnapshot = await GetRecipeSnapshot(id)

    let recipe = null;

    if(recipeSnapshot.exists()) {
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
    const [ isErrorOpen, setIsErrorOpen ] = useState<boolean>(false)    
    const [ isSaved, setIsSaved ] = useState<boolean>(false)
    const { name, video_title, description, cover_image_url } = recipe
    const { source, owner, } = recipe?.data

    const upperCaseSource = source?.charAt(0).toUpperCase() + source?.slice(1)
    
    const jsonLd = {
        "@context": "http://schema.org",
        "@type": "Recipe",
        "name": name,
        "author": {
          "@type": "TikTok Creator",
          "name": owner?.nickname
        },
        //"datePublished": datePublished,
        "description": description,
        "image": [
          `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`
        ]
    };

    useEffect(() => {
        if(user) { 
            existingRecipes()
        }

        async function existingRecipes() {
            const CheckForExistingRecipe = (await (import ('../api/firebase/functions'))).CheckForExistingRecipe
            user && CheckForExistingRecipe(recipe, user?.uid, setIsSaved) 
        }

    },[user, recipe?.data?.unique_id])

    return(
    <>
        <Head>
            <title>{`${name} by ${owner?.nickname}`}</title>
            <meta name="title" content={`${name} by ${owner?.nickname}`}/>
            <meta name="description" content={`${upperCaseSource} recipe from \@${owner?.username} - ${video_title?.slice(0, 200)}`}/>
            <meta property="og:title" content={`${name} by ${owner?.nickname}`}/>
            <meta property="og:description" content={`${description} from ${upperCaseSource}`}/>
            <meta property="og:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`}/>
            <meta property="og:url" content={url}/>
            <meta property="twitter:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`}/>
            <meta property="twitter:title" content={`${name}`}/>
            <meta property="twitter:description" content={`Check out this TikTok recipe by @${owner?.username}`}/>
        </Head>  
        <main className={`flex min-h-screen flex-col items-center p-2 bg-background w-screen pb-28`}>
            <PublicRecipe recipe={recipe} setIsOpen={setIsOpen} setIsErrorOpen={setIsErrorOpen} role={stripeRole} isSaved={isSaved}/>
            <Chatbox role={stripeRole} recipe={recipe}/>
            <DynamicModal
              title={`${recipe?.name} Saved!`}
              text={`You can view it by visiting your saved recipe page!`}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              displayAd={true}
              role={stripeRole}
              buttonName={"My Recipes"}
            />
            <ErrorReportModal
                isOpen={isErrorOpen}
                setIsOpen={setIsErrorOpen}
                title={"Report Recipe"}
                text={"If there is a problem with this recipe, please let us know so we can investigate it as soon as possible!"}
                recipe_id={recipe?.data?.unique_id}
                user_id={user?.uid || null}
            />
        </main>
    </>
    )
}

export default Recipe