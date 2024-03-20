import Head from 'next/head';
import GoogleTags from '@/components/tags/conversion';
import { FAQ } from '@/components/ui/general';
import { PromoteKitTag } from '@/components/tags/headertags';
import { Raleway } from 'next/font/google'
import { Button } from '@/components/shared/button';

const raleway = Raleway({subsets: ['latin']})

export default function FAQPage() {
  
  return (
    <>
      <Head>
        <title>Zesti AI | FAQ | Basic Questions Answered</title>
        <meta name="title" content="Zesti AI | FAQ | Basic Questions Answered"/>
        <meta name="description" content="Get answers to the most common questions asked about Zesti AI"/>
        <GoogleTags/>
        <PromoteKitTag/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen space-y-48 pt-48 pb-48 ${raleway.className}`}>
        <FAQ type={'user'} title={"General FAQ"} desc={"Most common questions and answers among all of our users"}/>
        <FAQ type={'creator'} title={"Creator Program FAQ"} desc={"Questions and answers to the most common questions among our affiliates"}/>
        <div className="inline-flex items-center space-x-4">
          <span className="text-sm lg:text-base text-gray-700">More Questions?</span>
          <Button href="/about/contact" buttonType='button' isLink={true} text="Contact Us"/>
        </div>
      </main>
    </>
  )
}
