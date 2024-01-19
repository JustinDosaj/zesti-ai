import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import React, {useEffect, useState} from 'react'
import { useAuth } from "@/pages/api/auth/auth";
import { useRouter } from 'next/router';
import { PageLoader } from "@/components/shared/loader";
import Head from "next/head";
import { Chatbox } from "@/components/chat/chatbox";
import { db } from "@/pages/api/firebase/firebase";
import GoogleTags from "@/components/tags/conversion";
import AdSenseDisplay from "@/components/tags/adsense";
import { PromoteKitTag } from "@/components/tags/headertags";
import { UserRecipe, EditUserRecipe } from "@/components/recipe";
import { UpgradeToPremiumModal } from "@/components/shared/modals";
import Breadcrumbs from "@/components/shared/breadcrumb";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.recipe as string
    return {props: {id}}
}

const Recipe: React.FC = ({id}: any) => {

    const { user, isLoading, stripeRole } = useAuth();

    const [recipe, setRecipe] = useState<any>([])
    const [url, setUrl] = useState<string>('')
    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [ premiumPrompt, setPremiumPrompt ] = useState<boolean>(false)
    const router = useRouter();


    useEffect(() => {

      if (user == null && isLoading == false) {
        router.replace('/');
      } else if (user !== null && isLoading == false) {

        const unsubscribe = db.doc(`users/${user.uid}/recipes/${id}`)
          .onSnapshot((docSnapshot) => {
            if (docSnapshot.exists) {
              setRecipe(docSnapshot.data());
              setUrl(docSnapshot.data()?.url ? docSnapshot.data()?.url : '')
            } else {
              console.log("Missing Required Permissions")
              router.push('/')
            }
          });
    
        return () => unsubscribe();
      }

    }, [user, isLoading, id, router]);

    if(!recipe.name) return <PageLoader/>

    return(
    <>
    <Head>
      <title>{recipe.name}</title>
      <meta name="robots" content="noindex" />
      <link rel="preload" href="/images/zesti-logos/Zesti-Premium-2.png" as="image"></link>
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
      {stripeRole == 'premium' ? <Chatbox/> : <></>}
      <Breadcrumbs/>
      { isEditMode == false || !user ?
        <UserRecipe recipe={recipe} setPremiumPrompt={setPremiumPrompt} owner_id={''} setEditMode={setEditMode} role={stripeRole}/>
      :
        <EditUserRecipe recipe={recipe} url={url} setPremiumPrompt={setPremiumPrompt} setEditMode={setEditMode} role={stripeRole}/>
      }
      {stripeRole !== 'premium' ? 
      <div className="flex justify-center items-center py-12">
        <div className="w-full min-w-[300px] max-w-[320px] lg:max-w-full lg:min-w-[1240px] text-center">
          <AdSenseDisplay adSlot="9326575118" adFormat="rectangle, horizontal" widthRes="true"/>
        </div>
      </div>
      :
      <div className="mb-28"/>
      }
      <UpgradeToPremiumModal premiumPrompt={premiumPrompt} setPremiumPrompt={setPremiumPrompt}/>
    </main>
    </>
    )
}

export default Recipe