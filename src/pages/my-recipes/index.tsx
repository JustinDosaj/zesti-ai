import { useAuth } from '@/context/AuthContext';
import Head from 'next/head';
import { Title } from '@/components/shared/title';
import AdSense from "@/components/ads/adsense";
import useRequireAuth from '@/hooks/user/useRequireAuth';
import { RecipeCardList } from '@/components/ui/recipe/list';
import useUserRecipeList from '@/hooks/user/useUserRecipeList'; // Import the hook
import useUserAIRecipeList from '@/hooks/user/useUserAIRecipeList';
import { useState } from 'react';
import { MyRecipeSearch } from "@/components/tools/my-recipe-search";
import { Paragraph } from "@/components/shared/paragraph";
import { Container } from "@/components/shared/container";

export default function MyRecipes() {
  
  useRequireAuth();

  const { user, isLoading, stripeRole } = useAuth();
  const { userRecipeList, loadingUserRecipes } = useUserRecipeList(user, isLoading); // Use the hook
  const { userAIRecipeList, loadingUserAIRecipes } = useUserAIRecipeList(user, isLoading); // Use the hook
  const [searchQuery, setSearchQuery] = useState('');

  const combinedRecipes = [...userRecipeList, ...userAIRecipeList];

  // Filter the recipes based on the search query
  const filteredRecipes = combinedRecipes.filter(recipe => {
    const query = searchQuery.toLowerCase();
    return (
      recipe.name.toLowerCase().includes(query) ||
      recipe.data.owner?.nickname?.toLowerCase().includes(query) ||
      recipe.data.owner?.username?.toLowerCase().includes(query) ||
      recipe.keywords?.some((keyword: string) => keyword.toLowerCase().includes(query))
    );
  });

  return (
    <>
      <Head>
        <title>Zesti AI | My Recipes</title>
        <meta name="title" content={`Zesti AI | My Recipes`} />
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background w-full space-y-4 pb-48`}>
        <div className="mt-8"/>
        <Container>
          <Title className="text-center">Saved Recipes</Title>
          <Paragraph className="text-center mt-2">Access & search all of the recipes you have saved on Zesti</Paragraph>
        </Container>
        <MyRecipeSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AdSense className="mx-auto max-w-[320px] md:max-w-[728px]" adSlot="9125889123" adFormat="horizontal" adStyle={{ width: '100%', maxHeight: '90px', height: '90px' }} role={stripeRole}/>
        <RecipeCardList recipes={filteredRecipes} maxDisplayCount={9} max={0} loading={loadingUserRecipes} loadingAI={loadingUserAIRecipes}/>
        <div className="my-1" />
        <AdSense className="max-w-5xl" adSlot="4770591581" adFormat="auto" adStyle={{ width: '100%', height: '250px' }} role={stripeRole}/>
      </main>
    </>
  );
}
