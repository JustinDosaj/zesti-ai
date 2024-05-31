import { getEntriesForContentTypes } from "@/lib/contentfulHelpers";
import { GetServerSideProps } from "next";
import { TitleSection } from "@/components/shared/title"
import { BlogList } from "@/components/blog/list";

export const getServerSideProps: GetServerSideProps = async () => {

    const entries = await getEntriesForContentTypes(['blogPost'])
    const blogContent = entries.blogPost

    return {
        props: { blogContent }
    }
}
  
  
const Explore: React.FC = ({blogContent}: any) => {

    return (
        <main className={`flex min-h-screen flex-col items-center bg-background w-screen space-y-4 pb-48`}>
            <div className="mt-2 lg:mt-8"/>
            <TitleSection titleBlack="Explore Blog" desc="Check out these articles written by members of Zesti"/>
            <BlogList blogContent={blogContent}/>
        </main>
    )
}


export default Explore
  