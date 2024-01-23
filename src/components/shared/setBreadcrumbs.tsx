
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
      if (segment === 'nav') return; // Skip 'nav' segment

      let name = decodeURIComponent(segment.replace(/-/g, ' '));
      
      // Additional customization based on segment
      switch (segment) {
        case 'settings':
          name = 'Settings';
          break;
        case 'add-recipe':
          name = 'Add Recipe';
          break;
        // Add more cases as needed
        default:
          // Default name transformation
          name = name.charAt(0).toUpperCase() + name.slice(1);
      }

      breadcrumb.push(name);
    });

    setBreadcrumb(breadcrumb);
  }, [router.asPath, setBreadcrumb]);
};

export default useSetBreadcrumbs;
