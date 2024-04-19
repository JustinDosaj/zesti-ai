import { GetServerSideProps } from "next";
import { Raleway } from 'next/font/google'
import { useAuth } from "@/pages/api/auth/auth";
import { PageLoader } from "@/components/shared/loader";
import { PublicRecipe } from "@/components/ui/recipe";
import React, { useState } from 'react'
import GoogleTags from "@/components/tags/conversion";
import Head from "next/head";
import Breadcrumbs from "@/components/shared/breadcrumb";
import useSetBreadcrumbs from "@/components/shared/setBreadcrumbs";
import { Chatbox } from "@/components/chat/chatbox";
import { ResponseModal } from "@/components/ui/modals/response";
import { BookmarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import AdSenseDisplay from "@/components/tags/adsense";
import useRecipe from "@/hooks/useRecipe";

const raleway = Raleway({subsets: ['latin']})

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const id = context.query?.recipe_id as string
    return {props: { id }}
}

const Recipe: React.FC = ({id}: any) => {

    useSetBreadcrumbs()
    const { stripeRole } = useAuth();
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const { recipe, isLoadingRecipe } = useRecipe(id)
    const router = useRouter()

    if(isLoadingRecipe) return <PageLoader/>

    return(
    <>
        <Head>
            <title>{`Zesti AI | ${recipe.name}`}</title>
            <meta name="title" content={`Zesti AI | ${recipe.name}`}/>
            <meta name="description" content={`Make ${recipe.name}. A recipe by ${recipe?.data?.owner?.username} from TikTok.`}/>
            <link rel="preload" href="/images/zesti-logos/Zesti-Premium-2.png" as="image"></link>
            <GoogleTags/>
        </Head>  
        <main className={`flex min-h-screen flex-col items-center p-6 bg-background w-screen pb-36 ${raleway.className}`}>
            <Breadcrumbs/>
            <PublicRecipe recipe={recipe} setIsOpen={setIsOpen}/>
            <Chatbox role={stripeRole} recipe={recipe}/>
            <ResponseModal
              title={`${recipe.name} Saved!`}
              text={`You can view the it by visiting your saved recipe page!`}
              icon={BookmarkIcon}
              iconColor={'orange'}
              modalFunction={() => router.push('/my-recipes')}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              displayAd={true}
              role={stripeRole}
              buttonName={"My Recipes"}
            />
            
            {stripeRole !== 'premium' ?
            <div className="flex justify-center items-center lg:pt-16">
                <div className="w-full min-w-[300px] max-w-[320px] lg:max-w-full lg:min-w-[1240px] text-center">
                  <AdSenseDisplay adSlot="9326575118" adFormat="rectangle, horizontal" widthRes="true"/>
                </div>
            </div>
            :
            <div className="mb-28"></div>
            }
        </main>
    </>
    )
}

export default Recipe