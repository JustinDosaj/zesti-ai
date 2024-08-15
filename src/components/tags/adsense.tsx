// components/AdSense.tsx
import React, { useEffect } from 'react';
import { useRef } from 'react';

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
    const loadAds = () => {
      if (typeof window !== 'undefined' && isClientSide.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('Adsense error', e);
        }
      }
    };
    loadAds();
  }, []);
  
  if (role == 'premium') return null;

  return (
    <div className={` ${className}`} style={{ textAlign: 'center', ...adStyle }}>
      <ins
        className="bg-gray-300 adsbygoogle"
        style={{ display: 'block', ...adStyle }}
        data-ad-client="ca-pub-5837655994202747"  // Replace with your AdSense Publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
      />
    </div>
  );
};

export default AdSense;
