// hooks/useSetBreadcrumbs.js
import { useEffect } from 'react';
import { useNavigation } from '@/pages/api/context/navigation';
import { useRouter } from 'next/router';
import { getRecipe } from '@/pages/api/firebase/functions';
import { useAuth } from '@/pages/api/auth/auth';



const useSetBreadcrumbs = () => {
  const { user } = useAuth();
  const { setBreadcrumb } = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const path = router.asPath;
    const segments = path.split('/').filter(Boolean);
    const breadcrumb = ['Home'];

    segments.forEach(async (segment, index) => {

      let name = decodeURIComponent(segment.replace(/-/g, ' '));

      // Additional logic to customize the name based on segment
      breadcrumb.push(name);

      console.log(breadcrumb)
    });

    setBreadcrumb(breadcrumb);
  }, [router.asPath, setBreadcrumb]);
};

export default useSetBreadcrumbs;
