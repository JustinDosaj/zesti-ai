// Breadcrumbs component
import { useNavigation } from '@/pages/api/context/navigation';
import Link from 'next/link';

const Breadcrumbs = () => {
  
  const { breadcrumb } = useNavigation();

  return (
    <nav aria-label="breadcrumb" className="mt-32">
      <ol className="list-none p-0 inline-flex items-center pb-4">
        {breadcrumb.map((name, index) => (
          <li key={index} className="inline">
            {index > 0 && <span className="text-gray-700 mx-1 text-xs lg:mx-3 lg:text-base">/</span>}
            {index < breadcrumb.length - 1 ? (
              <Link href={
                name === 'Home' ? '/' 
                :
                `/${name.toLowerCase().replace(/\s+/g, '-')}`}>

                <span className="text-primary-main hover:text-primary-alt lowercase">{name}</span>

              </Link>
            ) : (
              <span className="text-gray-700 lowercase text-sm lg:text-base">{name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

