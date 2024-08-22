import { PricingDisplay } from '@/components/ui/general/pricing'
import { Container } from '@/components/shared/container'
import { Paragraph } from '@/components/shared/paragraph'
import { Title } from '@/components/shared/title'
import Head from 'next/head'

export default function Pricing() {

  return (
    <>
    <Head>
      <title>Zesti AI | Pricing - Try for Free</title>
      <meta name="title" content="Zesti AI | Pricing - Try for Free"/>
      <meta name="description" content="Discover already transcribed TikTok recipes so you can spend less time writing and more time cooking!"/>
    </Head>
    <main className={`flex min-h-screen flex-col items-center bg-background w-full pb-28`}>
      <div className="mt-2 lg:mt-10"/>
      <Container className={"flex flex-col mx-auto bg-white"}>
        <Title className="text-center">Pricing Plans</Title>
        <Paragraph className="mt-2 text-center">Join hundreds of users creating their favorite home cooked meals!</Paragraph>
        <p className="mx-auto sm:mb-8 mt-4 sm:mt-6 max-w-xl w-fit pr-3 pl-3 text-center leading-8 border border-primary-main rounded-3xl text-gray-600">
        Try for Free. Cancel anytime.
        </p>
        <PricingDisplay/>
      </Container>
    </main>
    </>
  )
}