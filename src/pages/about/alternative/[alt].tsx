import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import React from 'react'
import Head from "next/head";
import { db } from "@/pages/api/firebase/firebase";
import { AltHero } from "@/components/alternatives/althero";
import { FAQ } from "@/components/home-sections/home";
import { AltCompare } from "@/components/alternatives/altCompare";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.alt as string
    const docSnapshot = await db.doc(`alternatives/${id}`).get();
    const data = docSnapshot.exists ? docSnapshot.data() : null;
    return {props: {data}}
}


const Alternative: React.FC = ({data}: any) => {

    return(
    <>
      <Head>
        <title>Zesti | The AI alternative to {data?.name}</title>
        <meta name="title" content={`Zesti | The AI alternative to ${data?.name}`}/>
        <meta name="description" content={`Find out what makes Zesti the best ${data?.name} alternative and learn about the unique things only Zesti can do`}/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
        <AltHero name={data?.name}/>
        <AltCompare 
          name={data?.name} 
          priceMonthly={data?.price}
          videoToRecipe={data?.videoToRecipe}
          urlToRecipe={data?.urlToRecipe}
          aiGeneratedRecipe={data?.recipeGenerator}
          chatAssistance={data?.chatAssist}
          />
        <FAQ/>
      </main>
    </>
    )
}

export default Alternative