
interface AccountPageComponents {
    title?: string,
    desc?: string,
}

export function AccountTitleComponent({title, desc}: AccountPageComponents) {
    return(
    <>
        <h2 className="font-semibold leading-7 text-gray-900 section-desc-text-size">{title}</h2>
        <p className=" text-sm leading-6 text-gray-500 lg:text-base">
            {desc}
        </p>
    </>
    )
}

interface ProfileProps {
    buttonName?: string,
    onButtonClick?: () => void,
    desc?: any,
    title?: string,
}

export function SimpleProfileComponent({onButtonClick, buttonName, title, desc}: ProfileProps) {
    
    return(
        <div className="pt-6 flex justify-between items-center border-gray-200">
            <dt className="font-semibold text-gray-900 sm:flex-none sm:pr-6 text-sm lg:text-base">{title}</dt>
            <dd className="mt-1 flex gap-x-6 sm:mt-0">
                <div className="text-gray-700 text-sm lg:text-base">{desc}</div>
            </dd>
            <dd className={`mt-1 flex gap-x-6 sm:mt-0 ${!buttonName ? `hidden` : ``}`}>
                <button type="button" className="font-semibold text-primary-main hover:text-primary-alt text-sm lg:text-base"
                    onClick={onButtonClick}>
                    {buttonName}
                </button>
            </dd>
        </div>
    )
}
