interface InstagramProps {
    video_id: any,
}

const InstagramComponent = ({video_id}: InstagramProps) => {
    return(
        <div className="rounded-xl overflow-hidden alternate-orange-bg w-fit mx-auto border">
            <iframe
                className="w-full h-[515px]"
                src={`https://www.instagram.com/p/${video_id}/embed`}
                allow="fullscreen"
                loading="lazy"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
            />
        </div>
    )
}

export default InstagramComponent