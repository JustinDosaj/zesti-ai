import { useEffect, useRef } from "react";

declare let adsbygoogle: any;

const AdSense = ({ adSlot }: any) => {
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

  console.log("In adsense components")

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5837655994202747" // Replace with your publisher ID
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;