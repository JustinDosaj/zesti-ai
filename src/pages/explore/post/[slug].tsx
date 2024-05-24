import { getBlogPostById } from "@/lib/contentfulHelpers"
import { GetServerSideProps } from "next"
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import Head from "next/head"
import Image from "next/image"
import { Container } from "@/components/shared/container"
import AdSenseDisplay from "@/components/tags/adsense"
import { useAuth } from "@/pages/api/auth/auth"
import { PostTitle } from "@/components/blog/post"


export const getServerSideProps: GetServerSideProps = async (context) => {

  const { req, params, resolvedUrl } = context
  
  const { slug } = params as { slug: string }

  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const url = `${protocol}://${host}${resolvedUrl}`;
  
  const post = await getBlogPostById(slug)

  return {
      props: { post, url }
  }
}

const Post: React.FC = ({post, url}: any) => { 
  
  const { stripeRole } = useAuth();

  const { author, category, date, description, image, imageDescription, sgeTitle, sgeDescription, title, mainSection, seoTitle, seoDescription, ogTitle, ogDescription, ogImage  } = post?.fields

  const imageUrl = image.fields.file.url;
  const absoluteImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;

  const ogImageUrl = ogImage?.fields.file.url || '';
  const absoluteOgImageUrl = ogImageUrl.startsWith('//') ? `https:${ogImageUrl}` : ogImageUrl;

  console.log(post)

  return(
    <>
      <Head>
          <title>{seoTitle}</title>
          <meta name="title" content={seoTitle}/>
          <meta name="description" content={seoDescription}/>
          <meta property="og:title" content={ogTitle}/>
          <meta property="og:description" content={ogDescription}/>
          <meta property="og:image" content={absoluteOgImageUrl}/>
          <meta property="og:url" content={url}/>
          <meta property="twitter:image" content={absoluteImageUrl}/>
          <meta property="twitter:title" content={ogTitle}/>
          <meta property="twitter:description" content={seoDescription}/>
      </Head>   
      <main className={`flex min-h-screen flex-col items-center bg-background w-screen space-y-4 pb-48`}>
        <div className="mt-2 lg:mt-8 w-full"/>
        <Container className="grid justify-center lg:flex-row animate-fadeIn lg:min-w-[725px] max-w-[730px]">
          <PostTitle title={title} description={description} author={author} date={date} category={category}/>
          <AdSenseDisplay adSlot="7423668524" adFormat="horizontal" widthRes="false" role={stripeRole}/>
          <Image src={absoluteImageUrl} width={1600} height={900} alt={imageDescription} className="w-full object-scale-down max-h-[900px] max-w-[1600px] rounded-lg mb-4 mt-8" />
          <div className="prose-lg mt-6">{documentToReactComponents(sgeTitle)}</div>
          <div className="prose-lg mb-6">{documentToReactComponents(sgeDescription)}</div>
          <AdSenseDisplay adSlot="7423668524" adFormat="horizontal" widthRes="false" role={stripeRole}/>
          <div className="mt-6">
          <div className="w-full prose-lg">{documentToReactComponents(mainSection)}</div>
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