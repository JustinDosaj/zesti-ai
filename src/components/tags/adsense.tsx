import { useState, useEffect, useRef } from "react";

declare let adsbygoogle: any;

interface AdProps {
  adSlot?: string,
  adFormat?: string,
  widthRes?: string,
  role?: string | null,
}

const AdSenseDisplay = ({ adSlot, adFormat, widthRes, role }: AdProps) => {
    
    const adRef = useRef(false);
    
    useEffect(() => {
      if (adRef.current) {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.log(error)
        }
      }
    }, []);

  if (role == 'premium') return null;

  return (
    <div className="grid justify-center">
      <ins
        className="adsbygoogle max-w-[336px] max-h-[280px] lg:max-w-[728px] lg:max-h-[90px] bg-gray-300"
        style={{
          display: "block",
      }}
        data-ad-client="ca-pub-5837655994202747" // Replace with your publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={widthRes}

      ></ins>
    </div>
  );
};

export default AdSenseDisplay;