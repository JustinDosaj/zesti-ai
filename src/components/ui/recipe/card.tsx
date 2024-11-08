import Link from "next/link"
import Image from "next/image"
import { Paragraph } from "@/components/shared/paragraph";
import { classNames } from "@/components/shared/classNames";

interface RecipeCardProps {
    item: {
        name: string,
        cover_image_url: string,
        video_title: string,
        ingredients: string[],
        instructions: string[],
        description: string,
        data: {
            id: string,
            slug: string,
            source: string,
            owner: {
                username: string,
            },
        }
    };
}

export function RecipeCard({ item }: RecipeCardProps) {

    const { id, slug, source } = item.data;

    let collection = 'recipes'

    if (source == 'ai') {
        collection = 'ai-recipes'
    }

    return (
        <div className="group relative flex bg-white rounded-2xl border shadow-sm hover:shadow-xl hover:border-gray-300 transition-shadow duration-300 overflow-hidden w-full h-[190px]">
            <Link href={{pathname: `/${collection}/${id}/${slug}`}} passHref={true}>
                <div className="flex h-full">
                    {/* Image Container */}
                    <div className={classNames(item.cover_image_url ? `relative` : `hidden`, `flex-none w-[110px] md:w-[125px]`)}>
                        <Image src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} 
                            className="rounded-l-2xl object-cover"
                            layout="fill"
                            alt={item.name}
                            priority={true} 
                        />
                    </div>
                    {/* Content Area */}
                    <div className="flex-grow p-4 flex flex-col justify-between overflow-clip gap-2 w-2/3">
                        <h3 className="text-lg font-semibold text-gray-800 overflow-hidden text-ellipsis line-clamp-2 w-full">{item.name}</h3>
                        <div className="flex flex-col flex-grow gap-4">
                            <Paragraph size="small" className="line-clamp-3">{item.description}</Paragraph>
                        </div>
                        <Paragraph size="xsmall" className="self-start truncate">by {item.data.owner.username}</Paragraph>
                    </div>
                </div>
            </Link>
            {/* Overlay Icon */}
        </div>
    );
}