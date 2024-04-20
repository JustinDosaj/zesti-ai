import { EyeIcon, ClipboardDocumentIcon, QueueListIcon, Square3Stack3DIcon, BookOpenIcon } from "@heroicons/react/20/solid";
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
    key?: string;
}

/*export function RecipeCard({ item, key }: RecipeCardProps) {
    return (
        <div key={key} className="group relative w-[335px] lg:w-[400px] overflow-hidden bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
            
            Link href={`/recipe/${item?.data?.unique_id}`}>
                <div className="flex flex-col">
        
                    <div className="h-[200px] overflow-hidden">
                        <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} className="w-full h-full object-cover rounded-t-2xl" alt={item.name}/>
                    </div>
                 
                    <div className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{item.video_title}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Ingredients: {item.ingredients?.length}</span>
                            <span>Steps: {item.instructions?.length}</span>
                        </div>
                        <p className="text-xs text-gray-500">by {item.data?.owner?.username}</p>
                    </div>
                </div>
            </Link>

            <div className="absolute top-3 right-3 flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"/>
            </div>
        </div>
    );
}*/

export function RecipeCard({ item, key }: RecipeCardProps) {
    return (
        <div key={key} className="group relative flex bg-white rounded-2xl border shadow-sm hover:shadow-xl hover:border-gray-300 transition-shadow duration-300 overflow-hidden max-w-[375px]">
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