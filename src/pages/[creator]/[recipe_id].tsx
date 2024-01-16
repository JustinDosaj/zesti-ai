import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth";
import { useRouter } from 'next/router';
import { PageLoader } from "@/components/shared/loader";
import { db } from "@/pages/api/firebase/firebase";
import { PromoteKitTag } from "@/components/tags/headertags";
import { CreatorRecipe, EditCreatorRecipe } from "@/components/creator/recipe";
import React, {useEffect, useState} from 'react'
import { LoginModal } from "@/components/shared/modals";
import GoogleTags from "@/components/tags/conversion";
import Head from "next/head";
import { getCreatorByDisplayName } from "../api/firebase/functions";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const creatorName = context.query.creator as string
    const id = context.query?.recipe_id as string

    let owner_uid = '';

    const querySnapshot = await getCreatorByDisplayName(creatorName)
      if(!querySnapshot.empty) {
        owner_uid = querySnapshot.docs[0].id
      } else {
        return { notFound: true }
      }

    return {props: {id, owner_uid}}
}

const Recipe: React.FC = ({id, owner_uid}: any) => {

    const { user, isLoading } = useAuth();

    const [recipe, setRecipe] = useState<any>([])
    const [url, setUrl] = useState<string>('')
    const [ loginPrompt, setLoginPrompt ] = useState<boolean>(false)
    const [ isEditMode, setEditMode ] = useState<boolean>(false)
    const router = useRouter();


    useEffect(() => {

        const unsubscribe = db.doc(`creators/${owner_uid}/recipes/${id}`)
          .onSnapshot((docSnapshot) => {
            if (docSnapshot.exists) {
              setRecipe(docSnapshot.data());
              setUrl(docSnapshot.data()?.url ? docSnapshot.data()?.url : '')
            } else {
              console.log("Doc doesnt exist")
            }
          });
    
        return () => unsubscribe();
      
    }, [owner_uid, isLoading, id, router]);


    if(!recipe) return <PageLoader/>

    return(
    <>
    <Head>
      <title>{recipe.name}</title>
      <meta name="robots" content="noindex" />
      <link rel="preload" href="/images/zesti-logos/Zesti-Premium-2.png" as="image"></link>
      <GoogleTags/>
      <PromoteKitTag/>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-6 bg-background ${raleway.className}`}>
        {isEditMode == false || !user || user?.uid !== owner_uid ? 
        <CreatorRecipe recipe={recipe} url={url} setLoginPrompt={setLoginPrompt} owner_id={owner_uid} setEditMode={setEditMode}/>
        :
        <EditCreatorRecipe recipe={recipe} url={url} setLoginPrompt={setLoginPrompt} owner_id={owner_uid} setEditMode={setEditMode}/>
        }
        <LoginModal loginPrompt={loginPrompt} setLoginPrompt={setLoginPrompt} title={"Create Account"} message={"You must create an account to save recipes"}/>
    </main>
    </>
    )
}

export default Recipe