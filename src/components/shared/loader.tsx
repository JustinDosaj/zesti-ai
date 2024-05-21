import React from "react"
import { classNames } from "./classNames"

interface LoaderProps {
    className?: string,
    type?: 'recipe-list' | 'page' | 'button',
    color?: 'white' | 'primary',
}

export function Loader() {

    return(
    <div className="grid justify-center bg-white px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear border-primary-main hover:cursor-not-allowed">
        <div className="animate-spin flex justify-center w-5 h-5 border-[3px] border-current border-t-transparent text-primary-main rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    )
}

export function PageLoader({type}: LoaderProps) {
    return(
        <main className={`flex min-h-screen flex-col items-center justify-between pt-14 bg-background`}>
            <div className={classNames(type == 'recipe-list' ? `` : `my-auto`, 'grid justify-center bg-white px-6 py-3 outline-none relative overflow-hidden duration-300 ease-linear')}>
                <div className="animate-spin flex justify-center w-10 h-10 border-[4px] border-current border-t-transparent text-primary-main rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </main>
    )
}

export function ButtonLoader() {
    return(
        <div className="grid justify-center rounded-full outline-none relative overflow-hidden duration-300 ease-linear hover:cursor-not-allowed">
            <div className="animate-spin flex justify-center w-5 h-5 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export function ProcessingLoader() {
    return(
        <div className="grid justify-center rounded-full outline-none relative overflow-hidden duration-300 ease-linear hover:cursor-not-allowed">
            <div className="animate-spin flex justify-center w-3.5 h-3.5 border-[2px] border-current border-t-transparent text-primary-main rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}