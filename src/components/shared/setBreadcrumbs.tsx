
// hooks/useSetBreadcrumbs.js
import { useEffect } from 'react';
import { useNavigation } from '@/pages/api/context/navigation';
import { useRouter } from 'next/router';

const useSetBreadcrumbs = () => {
  const { setBreadcrumb } = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const path = router.asPath;
    const segments = path.split('/').filter(Boolean);
    const breadcrumb = ['Home'];

    segments.forEach((segment) => {

      if (segment === 'recipe') return; // Skip 'recipe' segment

      let name = decodeURIComponent(segment.replace(/-/g, ' '));

      breadcrumb.push(name);
    });

    setBreadcrumb(breadcrumb);
  }, [router.asPath, setBreadcrumb]);
};

export default useSetBreadcrumbs;
