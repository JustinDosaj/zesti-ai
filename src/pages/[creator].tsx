import { Raleway } from 'next/font/google'
import { CreatorSearch, CreatorPageTitle, CreatorSocials, CreatorPageRecentRecipes } from '@/components/creator/profile';
import { useAuth } from "@/pages/api/auth/auth"
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from "react";
import { PageLoader } from "@/components/shared/loader";
import Head from 'next/head';
import { db } from './api/firebase/firebase';
import GoogleTags from '@/components/tags/conversion';
import { PromoteKitTag } from '@/components/tags/headertags';
import { setCookie } from '@/pages/api/handler/cookies';
import firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';

const raleway = Raleway({subsets: ['latin']})


interface CreatorProps {
  creatorData: firebase.firestore.DocumentData | null;
  referer: string | null,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { creator } = context.params as { creator: string };


  let referer = context.req.headers.referer || null

  let creatorData = null;

  try {
    const querySnapshot = await db.collection('creators').where('display_name', '==', creator).get();

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      creatorData = { userId: doc.id, ...doc.data() };

      console.log(creatorData)
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  } catch (error) {
    console.error('Error fetching creator:', error);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
    }
  }

  return {
    props: {
      creatorData,
      referer,
    },
  };

};

const CreatorPage: NextPage<CreatorProps> = ({ creatorData, referer }) => {

  const { user, isLoading, stripeRole } = useAuth();
  const [isLoadingRecipes, setIsLoadingRecipes] = useState<boolean>(true);
  const [ recipes, setRecipes ] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user) {
        const recipeSnapshot = await db.collection(`creators/${creatorData?.owner_id}/recipes`).get();
        const updatedRecipes = recipeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRecipes(updatedRecipes);
        setIsLoadingRecipes(false);
      }
    };

    if (user == null && !isLoading) {
      router.replace('/');
    } else if (user !== null && !isLoading) {
      fetchRecipes();
    }
  }, [user, isLoading, router]);

  useEffect(() => {

    if (typeof window !== 'undefined') {

      if (creatorData?.affiliate_code && referer !== null && !referer.includes("zesti.ngrok.app")) {
        
        window.promotekit_referral = creatorData.affiliate_code
        const affiliateCode = window.promotekit_referral;
        setCookie('affiliate_code', affiliateCode!, 30);

      }

    }

  }, [creatorData, referer]);

  console.log("Recipes:, ", recipes)

  if (isLoading || !creatorData) return <PageLoader/>

  // Render your creator data here
  return (
    <>
    <Head>
      <title>Zesti | Creator Page</title> {/* Add Dynamic Title to display creator username for improved SEO*/}
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background space-y-4 ${raleway.className}`}>
      <CreatorPageTitle creatorData={creatorData}/>
      <CreatorSocials creatorData={creatorData}/>
      <CreatorSearch creatorData={creatorData}/>
      <CreatorPageRecentRecipes recipes={recipes} creatorName={creatorData?.display_name}/>
      {/* other creator data */}
    </main>
    </>
  );
};

export default CreatorPage