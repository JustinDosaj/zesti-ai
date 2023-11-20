import { Container } from "../shared/container"
import { useEffect } from "react";

export function RecipePageAmazonProduct(){

    return(
        <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12 mt-12 mb-36"}>
        <div className="my-auto overflow-hidden bg-white py-5 border w-full rounded-lg p-4 md:p-12 ">
          <h2 className="text-sm font-medium text-gray-500 bg-gray-200 w-fit p-2 rounded-xl">Ad</h2>
          <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
            {/*recipe?.instructions?.map((instruct: any, index: any) => (
              <li key={index} className="col-span-1 flex rounded-md shadow-sm">
                <div className="flex rounded-md overflow-visible w-full">
                  <div className="bg-green-600 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md font-medium text-white" >
                    {index + 1}
                  </div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">

                  </div>
                </div>
              </li>
            ))*/}
          </ul>
        </div>
      </Container>
    )
}



const AdComponent = () => {
    console.log("Loading ad componenet...")
    useEffect(() => {
      // Load the AdSense script
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
  
      // Prepare the ad slot
      script.onload = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error(e);
        }
      };
    }, []);
  
    return (
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-5837655994202747"
           data-ad-slot="4074875757"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    );
  };
  
  export default AdComponent;