import { Raleway } from 'next/font/google'
import { CreatorSearch, CreatorPageTitle, CreatorSocials, CreatorPageRecentRecipes } from '@/components/ui/creator/page';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { PromoteKitTag } from '@/components/tags/headertags';
import { useState } from 'react';
import { getCreatorByDisplayName } from '@/pages/api/firebase/functions';
import useCreatorRecipeList from '@/hooks/creator/useCreatorRecipeList';
import Breadcrumbs from '@/components/shared/breadcrumb';
import useSetBreadcrumbs from '@/components/shared/setBreadcrumbs';
import firebase from 'firebase/compat/app';
import { useAuth } from '@/pages/api/auth/auth';
import AdSenseDisplay from '@/components/tags/adsense';
import { ResponseModal } from '@/components/shared/modals';
import { useRouter } from 'next/router';
import { SparklesIcon } from '@heroicons/react/24/outline';

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
  const { creatorRecipeList, loadingCreatorRecipes } = useCreatorRecipeList(creatorData?.owner?.id)
  const { stripeRole, userData } = useAuth();
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  
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
    <main className={`flex min-h-screen flex-col items-center bg-background space-y-4 w-screen pb-48  ${raleway.className}`}>
      <Breadcrumbs/>
      <CreatorPageTitle creatorData={creatorData}/>
      <CreatorSocials setIsOpen={setIsOpen} creatorData={creatorData}/>
      <CreatorSearch creatorData={creatorData}/>
      <CreatorPageRecentRecipes recipes={creatorRecipeList} creatorName={creatorData?.owner?.affiliate_code} owner_id={creatorData?.owner?.id}/>
      <ResponseModal
        title={`Support ${creatorData?.display_name}`}
        text={`Continue to start a 7-day free trial for Zesti Premium. ${creatorData?.display_name} will receive a portion of the subscription fee automatically once your trial is complete.`}
        icon={SparklesIcon}
        iconColor={'orange'}
        modalFunction={() => window.open(`/about/pricing?via=${creatorData?.owner?.affiliate_code}`)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        displayAd={false}
        role={stripeRole}
        buttonName={"Start Free Trial"}
      />
      {stripeRole !== 'premium' && userData?.account_status !== 'creator' ?
      <div className="flex justify-center items-center pt-28 lg:pt-36">
        <div className="w-full min-w-[300px] max-w-[320px] lg:max-w-full lg:min-w-[1240px] text-center">
          <AdSenseDisplay adSlot="9326575118" adFormat="rectangle, horizontal" widthRes="true"/>
        </div>
      </div>
      :
      <div className="mb-28"/>
      }
      {/* other creator data */}
    </main>
    </>
  );
};

export default CreatorPage