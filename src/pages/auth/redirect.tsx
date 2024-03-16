import { useRouter } from 'next/router';
import { useAuth } from '../api/auth/auth';
import { useEffect } from 'react';
import { PageLoader } from '@/components/shared/loader';
const Redirect = () => {

    const router = useRouter();
    const { handleTikTokCallback, user } = useAuth()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const decodedCode = decodeURIComponent(code!);
        
        if (decodedCode && user) {
            handleTikTokCallback(decodedCode)
                .then(() => {
                // Redirect to another page or the same page without query parameters
                router.push('/about/creator/apply');
                })
                .catch(error => {
                // Handle error
                console.error(error);
                });
        }
    }, [router, user]);

  return <PageLoader/>
};

export default Redirect