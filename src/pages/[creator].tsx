import { Raleway } from 'next/font/google'
import { CreatorSearch, CreatorPageTitle, CreatorSocials, CreatorPageRecentRecipes } from '@/components/creator/page';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import useAffiliateCode from '@/hooks/useAffiliateCode';
import GoogleTags from '@/components/tags/conversion';
import { PromoteKitTag } from '@/components/tags/headertags';
import { getCreatorByDisplayName } from './api/firebase/functions';
import useCreatorRecipeList from '@/hooks/creator/useCreatorRecipeList';
import Breadcrumbs from '@/components/shared/breadcrumb';
import useSetBreadcrumbs from '@/components/shared/setBreadcrumbs';
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

  useSetBreadcrumbs();
  //useAffiliateCode(creatorData, referer);
  const { creatorRecipeList, loadingCreatorRecipes } = useCreatorRecipeList(creatorData?.owner_id)

  return (
    <>
    <Head>
      {/* Dynamic title tag set up to capitilize the first letter of display_name then add rest of display_name after */}
      <title className="capitalize">{`Zesti AI | ${creatorData?.display_name.charAt(0).toUpperCase() + creatorData?.display_name.slice(1)} from TikTok`}</title>
      <meta name="title" content={`Zesti AI | ${creatorData?.display_name.charAt(0).toUpperCase() + creatorData?.display_name.slice(1)} from TikTok`}/>
      <meta name="description" content={'Get written versions of recipes from ' + creatorData?.display_name + ' and start cooking now!'}/>
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background space-y-4 w-screen ${raleway.className}`}>
      <Breadcrumbs/>
      <CreatorPageTitle creatorData={creatorData}/>
      <CreatorSocials creatorData={creatorData}/>
      <CreatorSearch creatorData={creatorData}/>
      <CreatorPageRecentRecipes recipes={creatorRecipeList} creatorName={creatorData?.display_url} owner_id={creatorData?.owner_id}/>
      <br/>
      <br/>
      {/* other creator data */}
    </main>
    </>
  );
};

export default CreatorPage