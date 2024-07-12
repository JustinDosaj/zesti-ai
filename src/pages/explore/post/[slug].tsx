import { getBlogPostBySlug } from "@/lib/contentfulHelpers"
import { GetServerSideProps } from "next"
import AdSenseDisplay from "@/components/tags/adsense"
import { useAuth } from "@/pages/api/auth/auth"
import { PostTitle } from "@/components/blog/post"
import { renderContentBlock } from "@/pages/api/blog/render"
import { GetRecipeByIds } from "@/pages/api/firebase/functions"
import { RecipeCard } from "@/components/ui/recipe/card"
import formatDate from "@/utils/date-format"
import Head from "next/head"
import { HorizontalBorder } from "@/components/shared/border"
import { Container } from "@/components/shared/container"
import { RecipeSuggestions } from "@/components/ui/recipe/suggestions"

interface BlogPost {
  fields: {
    title: string;
    author: string;
    category: string;
    publishDate: string;
    shortDescription: string;
    image: any;
    seoTitle: string;
    seoDescription: string;
    ogTitle: string;
    ogDescription: string;
    logo: any;
    description: any;
    contentBlocks: any[];
    content: any;
    relatedRecipes?: string[]; // Make this optional
  };
  sys: any,
}

interface Recipe {
  id: string;
  name: string;
  cover_image_url: string;
  [key: string]: any; // Extend this interface based on the other fields you expect in your documents
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { req, params, resolvedUrl } = context
  
  const { slug } = params as { slug: string }

  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const url = `${protocol}://${host}${resolvedUrl}`;
  
  const post = await getBlogPostBySlug(slug)
  const relatedRecipeIds: string[] = Array.isArray(post?.fields.relatedRecipes) && post?.fields.relatedRecipes.every(item => typeof item === 'string')
    ? post?.fields.relatedRecipes as string[]
    : ['9dPr4zecWHggW81lZcfu', 'BIruI1eRcr5g4lZUVmZr', 'uSAW740E9cg3q6iI9hf7', 'Z5Gz54RTo978H81odNZf'];

  //['9dPr4zecWHggW81lZcfu', 'BIruI1eRcr5g4lZUVmZr', 'uSAW740E9cg3q6iI9hf7', 'Z5Gz54RTo978H81odNZf']

  const relatedRecipes = await GetRecipeByIds(relatedRecipeIds);

  return {
      props: { post, url, relatedRecipes }
  }
}

interface PostProps {
  post: BlogPost;
  url: string;
  relatedRecipes: Recipe[];
}

const Post: React.FC<PostProps> = ({post, url, relatedRecipes}: PostProps) => { 

  const { stripeRole } = useAuth();
  const { author, category, publishDate, shortDescription, image, title, seoTitle, seoDescription, ogTitle, ogDescription, logo, contentBlocks } = post?.fields
  const { updatedAt } = post?.sys

  const imageUrl = image.fields.file.url;
  const absoluteImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  
  const logoUrl = logo.fields.file.url;
  const absoluteLogoUrl = logoUrl.startsWith('//') ? `https:${logoUrl}` : logoUrl;

  const date = formatDate(publishDate);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": seoTitle,
    "description": seoDescription,
    "image": absoluteImageUrl,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://zesti.ai/about/author"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zesti AI",
      "logo": {
        "@type": "ImageObject",
        "url": absoluteLogoUrl
      }
    },
    "datePublished": publishDate,
    "dateModified": updatedAt,
    "articleSection": category,
  };

  return(
    <>
      <Head>
          <title>{seoTitle}</title>
          <meta name="title" content={seoTitle}/>
          <meta name="description" content={seoDescription}/>
          <meta property="og:title" content={ogTitle}/>
          <meta property="og:description" content={ogDescription}/>
          <meta property="og:image" content={absoluteImageUrl}/>
          <meta property="og:url" content={url}/>
          <meta property="twitter:image" content={absoluteImageUrl}/>
          <meta property="twitter:title" content={ogTitle}/>
          <meta property="twitter:description" content={seoDescription}/>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
      </Head>   
      <main className={`bg-background min-h-screen pb-28 px-6 sm:px-8 md:px-14 lg:px-5`}>
        <div className="max-w-7xl mx-auto flex justify-center">
          
          <div className="w-full lg:w-3/5 grid justify-center space-y-4 lg:mt-10 mt-8">
            <HorizontalBorder className="prose"/>
            <PostTitle title={title} author={author} date={date} description={shortDescription}/>
            <HorizontalBorder className="prose mt-4"/>
            <div className="mt-6 prose text-gray-700 space-y-4">
              {contentBlocks.map((block: any) => (
                <div key={block.sys.id}>{renderContentBlock(block, stripeRole)}</div>
              ))}
            </div>
          </div>

          {stripeRole !== 'premium' && (
            <div className="hidden lg:flex lg:flex-col l lg:space-y-6 lg:justify-between lg:ml-8 lg:w-1/4 lg:mt-10 mt-8">
              <AdSenseDisplay adSlot="6995148875" adFormat="vertical" widthRes={"false"} role={stripeRole} maxHeight="250px" />
              <AdSenseDisplay adSlot="2365955953" adFormat="vertical" widthRes={"false"} role={stripeRole} maxHeight="600px" />
              <AdSenseDisplay adSlot="5682067204" adFormat="vertical" widthRes={"false"} role={stripeRole} maxHeight="600px" />
            </div>
          )}

        </div>
        <RecipeSuggestions recipes={relatedRecipes}/>
      </main>
    </>
  )
}

export default Post