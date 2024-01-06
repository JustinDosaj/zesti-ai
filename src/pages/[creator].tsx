import { Raleway } from 'next/font/google'
import { CreatorSearch, CreatorRecipeTitle, CreatorPageTitle, CreatorInformation } from '@/components/creator/profile';
import { useAuth } from "@/pages/api/auth/auth"
import { GetServerSideProps, NextPage } from 'next';
import { useEffect } from "react";
import { PageLoader } from "@/components/shared/loader";
import Head from 'next/head';
import { db } from './api/firebase/firebase';
import GoogleTags from '@/components/tags/conversion';
import { PromoteKitTag } from '@/components/tags/headertags';
import { setCookie } from '@/pages/api/handler/cookies';
import firebase from 'firebase/compat/app';

const raleway = Raleway({subsets: ['latin']})


interface CreatorProps {
  creatorData: firebase.firestore.DocumentData | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { creator } = context.params as { creator: string };
  console.log("DM", creator)
  let creatorData = null;

  try {
    const querySnapshot = await db.collection('creators').where('display_name', '==', creator).get();
    console.log("Query Snapshot:", querySnapshot);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      creatorData = { userId: doc.id, ...doc.data() };
      console.log("Creator Data:", creatorData);
    }
  } catch (error) {
    console.error('Error fetching creator:', error);
  }

  return {
    props: {
      creatorData,
    },
  };
};

const CreatorPage: NextPage<CreatorProps> = ({ creatorData }) => {

  const { user, isLoading } = useAuth()

  useEffect(() => {
    
    const affiliateCode = window.promotekit_referral;

    if (affiliateCode) {
      setCookie('affiliate_code', affiliateCode, 30);
    }
  }, []);

  if (isLoading) return <PageLoader/>

  if (!creatorData) {
    return <div>No creator found</div>;
  }

  // Render your creator data here
  return (
    <>
    <Head>
      <title>Zesti | Creator Page</title> {/* Add Dynamic Title to display creator username for improved SEO*/}
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
      <CreatorPageTitle creatorData={creatorData}/>
      <CreatorSearch/>
      {/* other creator data */}
    </main>
    </>
  );
};

export default CreatorPage