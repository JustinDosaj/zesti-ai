import { Raleway } from 'next/font/google'
import { Hero } from '@/components/home-sections/hero'
import { FAQ } from '@/components/home-sections/faq';
import { Optimize } from '@/components/home-sections/optimize'
import Head from 'next/head';
import { Reach } from '@/components/home-sections/reach';
import { useAuth } from './api/auth/auth';
import axios from 'axios'

const raleway = Raleway({subsets: ['latin']})

export default function Home() {

  const options = {
    method: 'GET',
    url: 'https://youtube-mp310.p.rapidapi.com/download/mp3',
    params: {
      url: 'https://www.youtube.com/shorts/a6BBaEXL4xg'
    },
    headers: {
      'X-RapidAPI-Key': '2fffa4118fmsh3a9b118e2f8b730p14358djsn079fd7f6a771',
      'X-RapidAPI-Host': 'youtube-mp310.p.rapidapi.com'
    }
  };


  const {user} = useAuth()

  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width" />
      <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      <meta name="description" content="AgenceX - SEO Agency website landing page made with ASTROJS and TAILWINDCSS"/>
      <title>Zesti - AI Cooking and Recipe Assistant</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
      <Hero/>
      <button onClick={async () => {axios.request(options).then((res)=>{console.log(res)})}}>CLICK ME</button>
      <Optimize/>
      <Reach/>
      <FAQ/>
    </main>
    </>
  )
}
