import { GetServerSideProps } from 'next';
import { useAuth } from "@/pages/api/auth/auth";
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import {
  RecipeTitleCard,
  RecipeIngredientsComponent,
  RecipeInstructionsComponent,
  RecipeDataComponent
} from '@/components/ui/recipe';
import { RecipeSuggestions } from '@/components/ui/recipe/suggestions';
import InstagramComponent from '@/components/ui/recipe/instagram';

const ErrorReportModal = dynamic(() => import('@/components/ui/modals/report').then((mod) => mod.ErrorReportModal), { ssr: false });
const AdSenseDisplay = dynamic(() => import('@/components/tags/adsense'), { ssr: false, loading: () => <div style={{ height: '90px' }} /> });
const TikTokVideo = dynamic(() => import('@/components/ui/recipe/tiktok'), { ssr: false, loading: () => <div style={{ height: '90px' }} /> });

export const getServerSideProps: GetServerSideProps = async (context) => {
    
  const { req, query, resolvedUrl } = context;
  const id = query.id as string;
  const slug = query.slug as string;

  const GetRecipeSnapshot = (await (import ('../../api/firebase/functions'))).GetRecipeSnapshot
  const recipeSnapshot = await GetRecipeSnapshot(id);

  const GetRecentRecipes = (await (import ('../../api/firebase/functions'))).GetRecentRecipes
  const recentRecipes = await GetRecentRecipes(6);

  let recipe = null;

  if (recipeSnapshot.exists()) {
    recipe = recipeSnapshot.data();
  }

  if (!recipe) {
    return {
      redirect: {
        destination: '/search',
        permanent: false,
      },
    };
  }

  if (slug === 'undefined') {
    return {
      redirect: {
        destination: `/recipe/${id}`,
        permanent: true,
      },
    };
  }

  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const ogUrl = `${protocol}://${host}${resolvedUrl}`;

  return { props: { recipe, ogUrl, recentRecipes } };
};

const Recipe: React.FC = ({ recipe, ogUrl, recentRecipes }: any) => {
  
  const { stripeRole, user, isLoading } = useAuth();
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(recipe?.data?.likes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const {
    name,
    video_title,
    description,
    cover_image_url,
    instructions,
    ingredients,
    category,
    cuisine,
    prep_time,
    cook_time,
    recipeYield,
    keywords,
    data: { source, owner, date_added, date_created, url, video_id },
  } = recipe;

  useEffect(() => {
    if (user) {
      existingRecipes();
    }
    async function existingRecipes() {
      const CheckForExistingRecipe = (await import('../../api/firebase/functions')).CheckForExistingRecipe;
      user && CheckForExistingRecipe(recipe, user?.uid, setIsSaved);
    }
  }, [user, recipe?.data?.unique_id]);

  useEffect(() => {
    if(recipe.data.likedBy && user) {
      setHasLiked(recipe.data.likedBy.includes(user.uid))
    }
  },[user, isLoading, recipe?.data?.likedBy])
  

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "Recipe",
    "name": name,
    "author": {
      "@type": "person",
      "name": owner?.nickname,
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": `${likes}`,
      "bestRating": "1",
      "ratingCount": `${likes}`,
    },
    "image": [
      `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`,
    ],
    "video": {
      "@type": "VideoObject",
      "name": video_title,
      "description": description,
      "contentUrl": url,
      "embedUrl": `https://www.tiktok.com/embed/${video_id}`,
      "thumbnailUrl": `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`,
      "uploadDate": date_created,
    },
  };

  return (
    <>
      <Head>
        <title>{`${name} Recipe`}</title>
        <meta name="title" content={`${name} Recipe`} />
        <meta name="description" content={`${source} recipe from @${owner?.username} - ${video_title?.slice(0, 200)}`} />
        <meta property="og:title" content={`${name} Recipe`} />
        <meta property="og:description" content={`${description} from ${source}`} />
        <meta property="og:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`} />
        <meta property="og:url" content={ogUrl} />
        <meta property="twitter:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`} />
        <meta property="twitter:title" content={`${name} Recipe`} />
        <meta property="twitter:description" content={`Check out this TikTok recipe by @${owner?.username}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <main className="bg-background min-h-screen justify-center px-4 sm:px-8 md:px-14 lg:px-5 pb-28">
        
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className={`w-full lg:w-5/6 lg:max-w-[728px] space-y-10 lg:mt-10 mt-8`}>
            <RecipeTitleCard recipe={recipe} isSaved={isSaved} user={user} isLoading={isLoading} role={stripeRole} hasLiked={hasLiked} likes={likes} setHasLiked={setHasLiked} setLikes={setLikes}/>
            <AdSenseDisplay adSlot="3721531543" adFormat="horizontal" widthRes={"false"} role={stripeRole} maxHeight="90px" />
            {source == "tiktok" ? <TikTokVideo video_id={video_id}/> : <InstagramComponent video_id={video_id}/>} 
            <AdSenseDisplay adSlot="6960485708" adFormat="horizontal" widthRes={"false"} role={stripeRole} maxHeight="90px" />
            <RecipeIngredientsComponent ingredients={ingredients} /> 
            <AdSenseDisplay adSlot="2408449875" adFormat="horizontal" widthRes={"false"} role={stripeRole} maxHeight="90px" /> 
            <RecipeInstructionsComponent instructions={instructions} />
            <AdSenseDisplay adSlot="5275868942" adFormat="horizontal" widthRes={"false"} role={stripeRole} maxHeight="90px" /> 
            <RecipeDataComponent recipe={recipe} setIsErrorOpen={setIsErrorOpen} />
        </div>


        {stripeRole !== 'premium' && (
          <div className="hidden lg:flex lg:flex-col l lg:space-y-6 lg:justify-between lg:ml-8 lg:w-[320px] lg:mt-10 mt-8">
            <AdSenseDisplay adSlot="7190552003" adFormat="vertical" widthRes={"false"} role={stripeRole} maxHeight="600px" />
            <AdSenseDisplay adSlot="8782286534" adFormat="vertical" widthRes={"false"} role={stripeRole} maxHeight="600px" />
            <AdSenseDisplay adSlot="7469204867" adFormat="vertical" widthRes={"false"} role={stripeRole} maxHeight="600px" />
          </div>
        )}
        </div>
      
        <RecipeSuggestions recipes={recentRecipes} title={"Recently Added Recipes"} role={stripeRole}/>

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
  );
};

export default Recipe;
