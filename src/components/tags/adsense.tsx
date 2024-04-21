import { useState, useEffect, useRef } from "react";

declare let adsbygoogle: any;

const AdSenseDisplay = ({ adSlot, adFormat, widthRes, role }: any) => {
    
  const isClientSide = useRef(false);
  const [ width, setWidth ] = useState<string>('');
  const [ height, setHeight ] = useState<string>('');
    
  useEffect(() => {
      if (window && typeof window != 'undefined')
        
        if (window?.innerWidth < 1224) { setWidth('300px'); setHeight('50px')}
        else { setWidth('728px'); setHeight('90px')}
      
        isClientSide.current = true;
    }, [isClientSide])
  
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
        className="adsbygoogle grid justify-center"
        style={
          { display: "block", width: width, height: height, margin: "auto"}
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