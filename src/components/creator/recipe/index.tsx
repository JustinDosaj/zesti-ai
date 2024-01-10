import { Container } from "@/components/shared/container"


interface CreatorRecipeProps {
    recipe: any,
    url?: string,
}

export function CreatorRecipeTitle({recipe, url}: CreatorRecipeProps) {
    
    console.log(recipe)

    return(
    <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 animate-fadeInFast alternate-orange-bg mt-36 rounded-3xl w-[600px]"}>
        <div className="inline-flex justify-center gap-4 p-3 items-center">
        <img src={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(recipe.cover_image_url)}?alt=media`} className="h-[136px] w-[96px] rounded-xl" alt={recipe.description}/>
            <div>
                <span className="section-desc-title-size">{recipe.name}</span>
                <p className="section-desc-text-size">{recipe.url_id}</p>
            </div>
        </div>
    </Container>
    )
}