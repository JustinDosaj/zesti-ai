// Currently removed from every page
// Plan on reintegrating in the future

export function PromoteKitTag(){
    return(
        <script async src="https://cdn.promotekit.com/promotekit.js" data-promotekit="8fee0c20-1351-4c3c-b2dc-d51f88aee32f"></script>
    )
}

export function GoogleRecipeTag(recipe: any) {

    const { date_created } = recipe?.data
    const datePublished = new Date(date_created).toLocaleDateString()
    /**
     * Currently Removed:
     * keywords, prep time, cook time, total time, recipe yield, recipe steps ( has @type & description )
     */

    const jsonLd = {
        "@context": "http://schema.org",
        "@type": "Recipe",
        "name": recipe?.title,
        "author": {
          "@type": "person",
          "name": recipe?.owner?.nickname
        },
        "datePublished": datePublished,
        "description": recipe?.description,
        "image": [
          `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(recipe?.cover_image_url)}?alt=media`
        ]
    };

    return(
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
    )
}