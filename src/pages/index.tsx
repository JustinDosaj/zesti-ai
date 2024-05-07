import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { Hero, HomePageCTA, HomePageScroller, ChatFeature, HomeVideoToRecipe } from '@/components/ui/features/users';
import { useAuth } from './api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { Raleway } from 'next/font/google'
import { useEffect, useState } from 'react';
import { FAQ } from '@/components/ui/general';

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
      
      const GetRandomRecipes = (await (import ('./api/firebase/functions'))).GetRandomRecipes
      const res = await GetRandomRecipes(9);
      setRecipes(res);
    }

    fetchRandomRecipes();

  },[])

  if (isLoading) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Zesti AI | A Better Way to Save TikTok Recipes</title>
        <meta name="title" content="Zesti AI | A Better Way to Save TikTok Recipes"/>
        <meta name="description" content="Instantly save delicious recipes from TikTok by using Zesti AI to transcribe your faovirte recipe videos to text!"/>
        <GoogleTags/>
      </Head>
      <main className={`main-seo-page-class ${raleway.className}`}>
        <Hero 
          titleStart={"A Better Way to Save"} 
          titleEnd={"TikTok Recipes"} 
          description={"Copy & paste a TikTok recipe link or search by ingredients, usernames & more!"}
        />
        <HomePageScroller recipes={recipes}/>
        <HomeVideoToRecipe titleStart={"Instantly Convert"} titleEnd={"Video to Recipe"} desc={""}/>
        <ChatFeature/>
        <HomePageCTA/>
        <FAQ title="FAQ" desc="Answers to the most common questions we get" type="user"/>
      </main>
    </>
  )
}
