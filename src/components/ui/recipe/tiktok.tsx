interface TikTokProps {
    video_id: any,
}

const TikTokComponent = ({video_id}: TikTokProps) => {
    return(
        <div className="rounded-xl overflow-hidden alternate-orange-bg w-fit mx-auto h-full">
            <iframe
                className="w-full max-w-[325px] min-w-[325px] min-h-[775px]"
                src={`https://www.tiktok.com/embed/${video_id}`}
                allow="fullscreen"
                loading="lazy"
            />
        </div>
    )
}

export default TikTokComponent