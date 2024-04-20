import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { Hero, HomePageCTA, HomePageScroller, ChatFeature, HomeVideoToRecipe } from '@/components/ui/features/users';
import { useAuth } from './api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { Raleway } from 'next/font/google'
import { useEffect, useState } from 'react';
import { GetRandomRecipes } from './api/firebase/functions';

const raleway = Raleway({subsets: ['latin']})


interface Recipe {
  id: string;
  name: string;
  cover_image_url: string;
  [key: string]: any; // Extend this interface based on the other fields you expect in your documents
}

export default function Home() {
  
  const { isLoading } = useAuth();
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      const res = await GetRandomRecipes(9);
      setRecipes(res);
    }

    fetchRandomRecipes();

  },[])

  console.log("Random Recipes: ", recipes)

  if (isLoading) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Zesti AI | Find Transcribed Recipes from TikTok</title>
        <meta name="title" content="Zesti AI | Find Transcribed Recipes from TikTok"/>
        <meta name="description" content="Spend less time writing recipes down and more time cooking! Find transcribed recipes from your favorite TikTok Chefs or transcribe a recipe yourself!"/>
        <GoogleTags/>
      </Head>
      <main className={`main-seo-page-class ${raleway.className}`}>
        <Hero 
          titleStart={"Your Favorite TikTok Recipes"} 
          titleEnd={"Instantly"} 
          description={"Paste the link to a TikTok recipe below or search by ingredients, usernames & more!"}
        />
        <HomePageScroller recipes={recipes}/>
        <HomeVideoToRecipe titleStart={"Instantly Convert"} titleEnd={"Video to Recipe"} desc={""}/>
        <ChatFeature/>
        <HomePageCTA/>
      </main>
    </>
  )
}
