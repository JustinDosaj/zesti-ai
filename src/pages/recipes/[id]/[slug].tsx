import { GetServerSideProps } from 'next';
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
    
    const id = query.id as string;
    const slug = query.slug as string;

    const GetRecipeSnapshot = (await (import ('../../api/firebase/functions'))).GetRecipeSnapshot
    const recipeSnapshot = await GetRecipeSnapshot(id);

    let recipe = null;

    if (recipeSnapshot.exists()) {
        recipe = recipeSnapshot.data();
    }

    if (!recipe) {
        return {
            redirect: {
                destination: '/search',
                permanent: false,
            }
        }
    } 

    if (slug == `undefined`) {
        return {
            redirect: {
                destination: `/recipe/${id}`,
                permanent: true,
            }
        }
    }

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const ogUrl = `${protocol}://${host}${resolvedUrl}`;

    return { props: { recipe, ogUrl } };
};

const Recipe: React.FC = ({ recipe, ogUrl }: any) => {

    const { stripeRole, user } = useAuth();
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ isErrorOpen, setIsErrorOpen ] = useState<boolean>(false)    
    const [ isSaved, setIsSaved ] = useState<boolean>(false)
    const { name, video_title, description, cover_image_url, instructions, ingredients, category, cuisine, prep_time, cook_time, recipeYield, keywords } = recipe
    const { source, owner, date_added, date_created, url, video_id } = recipe?.data

    const upperCaseSource = source?.charAt(0).toUpperCase() + source?.slice(1)
    
    const jsonLd = {
        "@context": "http://schema.org",
        "@type": "Recipe",
        "name": name,
        "author": {
          "@type": "person",
          "name": owner?.nickname
        },
        "recipeInstructions": instructions || "",
        "recipeIngredient": ingredients,
        "recipeCategory": category || "",
        "recipeCuisine": cuisine || "",
        "prepTime": prep_time || "",
        "cookTime": cook_time || "",
        "datePublished": date_added,
        "description": description,
        "recipeYield": recipeYield || "",
        "keywords": keywords || "",
        "image": [
          `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`
        ],
        "video": {
            "@type": "VideoObject",
            "name": video_title,
            "description": description,
            "contentUrl": url,
            "embedUrl": `https://www.tiktok.com/embed/${video_id}`,
            "thumbnailUrl": `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`,
            "uploadDate": date_created,
        }
    };

    useEffect(() => {
        if(user) { 
            existingRecipes()
        }

        async function existingRecipes() {
            const CheckForExistingRecipe = (await (import ('../../api/firebase/functions'))).CheckForExistingRecipe
            user && CheckForExistingRecipe(recipe, user?.uid, setIsSaved) 
        }

    },[user, recipe?.data?.unique_id])

    return(
    <>
        <Head>
            <title>{`${name} by ${owner?.nickname}`}</title>
            <meta name="title" content={`${name} Recipe by ${owner?.nickname}`}/>
            <meta name="description" content={`${upperCaseSource} recipe from \@${owner?.username} - ${video_title?.slice(0, 200)}`}/>
            <meta property="og:title" content={`${name} by ${owner?.nickname}`}/>
            <meta property="og:description" content={`${description} from ${upperCaseSource}`}/>
            <meta property="og:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`}/>
            <meta property="og:url" content={ogUrl}/>
            <meta property="twitter:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`}/>
            <meta property="twitter:title" content={`${name}`}/>
            <meta property="twitter:description" content={`Check out this TikTok recipe by @${owner?.username}`}/>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </Head>  
        <main className={`flex min-h-screen flex-col items-center p-2 bg-background w-full pb-28`}>
            <div className="mt-2 lg:mt-8"/>
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
