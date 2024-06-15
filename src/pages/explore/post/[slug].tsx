import { getBlogPostBySlug } from "@/lib/contentfulHelpers"
import { GetServerSideProps } from "next"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from "next/head"
import Image from "next/image"
import { Container } from "@/components/shared/container"
import AdSenseDisplay from "@/components/tags/adsense"
import { useAuth } from "@/pages/api/auth/auth"
import { PostTitle } from "@/components/blog/post"
import formatDate from "@/utils/date-format"


export const getServerSideProps: GetServerSideProps = async (context) => {

  const { req, params, resolvedUrl } = context
  
  const { slug } = params as { slug: string }

  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const url = `${protocol}://${host}${resolvedUrl}`;
  
  const post = await getBlogPostBySlug(slug)

  return {
      props: { post, url }
  }
}

const Post: React.FC = ({post, url}: any) => { 
  
  const { stripeRole } = useAuth();

  const { author, category, publishDate, description, image, imageDescription, title, mainSection, seoTitle, seoDescription, ogTitle, ogDescription, logo } = post?.fields
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
      <main className={`flex min-h-screen flex-col items-center bg-background w-screen space-y-4 pb-48`}>
        <div className="mt-2 lg:mt-8 w-full"/>
        <Container className="grid justify-center lg:flex-row animate-fadeIn lg:min-w-[725px] max-w-[730px]">
          <PostTitle title={title} author={author} date={date} category={category}/>
          <AdSenseDisplay adSlot="7423668524" adFormat="horizontal" widthRes="false" role={stripeRole}/>
          <Image src={absoluteImageUrl} width={1600} height={900} alt={imageDescription} className="w-full object-scale-down max-h-[900px] max-w-[1600px] rounded-lg mb-4 mt-4" />
          <div className="prose-lg mt-6 text-gray-700 mb-2">{documentToReactComponents(description)}</div>
          <AdSenseDisplay adSlot="7423668524" adFormat="horizontal" widthRes="false" role={stripeRole}/>
          <div className="mt-6">
          <div className="w-full prose prose-lg text-gray-700">{documentToReactComponents(mainSection)}</div>
          <div className="my-6 w-full">
            <AdSenseDisplay adSlot="7480590418" adFormat="horizontal" widthRes="false" role={stripeRole}/>
          </div>
          </div>
        </Container>
      </main>
    </>
  )
}

export default Post