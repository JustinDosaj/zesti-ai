import { Paragraph } from "../shared/paragraph";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

interface PostProps {
    title?: string;
    author?: string;
    description?: any;
    date?: string;
}

export const PostTitle = ({ title, author, date, description }: PostProps) => {
    
    return(
        <div className="relative flex flex-col text-left space-y-4">
            <div className="items-center inline-flex mt-2">
                <h1 className="text-4xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight font-semibold text-heading-1 text-gray-700 capitalize">
                    <span>{title}</span> 
                </h1>
            </div>
            <Paragraph className="mt-2 text-gray-600">
                {documentToReactComponents(description)}
            </Paragraph>
            <Paragraph className="text-gray-500 mt-2 mb-2 text-left text-sm">
                <span className="text-sm">By </span>
                <Link href="/about/author" className="underline hover:text-gray-600 text-sm">{author} Team</Link> 
                <span className="text-sm"> | Updated on {date} </span>
            </Paragraph>
        </div>
    )
}


