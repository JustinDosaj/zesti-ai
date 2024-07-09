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

const DynamicModal = dynamic(() => import('@/components/ui/modals/response').then((mod) => mod.ResponseModal), { ssr: false });
const ErrorReportModal = dynamic(() => import('@/components/ui/modals/report').then((mod) => mod.ErrorReportModal), { ssr: false });
const AdSenseDisplay = dynamic(() => import('@/components/tags/adsense'), { ssr: false, loading: () => <div style={{ height: '90px' }} /> });
const TikTokVideo = dynamic(() => import('@/components/ui/recipe/tiktok'), { ssr: false, loading: () => <div style={{ height: '90px' }} /> });

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

  return { props: { recipe, ogUrl } };
};

const Recipe: React.FC = ({ recipe, ogUrl }: any) => {
  const { stripeRole, user, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

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
        <title>{`${name} Recipe By ${owner?.nickname}`}</title>
        <meta name="title" content={`${name} Recipe By ${owner?.nickname}`} />
        <meta name="description" content={`${source} recipe from @${owner?.username} - ${video_title?.slice(0, 200)}`} />
        <meta property="og:title" content={`${name} Recipe By ${owner?.nickname}`} />
        <meta property="og:description" content={`${description} from ${source}`} />
        <meta property="og:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`} />
        <meta property="og:url" content={ogUrl} />
        <meta property="twitter:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`} />
        <meta property="twitter:title" content={`${name}`} />
        <meta property="twitter:description" content={`Check out this TikTok recipe by @${owner?.username}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <main className="bg-background min-h-screen flex justify-center px-4 sm:px-8 md:px-14 lg:px-5 pb-28 lg:space-x-24">
        
        
      <div className={`w-full lg:w-2/3 xl:w-1/2 lg:max-w-[728px] space-y-10 lg:mt-10 mt-8`}>
          <RecipeTitleCard recipe={recipe} isSaved={isSaved} setIsOpen={setIsOpen} user={user} isLoading={isLoading} />
          <AdSenseDisplay adSlot="3721531543" adFormat="horizontal" widthRes={"false"} role={stripeRole} maxHeight="90px" /> 
          <RecipeIngredientsComponent ingredients={ingredients} />
          <AdSenseDisplay adSlot="6960485708" adFormat="horizontal" widthRes={"false"} role={stripeRole} maxHeight="90px" /> 
          <RecipeInstructionsComponent instructions={instructions} />
          <AdSenseDisplay adSlot="2408449875" adFormat="horizontal" widthRes={"false"} role={stripeRole} maxHeight="90px" /> 
          <TikTokVideo video_id={video_id} />
          <AdSenseDisplay adSlot="5275868942" adFormat="horizontal" widthRes={"false"} role={stripeRole} maxHeight="90px" /> 
          <RecipeDataComponent recipe={recipe} setIsErrorOpen={setIsErrorOpen} />
        </div>
        {stripeRole !== 'premium' && (
          <div className="hidden lg:flex lg:flex-col l lg:space-y-6 lg:justify-between lg:ml-8 lg:w-1/6 lg:mt-10 mt-8">
            <AdSenseDisplay adSlot="7190552003" adFormat="vertical" widthRes={"false"} role={stripeRole} maxHeight="600px" />
            <AdSenseDisplay adSlot="8782286534" adFormat="vertical" widthRes={"false"} role={stripeRole} maxHeight="250px" />
            <AdSenseDisplay adSlot="7469204867" adFormat="vertical" widthRes={"false"} role={stripeRole} maxHeight="600px" />
          </div>
        )}


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
  );
};

export default Recipe;
