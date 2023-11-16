import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import Head from 'next/head';
import VideoComponent from '@/components/hub/video';

const raleway = Raleway({subsets: ['latin']})

export default function Video() {
  // Comment
  return (
    <>
      <Head>
        <title>Zesti AI | Cooking Video to Text Recipe Tool</title>
        <meta name="title" content="Zesti AI | Cooking Video to Text Recipe Tool"/>
        <meta name="description" content="Say good by to pausing and rewinding, Zesti AI Video to Text Recipe creates an easy-to-follow ingredient and instruction list"/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between bg-background ${raleway.className}`}>
        <Hero/>
        <VideoComponent/>
      </main>
    </>
  )
}
