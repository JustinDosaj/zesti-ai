import { useEffect, useRef } from "react";

declare let adsbygoogle: any;

const AdSenseDisplay = ({ adSlot, adFormat, widthRes, role }: any) => {
    const isClientSide = useRef(false);
    useEffect(() => {
      if (window && typeof window != 'undefined')
        isClientSide.current = true;
    }, [])
    useEffect(() => {
      if (isClientSide.current) {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.log(error)
        }
      }
    }, []);

  if (role == 'premium') return null;

  return (
    <div className="w-full mx-auto px-2 lg:px-0 bg-gray-500">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5837655994202747" // Replace with your publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={widthRes}
      ></ins>
    </div>
    
  );
};

export default AdSenseDisplay;