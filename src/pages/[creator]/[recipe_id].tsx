import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth";
import { useRouter } from 'next/router';
import { PageLoader } from "@/components/shared/loader";
import { db } from "@/pages/api/firebase/firebase";
import { PromoteKitTag } from "@/components/tags/headertags";
import { CreatorRecipeTitle } from "@/components/creator/recipe";
import React, {useEffect, useState} from 'react'
import GoogleTags from "@/components/tags/conversion";
import Head from "next/head";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const creatorName = context.query.creator as string
    const id = context.query?.recipe_id as string

    let owner_uid = '';

    const querySnapshot = await db.collection('creators').where('display_name', '==', creatorName).get()
    if(!querySnapshot.empty) {
      owner_uid = querySnapshot.docs[0].id
    } else {
      return { notFound: true }
    }


    return {props: {id, owner_uid}}
}

const Recipe: React.FC = ({id, owner_uid}: any) => {

    const { user, isLoading, stripeRole } = useAuth();

    const [recipe, setRecipe] = useState<any>([])
    const [url, setUrl] = useState<string>('')
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
    <main className={`flex min-h-screen flex-col items-center justify-between p-6 bg-background ${raleway.className}`}>
          <CreatorRecipeTitle recipe={recipe} url={url}/>
    </main>
    </>
    )
}

export default Recipe