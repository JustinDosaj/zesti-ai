import { GetServerSideProps } from "next";
import { getEntriesForContentTypes } from "@/lib/contentfulHelpers";
import Head from 'next/head';
import { TitleSection } from "@/components/shared/title";
import { Container } from "@/components/shared/container";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async () => {

  const entries = await getEntriesForContentTypes(['authors'])
  const author = entries.authors[0]

  return {
    props: { author }
  }
}

const Author: React.FC = ({author}: any) => {
    
    const { description, name, image } = author
    const imageUrl = image?.fields.file.url;
    const absoluteImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;

    return (
        <>
        <Head>
            <title>Zesti AI FAQ | Basic Questions Answered</title>
            <meta name="title" content="Zesti AI | FAQ | Basic Questions Answered"/>
            <meta name="description" content="Get answers to the most common questions asked about Zesti AI"/>
        </Head>
        <main className={`flex min-h-screen flex-col items-center bg-background w-full pb-48`}>
            <div className="pt-2 lg:pt-8"/>
            <Container className="grid lg:flex-row animate-fadeIn lg:min-w-[725px] max-w-[730px]">
                <TitleSection titleBlack={name} desc={`Learn more about ${name}`}/>
                <Image src={absoluteImageUrl} width={1600} height={900} alt={`Image representing author: ${name}`} className="w-full object-scale-down max-h-[900px] max-w-[1600px] rounded-lg mb-4 mt-4" />
                <div className="prose-lg mt-6 text-gray-700 mb-2">{documentToReactComponents(description)}</div>
            </Container>
        </main>
        </>
    )
}

export default Author;
