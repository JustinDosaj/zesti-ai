import { Raleway } from 'next/font/google'
import Head from 'next/head'

const raleway = Raleway({subsets: ['latin']})

export function Loader() {

    return(
    <div className="grid justify-center bg-white px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear border-primary-main hover:cursor-not-allowed">
        <div className="animate-spin flex justify-center w-5 h-5 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    )
}

export function CreatorSubmitLoader() {

    return(
    <div className="grid justify-center bg-white px-2 py-2 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear border-primary-main hover:cursor-not-allowed">
        <div className="animate-spin flex justify-center w-5 h-5 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    )
}

export function PageLoader() {
    return(
    <>
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
        <div className="grid justify-center bg-white px-6 py-3 outline-none relative overflow-hidden duration-300 ease-linear my-auto">
            <div className="animate-spin flex justify-center w-12 h-12 border-[5px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </main>
    </>
    )
}

export function ToolLoader() {
    return(
    <>
    <Head>
      <title>Zesti | Loading...</title>
    </Head>  
    <main className={`flex min-h-screen flex-col items-center justify-between p-2 bg-background ${raleway.className}`}>
        <div className="grid justify-center bg-white px-6 py-3 outline-none relative overflow-hidden duration-300 ease-linear">
            <div className="animate-spin flex justify-center w-10 h-10 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </main>
    </>
    )
}

export function RecipeListLoader() {
    return(
        <main className={`flex min-h-screen flex-col items-center justify-between p-12 bg-background ${raleway.className} my-auto`}>
            <div className="grid justify-center bg-white px-6 py-3 outline-none relative overflow-hidden duration-300 ease-linear">
                <div className="animate-spin flex justify-center w-10 h-10 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </main>
    )
}