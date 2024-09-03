// components/AdSense.tsx
import React, { useEffect } from 'react';
import { useRef } from 'react';

declare let adsbygoogle: any;

interface AdSenseProps {
  adSlot: string;
  adFormat: string;
  adStyle?: React.CSSProperties;
  className?: string;
  role?: string | null;
}

const AdSense: React.FC<AdSenseProps> = ({ adSlot, adFormat, className, adStyle = {}, role }) => {

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

      }
    }
  }, []);
  
  if (role == 'premium') return null;

  return (
    <div className={`${className} bg-gray-300 mx-auto`} style={{ textAlign: 'center', ...adStyle }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...adStyle }}
        data-ad-client="ca-pub-5837655994202747"  // Replace with your AdSense Publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="false"
      />
    </div>
  );
};

export default AdSense;
