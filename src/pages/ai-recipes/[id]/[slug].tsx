import { GetServerSideProps } from 'next';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import { AIRecipeTitleCard } from '@/components/ui/recipe/title';
import { Ingredients } from '@/components/ui/recipe/ingredients';
import { Instructions } from '@/components/ui/recipe/instructions';
import { Information } from '@/components/ui/recipe/info';
import { RecipeSuggestions } from '@/components/ui/general/recipe-suggestions';
import { StickyAd } from '@/components/ads/stickyAd';

const ErrorReportModal = dynamic(() => import('@/components/ui/modals/report').then((mod) => mod.ErrorReportModal), { ssr: false });
const AdSense = dynamic(() => import('@/components/ads/adsense'), {
  ssr: false,
  loading: () => <div style={{ maxHeight: '320px' }}/>  // Placeholder while loading
});


export const getServerSideProps: GetServerSideProps = async (context) => {
    
  const { req, query, resolvedUrl } = context;
  const id = query.id as string;
  const slug = query.slug as string;

  const GetAIRecipeSnapshot = (await (import ('../../api/firebase/functions'))).GetAIRecipeSnapshot
  const recipeSnapshot = await GetAIRecipeSnapshot(id);

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
    instructions,
    ingredients,
    data: { source, video_id },
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


  return (
    <>
      <Head>
        <title>{`${name} Recipe`}</title>
        <meta name="title" content={`${name} Recipe`} />
        <meta name="description" content={`${name} Recipe`} />
      </Head>
      <main className="bg-background min-h-screen justify-center px-5 sm:px-8 md:px-14 lg:px-5 pb-28">
        
      <div className="max-w-5xl mx-auto flex justify-center space-x-10"> 
        <div className={`w-full lg:w-5/6 md:max-w-[728px] space-y-12 lg:mt-14 mt-8`}>
            <AIRecipeTitleCard recipe={recipe} isSaved={isSaved} user={user} isLoading={isLoading} role={stripeRole} hasLiked={hasLiked} likes={likes} setHasLiked={setHasLiked} setLikes={setLikes}/>
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
