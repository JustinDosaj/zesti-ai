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
    <div className="grid mx-auto max-h-[250px] max-w-[300px] bg-gray-900">
      <ins
        className="adsbygoogle"
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
    </div>
  );
};

export default AdSenseDisplay;