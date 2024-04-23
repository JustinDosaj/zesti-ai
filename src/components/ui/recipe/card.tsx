import Link from "next/link"

interface RecipeCardProps {
    item: {
        name: string,
        cover_image_url: string,
        video_title: string,
        ingredients: string[],
        instructions: string[],
        description: string,
        data: {
            unique_id: string,
            owner: {
                username: string,
            },
        }
    };
}

export function RecipeCard({ item }: RecipeCardProps) {
    return (
        <div className="group relative flex bg-white rounded-2xl border shadow-sm hover:shadow-xl hover:border-gray-300 transition-shadow duration-300 overflow-hidden max-w-[375px]">
            <Link href={`/recipe/${item.data.unique_id}`}>
                <div className="flex">
                    {/* Image Container */}
                    <div className="relative flex-none w-1/3">
                        <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} className="h-full w-full object-cover rounded-l-2xl" alt={item.name} />
                        {/* Overlay Icon for ingredients and steps */}
                    </div>
                    {/* Content Area */}
                    <div className="flex-grow p-4 flex flex-col justify-between overflow-clip gap-2">
                        <h3 className="text-lg font-semibold text-gray-700 overflow-hidden text-ellipsis line-clamp-2 w-full">{item.name}</h3>
                        <div className="flex flex-col flex-grow gap-4">
                            <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-3 self-start truncate">by {item.data.owner.username}</p>
                    </div>
                </div>
            </Link>
            {/* Overlay Icon */}
        </div>
    );
}