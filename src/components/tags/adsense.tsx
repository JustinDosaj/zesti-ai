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
      <ins
        className="adsbygoogle max-w-[336px] max-h-[280px] lg:max-w-[728px] lg:max-h-[90px]"
        style={
          { display: "block" }
          //{ display: "block", width: "728px", height: "90px", backgroundColor: "gray"}
          //{ display: "block", width: "336px", height: "280px", backgroundColor: "gray"}
        }
        data-ad-client="ca-pub-5837655994202747" // Replace with your publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={widthRes}
      ></ins>
  );
};

export default AdSenseDisplay;