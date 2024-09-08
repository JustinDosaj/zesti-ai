import { GetServerSideProps } from "next";
import { getEntriesForContentTypes } from "@/lib/contentfulHelpers";
import Head from 'next/head';
import dynamic from "next/dynamic";

const FAQ = dynamic(() => import('@/components/ui/general/faq').then((mod) => mod.FAQ), { ssr: false })

export const getServerSideProps: GetServerSideProps = async () => {

  const entries = await getEntriesForContentTypes(['faq'])
  const faqContent = entries.faq[0]

  return {
    props: { faqContent }
  }
}

export default function FAQPage({faqContent}: any) {

  return (
    <>
      <Head>
        <title>Zesti AI FAQ | Basic Questions Answered</title>
        <meta name="title" content="Zesti AI | FAQ | Basic Questions Answered"/>
        <meta name="description" content="Get answers to the most common questions asked about Zesti AI"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background w-full pb-48`}>
        <div className="pt-8"/>
        <FAQ qA={faqContent.qA.fields.user} title="FAQ" desc="Answers to the most common questions we get" type="user"/>
      </main>
    </>
  )
}
