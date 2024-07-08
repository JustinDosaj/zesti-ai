interface TikTokProps {
    video_id: string;
  }
  
const TikTokComponent: React.FC<TikTokProps> = ({ video_id }) => {
    return (
        <div className="rounded-xl bg-orange-200 overflow-hidden mx-auto my-8 max-w-md w-full">
        <iframe
            className="w-full h-[619px]"
            src={`https://www.tiktok.com/embed/${video_id}`}
            allow="fullscreen"
            loading="lazy"
            scrolling="no"
        />
        </div>
    );
};
  
export default TikTokComponent;
  