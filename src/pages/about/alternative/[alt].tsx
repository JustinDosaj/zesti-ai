import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import React, {useEffect, useState} from 'react'
import { Container } from "@/components/shared/container";
import Head from "next/head";
import { db } from "@/pages/api/firebase/firebase";
import { AltHero } from "@/components/alternatives/althero";
import { FAQ } from "@/components/home-sections/faq";
import { AltCompare } from "@/components/alternatives/altCompare";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.alt as string
    return {props: {id: id}}
}


const Alternative: React.FC = ({id}: any) => {

    const [altName, setAltName] = useState<string>('')
    const [altChat, setAltChat] = useState<boolean>(false)
    const [altGenerator, setAltGenerator] = useState<boolean>(false)
    const [altURLRecipe, setAltURLRecipe] = useState<boolean>(false)
    const [altVideoRecipe, setAltVideoRecipe] = useState<boolean>(false)
    const [altPrice, setAltPrice] = useState<string>('$0')

    useEffect(() => {
      const unsubscribe = db.doc(`alternatives/${id}`)
        .onSnapshot((docSnapshot) => {
          if (docSnapshot.exists) {
            const data = docSnapshot.data()
            setAltName(data?.name)
            setAltChat(data?.chatAssist)
            setAltGenerator(data?.recipeGenerator)
            setAltURLRecipe(data?.urlToRecipe)
            setAltVideoRecipe(data?.videoToRecipe)
            setAltPrice(data?.price)
          } else {
            console.log("Doc doesnt exist")
          }
        });
        return () => unsubscribe(); 
    }, [id]);


    return(
    <>
      <Head>
        <title>Zesti | The AI alternative to {altName}</title>
        <meta name="title" content={`Zesti | The AI alternative to ${altName}`}/>
        <meta name="description" content={`Find out what makes Zesti the best ${altName} alternative and learn about the unique things only Zesti can do`}/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
        <AltHero name={altName}/>
        <AltCompare 
          name={altName} 
          priceMonthly={altPrice}
          videoToRecipe={altVideoRecipe}
          urlToRecipe={altURLRecipe}
          aiGeneratedRecipe={altGenerator}
          chatAssistance={altChat}
          />
        <FAQ/>
      </main>
    </>
    )
}

export default Alternative