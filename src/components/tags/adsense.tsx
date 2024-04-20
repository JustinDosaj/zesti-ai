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
    const [adSize, setAdSize] = useState({ width: '728px', height: '90px' });
    
    useEffect(() => {
      if (window && typeof window != 'undefined') { adRef.current = true }
       
      const handleResize = () => {
          if (window.innerWidth < 860) {
              setAdSize({ width: '336px', height: '280px' });
          } else {
              setAdSize({ width: '728px', height: '90px' });
          }
      };

      handleResize(); // Set on initial render

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);

    }, [])
    
    useEffect(() => {
      if (adRef.current) {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.log(error)
        }
      }
    }, [adRef, adSize]);

  if (role == 'premium') return null;

  return (
    <div className="grid justify-center">
      <ins
        className="adsbygoogle "
        style={{
            display: "block",
            width: adSize.width,
            height: adSize.height,
        }}
        data-ad-client="ca-pub-5837655994202747" // Replace with your publisher ID
        data-ad-slot={adSlot}
      ></ins>
    </div>
  );
};

export default AdSenseDisplay;