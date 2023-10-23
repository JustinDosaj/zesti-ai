

export function Loader() {

    return(
    <div className=" bg-white px-6 py-3 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear border-primary-main hover:cursor-not-allowed">
        <div className="animate-spin flex justify-center w-5 h-5 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    )
}