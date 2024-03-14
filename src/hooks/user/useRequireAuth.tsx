// useRequireAuth hook
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/pages/api/auth/auth';

// Hook that requires the user to be authenticated

const useRequireAuth = (redirectUrl = '/auth/login') => {

    const router = useRouter();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !user) {
            // Redirect unauthenticated users to the login page
            router.push(redirectUrl);
        }
    }, [require, isLoading, redirectUrl, router, user]);

    return;
};

export default useRequireAuth;
