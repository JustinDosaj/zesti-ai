import { GetServerSideProps } from 'next';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import { RecipeTitleCard } from '@/components/ui/recipe/title';
import { Ingredients } from '@/components/ui/recipe/ingredients';
import { Instructions } from '@/components/ui/recipe/instructions';
import { Information } from '@/components/ui/recipe/info';
import { RecipeSuggestions } from '@/components/ui/general/recipe-suggestions';
import { GetRecipeMap } from '../../api/firebase/functions';
import { StickyAd } from '@/components/ads/stickyAd';
import InstagramComponent from '@/components/ui/recipe/instagram';
import TikTokComponent from '@/components/ui/recipe/tiktok';

const ErrorReportModal = dynamic(() => import('@/components/ui/modals/report').then((mod) => mod.ErrorReportModal), { ssr: false });
const AdSense = dynamic(() => import('@/components/ads/adsense'), {
  ssr: false,
  loading: () => <div style={{ maxHeight: '320px' }}/>  // Placeholder while loading
});


export const getServerSideProps: GetServerSideProps = async (context) => {
    
  const { req, query, resolvedUrl } = context;
  const id = query.id as string;
  const slug = query.slug as string;

  const GetRecipeSnapshot = (await (import ('../../api/firebase/functions'))).GetRecipeSnapshot
  const recipeSnapshot = await GetRecipeSnapshot(id);

  const GetRecentRecipes = (await (import ('../../api/firebase/functions'))).GetRecentRecipes
  const recentRecipes = await GetRecentRecipes(6);

  const recipeMapSnapshot = await GetRecipeMap(id);

  if (recipeMapSnapshot.exists()) {
    const { redirect: newId, slug: newSlug } = recipeMapSnapshot.data();

    // Redirect to new URL
    return {
      redirect: {
        destination: `/recipes/${newId}/${newSlug}`,
        permanent: true,
      },
    };
  }

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
  }, [user, recipe?.data?.id]);

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
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/LikeAction",
      "userInteractionCount": `${likes || 0}`
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
        <title>{`${name} Recipe by ${owner?.nickname}`}</title>
        <meta name="title" content={`${name} Recipe by ${owner?.nickname}`} />
        <meta name="description" content={`${source} recipe from @${owner?.username} - ${video_title?.slice(0, 200)}`} />
        <meta property="og:title" content={`${name} Recipe by ${owner?.nickname}`} />
        <meta property="og:description" content={`${description} from ${source}`} />
        <meta property="og:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`} />
        <meta property="og:url" content={ogUrl} />
        <meta property="twitter:image" content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cover_image_url)}?alt=media`} />
        <meta property="twitter:title" content={`${name} Recipe`} />
        <meta property="twitter:description" content={`Check out this TikTok recipe by @${owner?.username}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <main className="bg-background min-h-screen justify-center px-5 sm:px-8 md:px-14 lg:px-5 pb-28">
        
      <div className="max-w-5xl mx-auto flex justify-center space-x-10"> 
        <div className={`w-full lg:w-5/6 md:max-w-[728px] space-y-12 lg:mt-14 mt-8`}>
            <RecipeTitleCard recipe={recipe} isSaved={isSaved} user={user} isLoading={isLoading} role={stripeRole} hasLiked={hasLiked} likes={likes} setHasLiked={setHasLiked} setLikes={setLikes}/>
            <AdSense className="mx-auto max-w-[320px] md:max-w-[728px]" adSlot="3721531543" adFormat="horizontal" adStyle={{ width: '100%', height: '100px', maxHeight: '320px' }} role={stripeRole}/>
            {source == "tiktok" ? <TikTokComponent video_id={video_id}/> : <InstagramComponent video_id={video_id}/>} 
            <AdSense className="mx-auto max-w-[320px] md:max-w-[728px]" adSlot="6960485708" adFormat="horizontal" adStyle={{ width: '100%', height: '100px', maxHeight: '320px' }} role={stripeRole}/>
            <Ingredients ingredients={ingredients} /> 
            <AdSense className="mx-auto max-w-[320px] md:max-w-[728px]" adSlot="2408449875" adFormat="horizontal" adStyle={{ width: '100%', height: '100px', maxHeight: '320px' }} role={stripeRole}/>
            <Instructions instructions={instructions} />
            <AdSense className="mx-auto max-w-[320px] md:max-w-[728px]" adSlot="5275868942" adFormat="horizontal" adStyle={{ width: '100%', height: '100px', maxHeight: '320px' }} role={stripeRole}/> 
            <Information recipe={recipe} setIsErrorOpen={setIsErrorOpen} />
        </div>

        {/* Sticky ad in right whitespace -- desktop only*/}
        {stripeRole !== 'premium' && (
            <StickyAd adSlot='7190552003'/>
        )}
        
      </div>
      
        <RecipeSuggestions recipes={recentRecipes} title={"Recently Added Recipes"} role={stripeRole}/>

        <ErrorReportModal
          isOpen={isErrorOpen}
          setIsOpen={setIsErrorOpen}
          title={"Recipe Feedback"}
          text={"If there is anything wrong with this recipe, please let us know and we will look into it as soon as possible!"}
          recipe_id={recipe?.data?.id}
          user_id={user?.uid || null}
        />
      </main>
    </>
  );
};

export default Recipe;
