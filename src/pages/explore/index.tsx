import { getEntriesForContentTypes } from "@/lib/contentfulHelpers";
import { GetServerSideProps } from "next";
import { Container } from "@/components/shared/container";
import { Paragraph } from "@/components/shared/paragraph";
import { Title } from "@/components/shared/title";
import { BlogList } from "@/components/blog/list";
import Head from "next/head"

export const getServerSideProps: GetServerSideProps = async () => {

    const entries = await getEntriesForContentTypes(['blogPost'])
    const blogContent = entries.blogPost

    return {
        props: { blogContent }
    }
}
  
  
const Explore: React.FC = ({blogContent}: any) => {

    return (
        <>
        <Head>
            <title>{"News, Educational Articles & More - Zesti AI"}</title>
            <meta name="title" content={"News, Educational Articles & More - Zesti AI"}/>
            <meta name="description" content={"Discover news, educational articles and more on Zesti"}/>
            <meta property="og:title" content={"News, Educational Articles & More - Zesti AI"}/>
            <meta property="og:description" content={"Discover news, educational articles and more on Zesti"}/>
            <meta property="twitter:title" content={"News, Educational Articles & More - Zesti AI"}/>
            <meta property="twitter:description" content={"Discover news, educational articles and more on Zesti"}/>
        </Head>   
            <main className={`flex min-h-screen flex-col items-center bg-background w-full space-y-4 pb-48`}>
                <div className="mt-2 lg:mt-8"/>
                <Container>
                    <Title className="text-center">Explore Blog</Title>
                    <Paragraph className="mt-2 text-center">Check out these articles written by members of Zesti</Paragraph>
                </Container>
                <BlogList blogContent={blogContent}/>
            </main>
        </>
    )
}


export default Explore
  