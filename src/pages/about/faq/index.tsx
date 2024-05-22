import Head from 'next/head';
import { FAQ } from '@/components/ui/general';

export default function FAQPage() {

  return (
    <>
      <Head>
        <title>Zesti AI FAQ | Basic Questions Answered</title>
        <meta name="title" content="Zesti AI | FAQ | Basic Questions Answered"/>
        <meta name="description" content="Get answers to the most common questions asked about Zesti AI"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-screen pb-48`}>
        <div className="pt-2 lg:pt-8"/>
        <FAQ type={'user'} title={"FAQ"} desc={"Most common questions and answers among all of our users"}/>
      </main>
    </>
  )
}
