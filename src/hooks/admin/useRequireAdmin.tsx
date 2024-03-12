// hooks/useRequireAdmin.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/pages/api/auth/auth'; // Adjust path as necessary
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/pages/api/firebase/firebase'; // Adjust path as necessary

const useRequireAdmin = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!isLoading) {
        if (!user) {
          // Not logged in, redirect to login page or home
          router.push('/');
          return;
        }
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          // User is not an admin, redirect away from admin page
          router.push('/');
        }
      }
    };

    checkAdminRole();
  }, [user, isLoading, router]);

  return isAdmin;
};

export default useRequireAdmin;
