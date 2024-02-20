// useRequireAuth hook
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRequireAuth = (require: any | undefined, isLoading: boolean, redirectUrl = '/auth/login') => {
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !require) {
            // Redirect unauthenticated users to the login page
            router.push(redirectUrl);
        }
    }, [require, isLoading, redirectUrl, router]);

    return { require, isLoading };
};

export default useRequireAuth;
