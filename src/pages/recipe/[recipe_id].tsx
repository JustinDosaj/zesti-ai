import { GetServerSideProps } from "next";
import { useAuth } from "@/pages/api/auth/auth";
import { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import Head from "next/head";

const DynamicModal = dynamic(() => import('@/components/ui/modals/response').then((mod) => mod.ResponseModal), { ssr: false })
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
    const [ isSaved, setIsSaved ] = useState<boolean>(false)

    const jsonLd = {
        "@context": "http://schema.org",
        "@type": "Recipe",
        "name": recipe?.title,
        "author": {
          "@type": "TikTok Creator",
          "name": recipe?.owner?.nickname
        },
        //"datePublished": datePublished,
        "description": recipe?.description,
        "image": [
          `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(recipe?.cover_image_url)}?alt=media`
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

    },[user, recipe?.data?.id])


    return(
    <>
        <Head>
            <title>{`${recipe?.name} by ${recipe?.data?.owner?.nickname}`}</title>
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
            <meta name="title" content={`${recipe?.name} by ${recipe?.data?.owner?.nickname}`}/>
            <meta name="description" content={`Tiktok recipe by ${recipe?.data?.owner?.nickname} - ${recipe?.video_title?.slice(0, 200)}`}/>
            <meta property="og:title" content={`${recipe?.name} by ${recipe?.data?.owner?.nickname}`}/>
            <meta property="og:description" content={`${recipe?.description} from TikTok`}/>
            <meta property="og:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(recipe?.cover_image_url)}?alt=media`}/>
            <meta property="og:url" content={url}/>
            <meta property="twitter:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(recipe?.cover_image_url)}?alt=media`}/>
            <meta property="twitter:title" content={`${recipe?.name}`}/>
            <meta property="twitter:description" content={`Check out this TikTok recipe by @${recipe?.data?.owner?.username}`}/>
        </Head>  
        <main className={`flex min-h-screen flex-col items-center p-2 bg-background w-screen pb-28`}>
            <PublicRecipe recipe={recipe} setIsOpen={setIsOpen} role={stripeRole} isSaved={isSaved}/>
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
        </main>
    </>
    )
}

export default Recipe