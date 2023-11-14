import { Raleway } from 'next/font/google'
import { AddRecipePageTitle } from '@/components/dash-sections/dash';
import Head from 'next/head';
import Hub from '@/components/hub/hub';

const raleway = Raleway({subsets: ['latin']})

export default function AddRecipe() {

  return (
    <>
      <Head>
        <title>Zesti AI | AI Cooking Assistant | Chat, Save & Edit</title>
        <meta name="description" content="Easily save & edit recipes found from cooking videos and chat with our AI tool powered by OpenAI and ChatGPT. Try for free. No credit card required."/>
      </Head>
      <main className={`flex min-h-screen flex-col items-center bg-background ${raleway.className}`}>
        <AddRecipePageTitle/>
        <Hub className="mt-4 mb-16"/>
      </main>
    </>
  )
}
