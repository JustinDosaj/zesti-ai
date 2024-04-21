import { useState, useEffect, useRef } from "react";

declare let adsbygoogle: any;

interface AdSenseDisplayProps {
  adSlot: string;
  adFormat: string;
  widthRes: string;
  role: string | null;
  maxHeight?: string;
}

const AdSenseDisplay = ({ adSlot, adFormat, widthRes, role, maxHeight = "90px" }: AdSenseDisplayProps) => {
    
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
        className="adsbygoogle"
        style={{ display: "block", height: `${maxHeight}`}}
        data-ad-client="ca-pub-5837655994202747" // Replace with your publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={widthRes}
      ></ins>
  );
};

export default AdSenseDisplay;