import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { CookBookFeature, HomeVideoToRecipe } from '@/components/ui/features/users';
import { CreatorCTA } from '@/components/ui/features/creators';
import { SharedHero, ThreeBoxFeature, FAQ } from '@/components/ui/general';
import { useAuth } from '@/pages/api/auth/auth';
import { PageLoader } from '@/components/shared/loader';
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'
import { useRouter } from 'next/router';

const raleway = Raleway({subsets: ['latin']})

export default function AboutCreatorPage() {
  
  const { isLoading, user } = useAuth();
  const router = useRouter()

  if (isLoading) return <PageLoader/>

  return (
    <>
      <Head>
        <title>Join Zesti | Showcase Your TikTok Recipes & Earn</title>
        <meta name="title" content="Join Zesti | Showcase Your TikTok Recipes & Earn"/>
        <meta name="description" content="Instantly transform your videos into easy-to-read recipes & keep them in one place for your followers to enjoy!"/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`main-seo-page-class ${raleway.className}`}>
        <SharedHero 
          titleStart={"Put Your Recipes on"} 
          titleEnd={"Display"} 
          description={"Join our creator program to put your recipes on display and start earning commission"}
          buttonName={user ? 'Apply to Join' : 'Login to Apply'}
          button={() => {user ? router.push('/account') : router.push('/auth/login')}}
          imageSrc={"/images/Zesti-Creator-Hero-Image.png"}
          />
        <CreatorCTA title={"Creator Program Benefits"} isHome={false}/>
        <ThreeBoxFeature type={"apply"} titleStart='Get Started with' titleEnd='Zesti' desc={"Using Zesti as a creator is easy, simple apply then start posting once approved!"}/>
        <HomeVideoToRecipe titleStart={"Transcribe Cooking Videos to"} titleEnd={"Recipes"} desc={"Instantly generate a step-by-step recipe for your followers using Zesti AI"}/>
        <CookBookFeature titleStart={"All Your Recipes"} titleEnd={"In One Place"} desc={"Let your followers explore your entire recipe collection from a single link"}/>
        <FAQ type={'creator'} title={"Creator Program FAQ"} desc={"Questions and answers to the most common questions among our affiliates"}/>
      </main>
    </>
  )
}
