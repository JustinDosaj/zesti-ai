import { Raleway } from 'next/font/google'
import { CreatorSearch, CreatorPageTitle, CreatorSocials, CreatorPageRecentRecipes } from '@/components/creator/page';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from "react";
import { PageLoader } from "@/components/shared/loader";
import Head from 'next/head';
import { db } from './api/firebase/firebase';
import GoogleTags from '@/components/tags/conversion';
import { PromoteKitTag } from '@/components/tags/headertags';
import { setCookie } from '@/pages/api/handler/cookies';
import { useRouter } from 'next/router';
import { getCreatorByDisplayName } from './api/firebase/functions';
import firebase from 'firebase/compat/app';

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
    const querySnapshot = await getCreatorByDisplayName(creator)

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

  const [isLoadingRecipes, setIsLoadingRecipes] = useState<boolean>(true);
  const [ recipes, setRecipes ] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    
    const fetchRecipes = async () => {
        const recipeSnapshot = await db.collection(`creators/${creatorData?.owner_id}/recipes`).get();
        const updatedRecipes = recipeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRecipes(updatedRecipes);
        setIsLoadingRecipes(false);
    };

    fetchRecipes();

  }, [router]);

  useEffect(() => {

    if (typeof window !== 'undefined') {

      if (creatorData?.affiliate_code && referer !== null && !referer.includes("zesti.ngrok.app")) {
        
        window.promotekit_referral = creatorData.affiliate_code
        const affiliateCode = window.promotekit_referral;
        setCookie('affiliate_code', affiliateCode!, 30);

      }

    }

  }, [creatorData, referer]);

  if (!creatorData) return <PageLoader/>

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
      <CreatorPageRecentRecipes recipes={recipes} creatorName={creatorData?.display_name} owner_id={creatorData?.owner_id}/>
      <br/>
      <br/>
      {/* other creator data */}
    </main>
    </>
  );
};

export default CreatorPage