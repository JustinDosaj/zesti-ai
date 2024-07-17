import { useEffect, useRef } from "react";

declare let adsbygoogle: any;

interface AdSenseDisplayProps {
  adSlot: string;
  adFormat: string;
  widthRes: string;
  role: any;
  maxHeight?: string;
  maxWidth?: string;
  className?: string;
}

const AdSenseDisplay = ({ adSlot, adFormat, widthRes, role, maxHeight = "90px", maxWidth="100%", className }: AdSenseDisplayProps) => {
    
  const isClientSide = useRef(null);
    
  useEffect(() => {
    if (typeof window !== 'undefined' && isClientSide.current) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense Error:', error);
      }
    }
  }, []);

  if (role == 'premium') return null;

  return (
      <ins
        className={`adsbygoogle max-w-[${maxWidth}] ${className}`}
        style={{ display: "block", height: maxHeight, width: "100%" }}
        data-ad-client="ca-pub-5837655994202747" // Replace with your publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={widthRes}
        ref={isClientSide}
      ></ins>
  );
};

export default AdSenseDisplay;