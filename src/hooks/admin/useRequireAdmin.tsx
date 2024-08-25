// hooks/useRequireAdmin.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const useRequireAdmin = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!isLoading) {
        if (!user) {
          router.push('/');
          return;
        }
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          router.push('/');
        }
      }
    };

    checkAdminRole();
  }, [user, isLoading, router]);

  return isAdmin;
};

export default useRequireAdmin;
