import { EyeIcon } from "@heroicons/react/20/solid"
import Link from "next/link"

interface RecipeCardProps {
    item: any,
    key?: any,
}

export function RecipeCard({item, key}: RecipeCardProps) {
    return(
        <div key={key} className="group relative w-[335px] lg:w-[400px]">
            {/* Image and Details */}
            <div className="flex items-center space-x-2 border rounded-2xl max-w-2xl">
                <div className="pl-3 pr-2 py-3">
                    <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(item.cover_image_url)}?alt=media`} className="h-[136px] w-[96px] rounded-xl object-cover" alt={item.title}/>
                </div>
                <div className="flex-grow space-y-1 lg:space-y-2">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-700">{item?.name}</h3>
                    {/* Additional Details */}
                    <div className="flex gap-4 text-xs lg:text-sm text-gray-600">
                        <span className="inline-flex gap-1 items-center">
                        <p className="font-bold">Ingredients:</p>
                        <p>{item.ingredients?.length}</p>
                        </span>
                        <span className="inline-flex gap-1 items-center">
                        <p className="font-bold">Steps:</p>
                        <p>{item.instructions?.length}</p>
                        </span>
                    </div>
                    <div className="flex gap-1 text-xs lg:text-sm text-gray-600 items-center">
                        <p className="text-sm text-gray-600 truncate w-52 lg:w-64">{item?.video_title}</p> {/* Recipe Name */}
                    </div>
                </div>
            </div>
            {/* Overlay Icon */}
            <Link href={`/recipe/${item?.data?.unique_id}`} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-3xl hover:animate-fadeInExtraFast">
                <EyeIcon className="text-white h-10 w-10 hover:text-gray-300 hover:bg-gray-500 bg-gray-700 rounded-xl p-1"/>
            </Link>
        </div>
    )
}