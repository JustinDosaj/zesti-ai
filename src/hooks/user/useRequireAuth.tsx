// useRequireAuth hook
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/pages/api/auth/auth';
import { Notify } from '@/components/shared/notify';

// Hook that requires the user to be authenticated

const useRequireAuth = (redirectUrl = '/auth/login') => {

    const router = useRouter();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !user) {
            // Redirect unauthenticated users to the login page
            router.push(redirectUrl);
            Notify("You must be logged in to access this content")
        }
    }, [require, isLoading, redirectUrl, router, user]);

    return;
};

export default useRequireAuth;
