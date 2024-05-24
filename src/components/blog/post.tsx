import { Paragraph } from "../shared/paragraph";
import { Container } from "../shared/container";

interface PostProps {
    title?: string;
    description?: string;
    author?: string;
    date?: string;
    category?: string;
}

export const PostTitle = ({ title, description, author, date, category }: PostProps) => {
    
    return(
    <Container className={`flex flex-col lg:flex-row gap-10 lg:gap-12`}>
        <div className="relative flex flex-col items-center text-center lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
            <div className="items-center inline-flex mt-2">
                <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight font-semibold text-heading-1 text-gray-700 capitalize">
                    <span>{title}</span> 
                </h1>
            </div>
            <Paragraph className="mt-2 text-gray-600">
                    {description || ''}
            </Paragraph>
            <Paragraph className="text-gray-500 mb-4 text-center">{author} - {date}</Paragraph>
            <span className="faded-bg text-gray-700 px-3 py-1 rounded-full mb-8 inline-block w-fit">{category}</span>
        </div>
    </Container>
    )
}


