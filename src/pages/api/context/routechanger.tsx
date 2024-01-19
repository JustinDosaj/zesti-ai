
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useNavigation } from './navigation';

const RouteChangeHandler = () => {
    const router = useRouter();
    const { addPageToHistory } = useNavigation();
  
    useEffect(() => {
      
        const handleRouteChange = (url: string) => {
          addPageToHistory(url);
        };
    
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange);
        };

    }, [router.events, addPageToHistory]);
  
    return null; // This component doesn't render anything
  };
  
  export default RouteChangeHandler;