import { Container } from '@/components/shared/container'
import { CTA } from '@/components/ui/general/cta'
import { ToolBoxFeature } from '@/components/ui/general/tools'
import Head from 'next/head'

export default function Tools() {

  return (
    <>
    <Head>
      <title>Zesti AI | Tools & More</title>
      <meta name="title" content="Zesti AI | Pricing - Try for Free"/>
      <meta name="description" content="Discover already transcribed TikTok recipes so you can spend less time writing and more time cooking!"/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background w-full pb-28 space-y-28`}>
        <ToolBoxFeature/>
        <CTA/>
    </main>
    </>
  )
}