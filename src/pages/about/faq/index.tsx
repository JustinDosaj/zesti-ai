import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { FAQ, SharedHero } from '@/components/ui/general';
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'
import { Button } from '@/components/shared/button';
import { useRouter } from 'next/router';

const raleway = Raleway({subsets: ['latin']})

export default function FAQPage() {

  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Zesti AI | FAQ | Basic Questions Answered</title>
        <meta name="title" content="Zesti AI | FAQ | Basic Questions Answered"/>
        <meta name="description" content="Get answers to the most common questions asked about Zesti AI"/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen space-y-48 pb-48 ${raleway.className}`}>
        <SharedHero titleStart={"Zesti"} titleEnd={"FAQ"} description={"Here you can find answers to questions we often get. If you cannot find what you\n're looking for you can contact us."} button={() => router.push('/about/contact')} buttonName={"Contact Us"}/>
        <FAQ type={'user'} title={"General FAQ"} desc={"Most common questions and answers among all of our users"}/>
        <FAQ type={'creator'} title={"Creator Program FAQ"} desc={"Questions and answers to the most common questions among our affiliates"}/>
      </main>
    </>
  )
}